import "babel-polyfill"

// https://redux-saga.js.org/docs/introduction/BeginnerTutorial.html
import React from 'react'
import ReactDOM from 'react-dom'
import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware } from 'redux'

import rootSaga from './sagas'

import Counter from './Counter'
import reducer from './reducers'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

const action = (type, payload = {}) => store.dispatch({ type, payload })

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => action('INCREMENT')}
      onIncrementAsync={() => action('INCREMENT_ASYNC')}
      onDecrement={() => action('DECREMENT')}
      fetchData={() => action('FETCH_REQUESTED', { url: 'https://run.mocky.io/v3/1d3aed75-1f55-400a-98b6-7c0e71d41c41' })} />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
