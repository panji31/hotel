import * as types from './../types'

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    order: []
};

export default function reducerOrder(state = initialState, action) {
    switch (action.type) {
        case `${types.GET_ORDER}_PENDING`:
            return {
                ...state,
                isLoading: true
            };
        case `${types.GET_ORDER}_FULFILLED`:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                order: action.payload.data
            };

        case `${types.GET_ORDER}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                isError: true
            };

        //----------------------------------------------------- 
        case `${types.INSERT_ORDER}_PENDING`:
            return {
                ...state,
                isLoading: true
            };
        case `${types.INSERT_ORDER}_FULFILLED`:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
            };

        case `${types.INSERT_ORDER}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        //-----------------------------------------------------------     
        case `${types.UPDATE_ORDER}_PENDING`:
            return {
                ...state,
                isLoading: true
            };
        case `${types.UPDATE_ORDER}_FULFILLED`:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
            };

        case `${types.UPDATE_ORDER}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        //-------------------------------------------------------------------
        case `${types.TIMER_ORDER}_PENDING`:
            return {
                ...state,
                isLoading: true
            };

        case `${types.TIMER_ORDER}_FULFILLED`:
            console.log('tes');
            return {
                ...state,
                isLoading: false,
                isSuccess: true
            };

        case `${types.TIMER_ORDER}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                isError: true
            };

        default:
            return state;
    }
}   