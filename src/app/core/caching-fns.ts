import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
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
 * @param {Observable<any>} update When this observable emits, update the cache from the source
 */
export function createCache<T>(source: Observable<T>, updateWhen: Observable<any>) {
  const cacheSubject = new ReplaySubject(1);

  // get from the source whenever `next` emits
  updateWhen
    .switchMap(() => source.first())
    .subscribe(data => cacheSubject.next(data)); // Todo: add error handling

  return cacheSubject.asObservable();
};

/*
 * Invoke async observable source (e.g., HTTP call), cache the result
 * and then refresh the cached value from a new HTTP call periodically
 * with a timer that ticks every `expirationPeriod` ms.
 *
 * Example:
 *
 *   const cachingRequest = this.http.get('hero.json')
 *     .map(res => res.json().data)
 *     .let(timerCache());
 *
 *   cachingRequest.subscribe(data => ... do something ...);
 */
export function createTimerCache<T>(expirationPeriod = defaultExpirationPeriod) {
  return (source: Observable<T>) =>
    createCache(
      source,
      Observable.timer(0, expirationPeriod)
        .do(count => log('source executed #' + count))
    );
}

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
 * @param {Observable<boolean>} update The "demand" observable that may update the cache.
 * @param {Notifier} [notifier] Optional. Called with caching activity messages.
 * @param {number} [expirationPeriod=defaultExpirationPeriod] Expiration window.
 */
export function createOnDemandCache<T>(
  source: Observable<T>,
  updateWhen: Observable<boolean>,
  notifier?: Notifier,
  expirationPeriod?: number
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
          new NotificationMessage('cached', 'Use cached value.' )
        );
        return fetch;
      })
  );
};

/** Message provided to notifiers. */
export class NotificationMessage {
  constructor(
    public type: 'cached' | 'fetching' | 'fetched' | 'error',
    public message?: string,
    public body?: any) {
      body ? log(message, body) : log(message);
    }
}

function NullNotifier(msg: NotificationMessage) { }

// logger logs to console when verbose == true
function log(...args) {
  if (_verbose) { console.log.apply(null, args); }
}
