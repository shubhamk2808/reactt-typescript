import { Action, ActionType } from '../types/users';

interface Users {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    ip_address: string;
    time: string;
}

interface State {
    users: Users[];
    loading: boolean;
    error: string | null;
}

const initialState = {
    users: [],
    loading: false, 
    error: null 
}

export const userRedcers = (state: State = initialState, action: Action) => {
    console.log(state, action, "state and action:::")
    switch(action.type) {
        case ActionType.GET_USERS_PENDING:
            return {
                ...state,
                loading: true 
            } 
        case ActionType.GET_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload
            }
        case ActionType.GET_USERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload 
            }
        default: 
            return state;
    }
}