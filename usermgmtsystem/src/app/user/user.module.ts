import { NgModule } from "@angular/core";
import { UserRoutingModule } from "./user.routing.module";
import { UserUpsertComponent } from "./user-upsert/user-upsert.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { UserListComponent } from "./user-list/user-list.component";
import { CommonModule } from "@angular/common";


@NgModule({
    declarations: [
        UserUpsertComponent,
        UserListComponent
    ],
    imports: [
        UserRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatButtonToggleModule,
        CommonModule
    ],
    exports: [
    ],
    providers: [],
})

export class UserModule {}