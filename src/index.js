// react related
import    React                         from 'react'
import    ReactDOM                      from 'react-dom'

import  { Router,
          Route,
          IndexRoute,
          browserHistory,
          applyRouterMiddleware }       from 'react-router'
import {  useScroll }                   from 'react-router-scroll'

// redux related
import {
  combineReducers,
  createStore,
  applyMiddleware,
  compose }                             from 'redux'
import { Provider }                     from 'react-redux'
import {
  syncHistoryWithStore,
  routerReducer }                       from 'react-router-redux'
import thunk                            from 'redux-thunk'

// main reducers
import NidaReducer                      from './pages/Nida/redux'

// Wrappers
import MainWrapper                      from './pages/MainWrapper'
import NidaContent                      from './pages/Nida'

const appReducer = combineReducers({
    Nida      : NidaReducer,
    routing   : routerReducer
  })

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined
  }
  return appReducer(state, action)
}

const appStore = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
const appHistory = syncHistoryWithStore(browserHistory, appStore);

require('es6-object-assign').polyfill();

ReactDOM.render((
  <Provider store={appStore}>
    <Router history={appHistory} render={applyRouterMiddleware(useScroll())}>

      <Route path="/" component={ MainWrapper }>
        <IndexRoute component={ NidaContent }/>
      </Route>

    </Router>
  </Provider>

), document.getElementById('root'));
