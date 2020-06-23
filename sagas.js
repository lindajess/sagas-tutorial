import { put, takeEvery, call, all } from 'redux-saga/effects'
import Api from './Api'

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

function* fetchData(action) {
    try {
        const data = yield call(Api.get, action.payload.url)
        yield put({ type: 'FETCH_SUCCEEDED', ...data })
    } catch (err) {
        yield put({ type: 'FETCH_FAILED', err })
    }
}

function* watchFetchData() {
    yield take('FETCH_REQUESTED', fetchData)
}

export default function* rootSaga() {
    yield all([
        helloSaga(),
        watchIncrementAsync(),
        watchFetchData(),
    ])
}


