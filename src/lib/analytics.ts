export interface PlausibleConfig {
  /** Your site's domain, as declared by you in Plausible's settings. */
  domain: string;

  /**
   * The URL of the Plausible API endpoint. Defaults to https://plausible.io/api/event
   * See proxying guide at https://plausible.io/docs/proxy/introduction
   */
  endpoint?: string;

  /** Whether to automatically capture pageviews. Defaults to true. */
  autoCapturePageviews?: boolean;

  /**
   * Whether the page uses hash based routing. Defaults to false.
   * Read more at https://plausible.io/docs/hash-based-routing
   */
  hashBasedRouting?: boolean;

  /** Whether to track outbound link clicks. Defaults to false. */
  outboundLinks?: boolean;

  /** Whether to track file downloads. Defaults to false. */
  fileDownloads?: boolean | { fileExtensions: string[] };

  /** Whether to track form submissions. Defaults to false. */
  formSubmissions?: boolean;

  /** Whether to capture events on localhost. Defaults to false. */
  captureOnLocalhost?: boolean;

  /** Whether to log on ignored events. Defaults to true. */
  logging?: boolean;

  /**
   * Custom properties to add to all events tracked.
   * If passed as a function, it will be called when `track` is called.
   */
  customProperties?:
    | CustomProperties
    | ((eventName: string) => CustomProperties);

  /**
   * A function that can be used to transform the payload before it is sent to the API.
   * If the function returns null or any other falsy value, the event will be ignored.
   */
  transformRequest?: (
    payload: PlausibleRequestPayload
  ) => PlausibleRequestPayload | null;

  /**
   * If enabled (the default), the script will set `window.plausible` after `init` is called.
   */
  bindToWindow?: boolean;
}

export interface PlausibleEventOptions {
  /**
   * Custom properties to add to the event.
   * Read more at https://plausible.io/docs/custom-props/introduction
   */
  props?: CustomProperties;

  /**
   * Whether the tracked event is interactive. Defaults to true.
   */
  interactive?: boolean;

  /**
   * Revenue data to add to the event.
   * Read more at https://plausible.io/docs/ecommerce-revenue-tracking
   */
  revenue?: PlausibleEventRevenue;

  /**
   * Called when request to `endpoint` completes or is ignored.
   */
  callback?: (
    result?: { status: number } | { error: unknown } | undefined
  ) => void;

  /**
   * Overrides the URL of the page that the event is being tracked on.
   */
  url?: string;
}

export type CustomProperties = Record<string, string>;

export type PlausibleEventRevenue = {
  amount: number | string;
  currency: string;
};

export type PlausibleRequestPayload = {
  n: string;
  u: string;
  d: string;
  r?: string | null;
  p?: CustomProperties;
  $?: PlausibleEventRevenue;
  i?: boolean;
} & Record<string, unknown>;

// Plausible function with attached properties
interface PlausibleFunction {
  (eventName: string, options?: PlausibleEventOptions): void;
  q: Array<[string, PlausibleEventOptions?]>;
  o: PlausibleConfig | null;
  init: (config: PlausibleConfig) => void;
}

declare global {
  interface Window {
    plausible?: PlausibleFunction;
    _mdl_pat_init?: boolean;
  }
}

type QueuedCall =
  | { type: "init"; config: PlausibleConfig; resolve: () => void }
  | { type: "track"; eventName: string; options?: PlausibleEventOptions };

const isDev = process.env.NODE_ENV === "development";

const log = (...args: unknown[]) => {
  if (isDev) console.log("[Analytics]", ...args);
};

/**
 * Creates the Plausible stub function with queue and init method attached.
 */
function createPlausibleStub(): PlausibleFunction {
  const fn = function (
    eventName: string,
    options?: PlausibleEventOptions
  ): void {
    fn.q.push([eventName, options]);
  } as PlausibleFunction;

  fn.q = [];
  fn.o = null;
  fn.init = (config: PlausibleConfig) => {
    fn.o = config;
  };

  return fn;
}

class PlausibleAnalytics {
  private queue: QueuedCall[] = [];
  private _initialized = false;
  private _ready = false;
  private readyPromise: Promise<void>;
  private resolveReady!: () => void;

  constructor() {
    this.readyPromise = new Promise((resolve) => {
      this.resolveReady = resolve;
    });
  }

  get initialized(): boolean {
    return this._initialized;
  }

  init(config: PlausibleConfig): Promise<void> {
    return new Promise((resolve) => {
      if (this._ready && window.plausible) {
        log("Plausible ready, initializing immediately");
        window.plausible.init(config);
        this._initialized = true;
        this.flushQueue(); // Process any queued track calls
        resolve();
      } else {
        log("Queueing init call");
        this.queue.push({ type: "init", config, resolve });
      }
    });
  }

  track(eventName: string, options?: PlausibleEventOptions): void {
    if (this._ready && this._initialized && window.plausible) {
      log(`Tracking event "${eventName}"`, options);
      window.plausible(eventName, options);
    } else {
      log(`Queueing event "${eventName}"`, options);
      this.queue.push({ type: "track", eventName, options });
    }
  }

  /**
   * Called when the Plausible script has loaded.
   * Flushes all queued calls.
   */
  onScriptReady(): void {
    if (this._ready) return;

    log("Plausible script ready, processing queue...");
    this._ready = true;
    this.resolveReady();
    this.flushQueue();
  }

  private flushQueue(): void {
    const pending = [...this.queue];
    this.queue = [];

    for (const call of pending) {
      if (call.type === "init") {
        if (window.plausible) {
          log("Processing queued init");
          window.plausible.init(call.config);
          this._initialized = true;
          call.resolve();
        }
      } else if (call.type === "track") {
        if (this._initialized && window.plausible) {
          log(`Processing queued event "${call.eventName}"`);
          window.plausible(call.eventName, call.options);
        } else {
          // Re-queue if not initialized yet
          this.queue.push(call);
        }
      }
    }

    // If there are still track calls waiting for init, they'll be processed
    // when init completes
    if (this.queue.length > 0 && this._initialized) {
      this.flushQueue();
    }
  }

  /** Wait for the analytics to be fully ready */
  whenReady(): Promise<void> {
    return this.readyPromise;
  }
}

export const analytics = new PlausibleAnalytics();

function loadPlausibleScript(
  src: string,
  timeout = 10000
): Promise<HTMLScriptElement> {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.async = true;
    script.src = src;

    const timeoutId = setTimeout(() => {
      reject(new Error(`Plausible script load timeout after ${timeout}ms`));
    }, timeout);

    script.onload = () => {
      clearTimeout(timeoutId);
      resolve(script);
    };

    script.onerror = () => {
      clearTimeout(timeoutId);
      reject(new Error("Failed to load Plausible script"));
    };

    document.head.appendChild(script);
  });
}

async function initPlausible(): Promise<void> {
  if (isDev || process.env.NEXT_PUBLIC_SKIP_ANALYTICS === "true") return;
  if (typeof window === "undefined") return;
  if (window._mdl_pat_init) return;

  // Handle plausible_ignore flag
  if (localStorage.getItem("plausible_ignore") === "true") {
    localStorage.removeItem("plausible_ignore");
    window.location.reload();
    return;
  }

  // Install stub immediately so calls can be queued
  if (!window.plausible) {
    window.plausible = createPlausibleStub();
  }

  try {
    log("Loading Plausible script...");
    await loadPlausibleScript(`/static/v1/gw-2hill6.lib.js`);
    log("Script loaded");

    // Notify our wrapper that the script is ready
    analytics.onScriptReady();

    // Initialize with config
    await analytics.init({
      domain: "balints-site.vercel.app",
      endpoint: "https://gateway-2hill6.spikerko.org/api/event",
      captureOnLocalhost: false,
      outboundLinks: true,
    });

    window._mdl_pat_init = true;
    log("Initialization complete");
  } catch (error) {
    console.error("[Analytics] Failed to initialize:", error);
  }
}

initPlausible();