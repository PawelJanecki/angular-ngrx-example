import { Component, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router'
import { AppState } from './reducers'
import { isLoggedIn } from './auth/auth.selector'
import { AuthActions } from './auth/action-types'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loading = true

  isLoggedIn$: Observable<boolean>

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit() {
    const userProfile = localStorage.getItem('user')
    if (userProfile) {
      this.store.dispatch(AuthActions.login({ user: JSON.parse(userProfile) }))
    }

    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true
          break
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false
          break
        }
        default: {
          break
        }
      }
    })

    this.isLoggedIn$ = this.store.select(isLoggedIn())
  }

  logout() {
    this.store.dispatch(AuthActions.logout())
  }
}
