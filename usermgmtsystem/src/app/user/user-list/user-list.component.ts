import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { catchError } from "rxjs";
import { DataService } from "src/app/shared/services";

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html'
})

export class UserListComponent implements OnInit {

    listData: any[] = [];
    dummyApiData: any;

    constructor(
        private dataService: DataService,
        private router: Router,
        private http: HttpClient,
    ) {

    }

    ngOnInit(): void {
        this.dataService.userlistDetails.subscribe((result: any) => {
            if (result && result.length) {
                this.listData = (result) ? JSON.parse(JSON.stringify(result)) : [];
            } else {
                this.fetchData();
            }
        });
    }

    fetchData() {
        this.http.get('https://dummyjson.com/users').pipe(
            catchError(error => {
                console.error('Error occurred:', error);
                return error;
            })
            ).subscribe((data: any) => {
                if (data && data.users && data.users.length) {
                    data.users.forEach((item: any) => {            
                        const singleUserData = {
                            id: item.id,
                            firstName: item.firstName,
                            lastName: item.lastName,
                            address: item.address.address,
                            email: item.email,
                            phone: item.phone.split(' ').slice(1).join(' ').replace(/ +/g, "")
                        };
                        this.listData.push(singleUserData);
                    });
                    this.dataService.setuserlistDetails(this.listData);
                }
        });
    }

    addNewUser() {
        this.dataService.editUserData = {};
        this.router.navigateByUrl('userApp/user-upsert');
    }

    delete(index: any) {
        this.listData.splice(index, 1);
        this.dataService.setuserlistDetails(this.listData);
    }

    edit(data: any) {
        this.dataService.editUserData = JSON.parse(JSON.stringify(data));
        this.router.navigateByUrl('/userApp/user-upsert');
    }
}