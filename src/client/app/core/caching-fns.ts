import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/switchMap';

/* Whether to log caching activity to console. For debugging/demos. */
let _verbose = true;
export function getVerbose() { return _verbose; }
export function setVerbose(value: boolean) { _verbose = value; }

/** Cached values expire after this period (ms) by default */
export const defaultExpirationPeriod = 3000;

/** Caching event notification callback */
export type Notifier = (msg: NotificationMessage) => void;

/**
 * Cache values and update from source whenever next emits
 * @param {Observable<T>} source The async source of the data
 * @param {Observable<any>} updateWhen When this observable emits, update the cache from the source
 * @param {T | ReplaySubject<T> | BehaviorSubject<T>} [initialValue] Optional.
 *   Initial value of cache before first source execution or the Subject<T> to use.
 */
export function createCache<T>(
  source: Observable<T>,
  updateWhen: Observable<any>,
  initialValue?: T | ReplaySubject<T> | BehaviorSubject<T>): Observable<T> {

  const cacheSubject = getSubject<T>(initialValue);

  // get from the source whenever `next` emits
  updateWhen
    .switchMap(() => source.first())
    .subscribe(data => cacheSubject.next(data)); // Todo: add error handling

  return cacheSubject.asObservable();
};

/*
 * Cache values from an async source (e.g., HTTP call) in an observable.
 *
 * Update cache from the source on demand based on update observable events.
 * Cache updates if the cached value has expired or update emits true (force update).
 *
 * Example:
 *
 *   // async source of values
 *   const source = this.http.get('hero.json')
 *     .map(res => res.json().data);
 *
 *   // subject that controls when and how to update the cache
 *   const updateWhen = new ReplaySubject<boolean>(1);
 *
 *   // create the onDemand caching observable, controlled by the updateWhen subject.
 *   // The `updateWhen`, like all subjects, is also an observable
 *   const example = onDemandCache(source, updateWhen);
 *
 *   // sequence of cached values
 *   example.subscribe(data => ...);
 *
 *   // update helper method
 *   const update(force = false) => updateWhen.next(force);
 *
 *   // force an update of the cache from source
 *   update(true);
 *
 *   // update cache from source if expired
 *   update();
 *
 * @param {Observable<T>} source Async source of values.
 * @param {Observable<boolean>} updateWhen The "demand" observable that may update the cache.
 * @param {Notifier} [notifier] Optional. Called with caching activity messages.
 * @param {number} [expirationPeriod=defaultExpirationPeriod] Expiration window.
 * @param {T | ReplaySubject<T> | BehaviorSubject<T>} [initialValue] Optional.
 *   Initial value of cache before first source execution or the Subject<T> to use.
 */
export function createOnDemandCache<T>(
  source: Observable<T>,
  updateWhen: Observable<boolean>,
  notifier?: Notifier,
  expirationPeriod?: number,
  initialValue?: T | ReplaySubject<T> | BehaviorSubject<T>
): Observable<T> {
  let expired = 0;
  let firstTime = true;

  if (!notifier) { notifier = NullNotifier; }
  expirationPeriod = (expirationPeriod == null) ? defaultExpirationPeriod : expirationPeriod;

  return createCache(

    source.do(data => {
      expired = Date.now() + expirationPeriod;
      notifier(new NotificationMessage('fetched', 'Fetched', data));
    }),

    updateWhen
      .map(force => firstTime || force || expired < Date.now())

      // filter out all false conditions
      .filter(fetch => {
        firstTime = false;
        notifier(fetch ?
          new NotificationMessage('fetching', 'Fetching...') :
          new NotificationMessage('cached', 'Use cached value.')
        );
        return fetch;
      }),

    initialValue
  );
};

/*
 * Invoke async observable source (e.g., HTTP call), cache the result
 * and then refresh the cached value from a new HTTP call periodically
 * with a timer that ticks every `expirationPeriod` ms.
 *
 * Example:
 *   const source = this.http.get('hero.json')
 *     .map(res => res.json().data);
 *
 *   const timerCache = createTimerCache(source));
 *
 *   timerCache.subscribe(data => ... do something ...);
 *
 * @param {Observable<T>} source Async source of values.
 * @param {number} [expirationPeriod=defaultExpirationPeriod] Cache refresh interval
 * @param {T | ReplaySubject<T> | BehaviorSubject<T>} [initialValue] Optional.
 *   Initial value of cache before first source execution or the Subject<T> to use.
 */
export function createTimerCache<T>(
  source: Observable<T>,
  expirationPeriod = defaultExpirationPeriod,
  initialValue?: T | ReplaySubject<T> | BehaviorSubject<T>): Observable<T> {

  const cacheSubject = getSubject<T>(initialValue);

  return Observable.timer(0, expirationPeriod)
    .switchMap(count => {
      log('source executing #' + count);

      // next executes source exactly once, then updates cache, then returns the cache
      const next = source.first()
        .do(data => log('Fetched data arrived'))
        .do(data => cacheSubject.next(data))
        .switchMap(() => cacheSubject);

      // If first time, subscribe to next and return the cache immediately
      // so subscribers can use it. Otherwise, return the next observable.
      return count === 0 ? next.subscribe() && cacheSubject : next;
    })
    .share();
}

/** Message provided to notifiers. */
export class NotificationMessage {
  constructor(
    public type: 'cached' | 'fetching' | 'fetched' | 'error',
    public message?: string,
    public body?: any) {
    body ? log(message, body) : log(message);
  }
}

export function NullNotifier(msg: NotificationMessage) { }

// logger logs to console when verbose == true
export function log(...args) {
  if (_verbose) { console.log.apply(null, args); }
}

function getSubject<T>(value?: T | BehaviorSubject<T> | ReplaySubject<T>) {
  return value instanceof Subject ? value : new BehaviorSubject(value);
}
