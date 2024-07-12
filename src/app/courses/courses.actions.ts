import { createAction, props } from '@ngrx/store'
import { Course } from './model/course'
import { Update } from '@ngrx/entity'

export const loadAllCourses = createAction(
  '[Courses Resolver] Load all courses'
)

export const allCoursesLoaded = createAction(
  '[Load Courses Effect] All courses loaded',
  props<{ courses: Course[] }>()
)

export const courseUpdated = createAction(
  '[Edit Course Dialog] Course updated',
  props<{update: Update<Course>}>()
)