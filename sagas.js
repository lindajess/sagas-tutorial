import { put, takeEvery, call, all, takeLatest, cancelled } from 'redux-saga/effects'
import axios from 'axios'
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

const cancelSource = axios.CancelToken.source()
function* fetchData(action) {
    try {
        const data = yield call(Api.get, action.payload.url, { cancelToken: cancelSource.token })
        yield put({ type: 'FETCH_SUCCEEDED', ...data })
    } finally {
        if (yield cancelled()) {
            yield call(cancelSource.cancel, cancelSource.token)
        }
    }
}

function* watchFetchData() {
    try {
        yield takeLatest('FETCH_REQUESTED', fetchData)
    } catch (err) {
        yield put({ type: 'FETCH_FAILED', err })
    }
}

export default function* rootSaga() {
    yield all([
        helloSaga(),
        watchIncrementAsync(),
        watchFetchData(),
    ])
}


