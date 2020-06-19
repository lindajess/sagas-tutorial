import { put, takeEvery, call, all } from 'redux-saga/effects'

function* helloSaga() {
    console.log('Hello Sagas!')
}

export const delay = (ms) => new Promise(res => setTimeout(res, ms))

//Worker Saga: Will perform the async increment task
export function* incrementAsync() {
    yield call(delay, 1000)
    yield put({ type: 'INCREMENT' })
}

// Watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
function* watchIncrementAsync() {
    yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

export default function* rootSaga() {
    yield all([
        helloSaga(),
        watchIncrementAsync()
    ])
}


