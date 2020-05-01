import { compose, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
// eslint-disable-next-line import/no-extraneous-dependencies
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'

import rootReducer from './redux/reducers/rootReducer'

const composeEnhancers =
  // @ts-ignore
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as typeof compose) || compose
const middleware =
  process.env.NODE_ENV !== 'production'
    ? [reduxImmutableStateInvariant(), thunk]
    : [thunk]

export default () =>
  createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)))
