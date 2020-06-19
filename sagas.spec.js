import test from 'tape'

import { incrementAsync, delay } from './sagas'
import { put, call } from 'redux-saga/effects';

test('IncrementAsync Saga test', (assert) => {
    const gen = incrementAsync();

    /*  gen.next() // => { done: false, value: <result of calling delay(1000)> }
     gen.next() // => { done: false, value: <result of calling put({type: 'INCREMENT'})> }
     gen.next() // => { done: true, value: undefined } */

    assert.deepEqual(
        gen.next().value,
        call(delay, 1000),
        'IncrementAsync should return a Promise that will resolve after 1 second'
    )

    assert.deepEqual(
        gen.next().value,
        put({ type: 'INCREMENT' }),
        'IncrementAsync Saga must dispatch an INCREMENT action'
    )

    assert.deepEqual(
        gen.next(),
        { done: true, value: undefined },
        'incrementAsync Saga must be done'
    )

    assert.end()
})