import { Component, OnInit } from "@angular/core";
import {FormGroup,FormControl,Validators, FormBuilder} from '@angular/forms';
import { Router } from "@angular/router";
import { DataService } from "src/app/shared/services";
import { CustomValidators } from "src/app/shared/services/custom.validators.service";

@Component({
    selector: 'app-user-upsert',
    templateUrl: './user-upsert.component.html'
}) 

export class UserUpsertComponent implements OnInit {
    userForm: FormGroup;
    userFormDetails: any = {};
    userlist: any[] = [];

    constructor(
        public fb: FormBuilder,
        private dataService: DataService,
        private router: Router,
        ) {
        this.userForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            address: ['',Validators.required],
            email: ['',[Validators.required, CustomValidators.emailValidator]],
            phone: ['', [Validators.required, CustomValidators.mobileValidator]]
        });
    }

    ngOnInit(): void {
        this.userFormDetails = (this.dataService.editUserData) ? JSON.parse(JSON.stringify(this.dataService.editUserData)) : {};
        if (this.userFormDetails) {
            this.userForm.get('firstName')?.patchValue(this.userFormDetails.firstName);
            this.userForm.get('lastName')?.patchValue(this.userFormDetails.lastName);
            this.userForm.get('address')?.patchValue(this.userFormDetails.address);
            this.userForm.get('email')?.patchValue(this.userFormDetails.email);
            this.userForm.get('phone')?.patchValue(this.userFormDetails.phone);
            this.dataService.editUserData = {};
        }

        this.dataService.userlistDetails.subscribe((result: any) => {
            this.userlist = (result) ? JSON.parse(JSON.stringify(result)) : [];
        });
    }

    sumbit() {
        const data: any = this.userForm.getRawValue();

        const postData = {
            id: (this.userFormDetails && this.userFormDetails.id) ? this.userFormDetails.id : this.generateUniqueId(),
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            email: data.email,
            phone: data.phone
        };
        const checkUsrAvailableIndex = this.userlist.findIndex((usr: any) => ((usr.id === postData.id)
        || ((usr.email.trim().toLowerCase() === data.email.trim().toLowerCase()) && 
        (usr.phone.trim().toLowerCase() === data.phone.trim().toLowerCase()))));
        if (checkUsrAvailableIndex >= 0) {
            this.userlist[checkUsrAvailableIndex] = JSON.parse(JSON.stringify(postData));
        } else {
            this.userlist.unshift(postData);
        }
        this.dataService.setuserlistDetails(this.userlist);
        this.router.navigateByUrl('userApp/user-list');
    }

    cancel() {
        this.router.navigateByUrl('userApp/user-list');
    }

    generateUniqueId(): string {
        const timestamp = new Date().getTime().toString();
        const randomNumber = Math.floor(Math.random() * 1000).toString();
        return timestamp + '-' + randomNumber;
    }
}