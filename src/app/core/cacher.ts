import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/first';

/////// CachedResponse<T> ////////

/** CachedResponse returned by Cacher `get` methods. */
export class CachedResponse<T> {
  constructor(
    public data: T,
    public expiration = 0,
    /** True if a "fetch" (execution of the source) is in progress. */
    public fetching = false,
    /** Error from source if it fails */
    public error?: any) { }
}

/////// Cacher ////////

export class Cacher<T> {

  /** Cached values expire after this period (ms) by default */
  static defaultExpirationPeriod = 30000;

  /** Whether to log Cacher activity to console. For debugging/demos. */
  static verbose = false;

  /** Observable representation of the private caching subject */
  private readonly cache: Observable<CachedResponse<T>>;

  /**
   * Create instance of a Cacher which can cache and refresh an observable of type T
   *
   * @param {Observable<T>} source The observable source of values of type T
   * @param { number } expireAfter Cached values expire after this period.
   *   Default is `Cacher.defaultExpirationPeriod`.
   * @param { BehaviorSubject<CachedResponse<T>>} [subject] Optional subject that maintains cached value;
   *   Creates its own subject if not defined.
   */
  constructor(
    public readonly source: Observable<T>,
    public readonly expireAfter = Cacher.defaultExpirationPeriod,
    private readonly subject?: BehaviorSubject<CachedResponse<T>>
  ) {
    if (!this.subject) {
      this.subject = new BehaviorSubject(new CachedResponse<T>(undefined));
    }
    this.cache = this.subject.asObservable(); // because shouldn't expose subject directly
  }

  /**
   * Returns the observable of cached values.
   * If the cached value expired, initiates a fetch from source.
   * Can force a fetch even if the cached value has not expired.
   *
   * @param {boolean} [force=false] forces a fetch that updates the cached observable.
   */
  get(force = false): Observable<CachedResponse<T>> {
    this.subject
      .first() // execute only once
      .do(cr => {
        if (cr.fetching) {
          log('Fetching ...');
        } else if (force || Date.now() > cr.expiration ) {
          this.getFromSource(cr);
        } else {
          log('Using cached data');
        }
      })
      .subscribe(null, null, () => log('get.do() completed'));

    return this.cache;
  };

  /**
   * Returns the observable of cached values.
   * A future call of `get()` may update this cache.
   */
  getFromCache(): Observable<CachedResponse<T>> { return this.cache; }

  private getFromSource(cr: CachedResponse<T>) {
    // Notify that we're fetching ...
    cr.fetching = true;
    this.subject.next(cr);

    // then fetch the data
    this.source.first().subscribe(
      data => {
        const newCr = new CachedResponse<T>(data, Date.now() + this.expireAfter);
        log('Fetched fresh data', newCr);
        this.subject.next(newCr);
      },

      error => {
        const newCr = new CachedResponse<T>(cr.data, 0, false, error);
        log('Fetch failed', error);
        this.subject.next(newCr);
      },

      () => log('Fetch observable completed')
    );
  }
}

function log(...args) {
  if (Cacher.verbose) { console.log.apply(null, args); }
}
