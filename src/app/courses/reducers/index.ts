import { createEntityAdapter, EntityState } from '@ngrx/entity'
import { compareCourses, Course } from '../model/course'
import { CourseActions } from '../action-types'
import { createReducer, on } from '@ngrx/store'

export const coursesFeatureKey = 'courses'

export interface CoursesState extends EntityState<Course> {
  allCoursesLoaded: boolean
}

export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses,
})

export const initialCoursesState = adapter.getInitialState({
  allCoursesLoaded: false,
})

export const coursesReducer = createReducer(
  initialCoursesState,
  on(CourseActions.allCoursesLoaded, (state, action) =>
    adapter.addMany(action.courses, { ...state, allCoursesLoaded: true })
  ),
  on(CourseActions.courseUpdated, (state, action) =>
    adapter.updateOne(action.update, state)
  )
)

export const { selectAll } = adapter.getSelectors()
