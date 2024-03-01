import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserUpsertComponent } from "./user-upsert/user-upsert.component";
import { UserListComponent } from "./user-list/user-list.component";


const routes: Routes = [
    { path: '', redirectTo: 'user-list', pathMatch: 'full' },
    { path: 'user-upsert', component: UserUpsertComponent },
    { path: 'user-list', component: UserListComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UserRoutingModule {}