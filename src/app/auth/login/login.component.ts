import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Store } from "@ngrx/store";

import { AuthService } from "../auth.service";
import { tap } from "rxjs/operators";
import { noop } from "rxjs";
import { Router } from "@angular/router";
import { AppState } from "../../reducers";
import { login } from "../auth.actions";
import { AuthActions } from "../action-types";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.form = fb.group({
      email: ["test@angular-university.io", [Validators.required]],
      password: ["test", [Validators.required]],
    });
  }

  ngOnInit() {}

  login() {
    const formValue = this.form.value;

    this.auth
      .login(formValue.email, formValue.password)
      .pipe(
        tap((val) => {
          console.log(val);

          this.store.dispatch(AuthActions.login({ user: val }));

          this.router.navigateByUrl("/courses");
        })
      )
      .subscribe(noop, () => alert("Login failed!"));
  }
}
