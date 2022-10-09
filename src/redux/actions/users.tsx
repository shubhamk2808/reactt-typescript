import { Dispatch } from 'redux';
import { ActionType, Action } from '../types/users';
import { fetchUsers } from '../../utils/counterAPI';

export const getUserData = () => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.GET_USERS_PENDING
        });
        fetchUsers().then((res) => {
            console.log(res)
            dispatch({
                type: ActionType.GET_USERS_SUCCESS,
                payload: res.data
            });
        }).catch(() => {
            dispatch({
                type: ActionType.GET_USERS_FAIL,
                payload: "Failed"
            });
        })
    }
}

export const getSortedData = (sortedData:any[]) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.GET_USERS_PENDING
        });
        
        try {
            dispatch({
                type: ActionType.GET_USERS_SUCCESS,
                payload: sortedData
            });

        } catch(err) {
            dispatch({
                type: ActionType.GET_USERS_FAIL,
                payload: "Failed"
            });
        }
    }
}