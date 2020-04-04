import { combineEpics, Epic, ofType } from 'redux-observable';
import { map, mergeMap, debounceTime, switchMap, delay } from 'rxjs/operators';
import { loadData } from './api-stub';
import { from } from 'rxjs';

const pingEpic: Epic = (action$) =>
    action$.pipe(
        ofType('PING'),
        delay(2000),
        map(() => ({ type: 'PONG' }))
    );

const requestEpic: Epic = (action$) =>
    action$.pipe(
        ofType('LOAD'),
        mergeMap(() => from(loadData(new Date().toString()))),
        map((result) => ({ type: 'LOADED', result }))
    );

const copyEpic: Epic = (action$) =>
    action$.pipe(
        ofType('COPY'),
        debounceTime(2000),
        map(() => ({ type: 'DONE' }))
    );

const autocompleteEpic: Epic = (action$) =>
    action$.pipe(
        ofType('CHANGE'),
        switchMap((a) => from(loadData(a.value))),
        map((value) => ({ type: 'SUGGEST', value }))
    );

//#region combine epics
export const rootEpic = combineEpics(
    pingEpic, 
    requestEpic, 
    copyEpic,
    autocompleteEpic
);
//#endregion
