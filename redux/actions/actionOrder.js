import * as types from './../types'
import axios from 'axios'

export const getOrder = () => ({
    type: types.GET_ORDER,
    payload: axios.get('http://192.168.43.15:5000/api/v2/orders?is_booked=true')
});

export const insertOrder = (body) => ({
    type: types.INSERT_ORDER,
    payload: axios.post('http://192.168.43.15:5000/api/v2/orders', body)
});

export const UpdateOrder = (params, body) => ({
    type: types.UPDATE_ORDER,
    payload: axios.put('http://192.168.43.15:5000/api/v2/orders/' + params + '/', body)
});

export const updateTimer = () => ({
    type: types.TIMER_ORDER,
    payload: axios.get('http://192.168.43.15:5000/api/v2/orderupdate')
});  