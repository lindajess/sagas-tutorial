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

const action = type => store.dispatch({ type })

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => action('INCREMENT')}
      onIncrementAsync={() => action('INCREMENT_ASYNC')}
      onDecrement={() => action('DECREMENT')} />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
