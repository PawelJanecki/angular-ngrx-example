import { inject } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router'
import { select, Store } from '@ngrx/store'
import { AppState } from '../reducers'
import { filter, finalize, first, tap } from 'rxjs/operators'
import { CourseActions } from './action-types'
import { areCoursesLoaded } from './courses.selector'

let loading = false

export const coursesResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const store = inject(Store<AppState>)

  return store.pipe(
    select(areCoursesLoaded),
    tap((coursesLoaded) => {
      if (!loading && !coursesLoaded) {
        loading = true
        store.dispatch(CourseActions.loadAllCourses())
      }
    }),
    filter(coursesLoaded => coursesLoaded),
    first(),
    finalize(() => (loading = false))
  )
}
