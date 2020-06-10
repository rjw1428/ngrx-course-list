import { Course, compareCourses } from "../model/course";
import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { CourseActions } from "../action-types";
import { createReducer, on, select } from "@ngrx/store";


export interface CourseState extends EntityState<Course>{
    // entities: {[key: number]: Course};
    // ids: number[]
    allCoursesLoaded: boolean
}

export const adapter = createEntityAdapter<Course>({
    sortComparer: compareCourses,
    // selectId: course => course.id
});

export const initialCoursesState = adapter.getInitialState({
    allCoursesLoaded: false
})

export const coursesReducer = createReducer(
    initialCoursesState,
    on(CourseActions.allCoursesLoaded, 
        (state, action) => adapter.addAll(action.courses, {...state, allCoursesLoaded: true})),

    on(CourseActions.courseUpdated,
        (state, action) => adapter.updateOne(action.update, state))
) 

export const { selectAll } = adapter.getSelectors()
