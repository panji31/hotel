//combine all reducer
import { combineReducers } from 'redux';
import { createNavigationReducer } from 'react-navigation-redux-helpers';

import RootNavigator from './../../navigator/RootNavigator'
import reducerLogin from './../reducers/reducerLogin';

import reducerRoom from './../reducers/reducerRoom';
import reducerInsertRoom from './../reducers/reducerInsertRoom';
import reducerUpdateRoom from './../reducers/reducerUpdateRoom';

import reducerCustomer from './../reducers/reducerCustomer';

import reducerUsers from './../reducers/reducerUsers';

import reducerOrder from './../reducers/reducerOrder';


const reducerRouter = createNavigationReducer(RootNavigator);

const appReducer = combineReducers({
  router: reducerRouter,
  login: reducerLogin,
  room: reducerRoom,
  insertroom: reducerRoom,
  updateroom: reducerRoom,
  customer: reducerCustomer,
  upatecustomer: reducerCustomer,
  order: reducerOrder
})

export default appReducer