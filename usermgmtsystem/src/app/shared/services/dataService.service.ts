import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  editUserData: any = {};

  private userlist = new BehaviorSubject<any>(null);
  
  get userlistDetails(): Observable<any> {
      return this.userlist.asObservable();
  }

  public setuserlistDetails(value: any) {
      this.userlist.next(value);
  }
}
