import { Injectable } from "@angular/core";
import { FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

@Injectable({
  providedIn: 'root'
})
export class CustomValidators {
  static mobileValidator(control: FormControl) {
    const mobile = control.value;
    const re = new RegExp(/^[1-9]{1}[0-9]{9}$/);
    const re2 = new RegExp(/^(\d)(?!\1+$)\d{9}$/);
    if (mobile) {
      if (mobile.length > 10) {
        return {
          maxlength: true
        };
      } else if (!re.test(mobile)) {
        return {
          pattern: true
        };
      } else if (!re2.test(mobile)) {
        return {
          pattern: true
        }
      }
    }
    return null;
  }

  static emailValidator(control: FormControl) {
    const email = control.value;
    const re = new RegExp(/^[a-zA-Z0-9]([a-zA-Z0-9\.])+[a-zA-Z0-9]\@([a-zA-Z0-9\-])+\.[a-zA-Z]{2,5}$/);

    if (email) {
      if (email.length > 255) {
        return {
          maxlength: true
        };
      } else if (!re.test(email)) {
        return {
          pattern: true
        };
      }
    }
    return null;
  }

}