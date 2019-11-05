import * as types from './../types'

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    customer: [],
    insertCustomer: [],
    updateCustomer: []
};

export default function reducerCustomer(state = initialState, action) {
    switch (action.type) {
        case `${types.GET_USERS_CUSTOMER}_PENDING`:
            return {
                ...state,
                isLoading: true
            };

        case `${types.GET_USERS_CUSTOMER}_FULFILLED`:
            console.log('tes');
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                customer: action.payload.data
            };

        case `${types.GET_USERS_CUSTOMER}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                isError: true
            };

        case `${types.INSERT_USERS_CUSTOMER}_PENDING`:
            return {
                ...state,
                isLoading: true
            };

        case `${types.INSERT_USERS_CUSTOMER}_FULFILLED`:
            console.log('tes');
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                insertCustomer: action.payload.data
            };

        case `${types.INSERT_USERS_CUSTOMER}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                isError: true
            };

        case `${types.UPDATE_USERS_CUSTOMER}_PENDING`:
            return {
                ...state,
                isLoading: true
            };

        case `${types.UPDATE_USERS_CUSTOMER}_FULFILLED`:
            console.log('tes');
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                updateCustomer: action.payload.data
            };

        case `${types.UPDATE_USERS_CUSTOMER}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        default:
            return state;
    }
}    