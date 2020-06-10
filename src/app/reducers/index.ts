import { ActionReducerMap, MetaReducer, ActionReducer } from "@ngrx/store";
import { environment } from "../../environments/environment";
import { routerReducer } from "@ngrx/router-store";

export interface AppState {
    
}

export const reducers: ActionReducerMap<AppState> = {
    router: routerReducer
};

// Custom metaReducer, runs before reducer is triggered
export function logger(reducer: ActionReducer<any>): ActionReducer<any>{
    return (state, action) => {
        console.log("PRE STATE", state)
        console.log("ACTION", action)
        return reducer(state, action)
    }
}


export const metaReducers: MetaReducer<AppState>[] = 
    !environment.production? [logger] : [];
