import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CourseState } from "./reducers/courses.reducers";
import * as fromCourses from './reducers/courses.reducers'

export const selectCoursesState = createFeatureSelector<CourseState>("courses")


export const selectAllCourses = createSelector(
    selectCoursesState,
    fromCourses.selectAll
)

export const selectBeginnerCourses = createSelector(
    selectAllCourses,
    courses => courses.filter(course => course.category == 'BEGINNER')
)

export const selectAdvancedCourses = createSelector(
    selectAllCourses,
    courses => courses.filter(course => course.category == 'ADVANCED')
)

export const selectedPromoTotal = createSelector(
    selectAllCourses,
    courses => courses.filter(course => course.promo).length
)

export const areCoursesLoaded = createSelector(
    selectCoursesState,
    state => state.allCoursesLoaded
)