export enum ActionType {
    GET_USERS_PENDING = 'GET_USERS_PENDING',
    GET_USERS_SUCCESS = 'GET_USERS_SUCCESS',
    GET_USERS_FAIL = 'GET_USERS_FAIL'
}


interface actionPending {
    type: ActionType.GET_USERS_PENDING;
}

interface actionSuccess {
    type: ActionType.GET_USERS_SUCCESS;
    payload: any[];
}

interface actionFail {
    type: ActionType.GET_USERS_FAIL;
    payload: string ;
}

export type Action = actionPending | actionSuccess | actionFail;