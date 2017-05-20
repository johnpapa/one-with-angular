import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/startWith';

import { createOnDemandCache, Notifier, NotificationMessage, setVerbose } from './caching-fns';

export class Cacher<T> {

  /** Whether to log Cacher activity to console. For debugging/demos. */
  static set verbose(value: boolean) { setVerbose(value); };

  /** Cached values expire after this period (ms) by default */
  static defaultExpirationPeriod = 30000;

  /** Observable of cached values */
  readonly cache: Observable<T>;

  /** Observable of caching activity messages */
  private notify = new Subject<NotificationMessage>();
  notifications = this.notify.asObservable().startWith({ type: '' });

  private updateWhen = new Subject<boolean>();

  /**
   * Create instance of a Cacher which can cache and refresh an observable of type T
   *
   * @param {Observable<T>} source The observable source of values of type T
   * @param {Notifier} [notifier] Optional. Called with caching activity messages.
   * @param {number} [expirationPeriod=defaultExpirationPeriod] Expiration window.
   */
  constructor(
    public readonly source: Observable<T>,
    public readonly expirationPeriod = Cacher.defaultExpirationPeriod
  ) {
    // notifier pumps caching activity messages into the notifications observable
    const notifier = (msg: NotificationMessage) => this.notify.next(msg);

    this.cache = createOnDemandCache(source, this.updateWhen, notifier, expirationPeriod);
  }

  /**
   * update cache by force or if the cache has expired.
   *
   * @param {boolean} [force=false] Whether to force update from source
   */
  update(force = false) {
    this.updateWhen.next(force);
  }
}
