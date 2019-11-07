import * as types from './../types'
import axios from 'axios'

export const insertCustomer = (params) => ({
    type: types.INSERT_USERS_CUSTOMER,
    payload: axios.post('http://192.168.0.44:5000/api/v2/customers',
        params, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    })
});

export const updateCustomer = (params, body) => ({
    type: types.UPDATE_USERS_CUSTOMER,
    payload: axios.put('http://192.168.0.44:5000/api/v2/customers/' + params,
        body, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    })
});  