/* eslint-disable */

/******************************************\
* DO NOT EDIT, THIS CODE IS TOOL GENERATED *
* AND ANY CHANGES WILL BE OVERWRITTEN      *
\******************************************/

type HeaderResolver = string | Promise<string> | (() => string) | (() => Promise<string>);

/** List of ways the HTTP client can reject failed requests */
export enum RejectWith {
    /** Body returned as string */
    string,
    /** XML HTTP Request object return as-is */
    xhr,
    /** XML HTTP Request object copied to proxy object */
    object,
}

/** Describes the possible ready state values */
export enum ReadyState {
    /** The XMLHttpRequest client has been created, but the open() method hasn't been called yet. */
    Unsent,
    /** open() method has been invoked. During this state, the request headers can be set using the setRequestHeader() method and the send() method can be called which will initiate the fetch. */
    Opened,
    /** send() has been called and the response headers have been received. */
    HeadersReceived,
    /** Response's body is being received. If responseType is "text" or empty string, responseText will have the partial text response as it loads. */
    Loading,
    /** The fetch operation is complete. This could mean that either the data transfer has been completed successfully or failed. */
    Done
}

/** HTTP client configuration */
type HttpClientConfiguration = {
    /** Base path that will be prepended to all requests, may be relative or absolute. Default value is `null` */
    basePath: string | null;
    /** Flag to indicate whether or not credentials should be forwarded with request. Default value is `false` */
    withCredentials: boolean;
    /** Callback that will be invoked for each AJAX call, use if there's a need to modify the XML HTTP Request object. Default value is `null` */
    xhrConfigurationCallback: ((x: XMLHttpRequest) => void) | null;
    /** List of headers to add to each request, the value may be a string, a method that resolve to a string or a Promise<string>. Default value is `{}` */
    defaultHeaders: { [name: string]: HeaderResolver };
    /** Configure how the HTTP client will reject failed calls. Default value is `RejectWith.string` */
    rejectWith: RejectWith;
};

/** Proxy type for XHR class */
export type ClientBuilderError = {
    /** The state of the request */
    readyState: ReadyState;
    /** The response, could be ArrayBuffer, Blob, Document, JSON object, or DOMString, depending on `responseType` */
    response: any;
    /** The response in the form of a DOMString, or null if the request failed or has not yet been sent */
    responseText: string;
    /** The response type */
    responseType: XMLHttpRequestResponseType;
    /** The URL of the originating request */
    responseURL: string;
    /** HTTP status code */
    status: number;
    /** DOMString representation of the content returned from the server */
    statusText: string;
};

export default (() => {
    const config: HttpClientConfiguration = {
        basePath: null,
        withCredentials: false,
        xhrConfigurationCallback: null,
        defaultHeaders: {},
        rejectWith: RejectWith.string,
    };

    /**
     * Check if the supplied URL is relative (i.e., whether or not it starts with http:// or https://)
     * @param url
     */
    const isRelative = (url: string) => !url.match(/^https?:\/\//);

    /**
     * Ensure that the supplied URL is prefixed with a slash, if one does not exist
     * @param url
     */
    const ensureSlash = (url: string) => url + (url.endsWith("/") ? "" : "/");

    /**
     * Get base path from HTML page
     */
    const getBasePath = () => {
        // If basePath is set, return that
        if (config.basePath) {
            return config.basePath;
        }

        // Try fetch meta tag with the name absolut-url
        const absoluteUrl = document.querySelector("meta[name='absolute-url']") as HTMLMetaElement;
        // If meta tag exists, use that
        if (absoluteUrl) {
            return absoluteUrl.content;
        } else {
            // Else, attempt to fetch base element, otherwise simply use an empty string
            const base = document.querySelector("base") as HTMLBaseElement;
            return base?.href ?? "";
        }
    };

    return {
        /**
         * Configure how failed requests will be rejected
         * @param rejectWith Rejection type
         */
        setRejectWith: (rejectWith: RejectWith) => {
            config.rejectWith = rejectWith;
        },
        /** @deprecated Use setRejectWith instead */
        withXhr: () => {
            config.rejectWith = RejectWith.xhr;
        },
        /**
         * Set whether or not credentials will be forwarded with request, be aware of the CORS implications of enabling this.
         * @link {https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials}
         * @param setting Pass true to enable credentials forwarding
         */
        withCredentials: (setting: boolean = true) => {
            config.withCredentials = setting;
        },
        /** Clear any default headers */
        clearDefaultHeaders: () => {
            config.defaultHeaders = {};
        },
        /**
         * Get the value of a default header (if it exists, otherwise return undefined)
         * @param name The name of the headers
         */
        getDefaultHeader: (name: string): HeaderResolver | undefined => {
            return config.defaultHeaders[name];
        },
        /**
         * Set one or more default headers. Default headers previously defined that are not supplied in the collection will NOT be removed
         * @param headers The header collection to add or update
         */
        setDefaultHeaders: (headers: { [name: string]: HeaderResolver }) => {
            for (const key in headers) {
                config.defaultHeaders[key] = headers[key];
            }
        },
        /**
         * Supply a callback that will be invoked before any other configuration is done to the XML HTTP Request object. If the value is null, the callback will be removed
         * @param callback The callback
         */
        setXhrConfigurationCallback(callback: null | ((x: XMLHttpRequest) => void)) {
            config.xhrConfigurationCallback = callback;
        },
        /**
         * Set the base path for all AJAX requests, this will override any other base path configuration
         * @param path Relative or absolute URL
         */
        setBasePath: (path: string | null) => {
            config.basePath = path;
        },
        /** Return the current base path setting */
        getBasePath,
        /**
         * Resolve the supplied URL, taking base path, meta-tag named 'absolute-url', or base tag (in order of precedence) into account
         * @param url The URL to resolve. If the URL itself is absolut, any base path settings will be ignored
         */
        resolveUrl: (url: string) => {
            // If the supplied URL is absolut, return it as is
            if (!isRelative(url)) {
                return url;
            }

            // Resolve base path, if that failes, just use current origin
            const base = getBasePath() ?? window.location.origin;

            // If the current base path is relative, prepend origin to the base path, otherwise use base as it
            // Also ensure that the base isn't prepended with a slash, or things will get annoying
            const absoluteBase = isRelative(base) ? new URL(base.replace(/^\//, ""), ensureSlash(origin)).href : base;

            // Merge the supplied URL, after ensuring that it isn't prepended with /, with the resolved base URL
            return new URL(url.replace(/^\//, ""), ensureSlash(absoluteBase)).href;
        },
        /**
         * Execute an AJAX request
         * @param verb HTTP verb to use
         * @param path The path of the quest
         * @param body The body, only supplied in case of POST, PUT, or PATCH
         * @param headers Any headers to add to the request
         * @param uploadEvent Event handling callback to forward to the XML HTTP Request
         * @param returnXhr Flag to indicate whether or not to reject a failed call with the XHR object itself
         */
        httpFetch: async <T>(verb: string, path: string, body?: any, headers?: { [name: string]: HeaderResolver }, uploadEvent?: (ev: ProgressEvent) => void, returnXhr: boolean = false): Promise<T> => {
            return new Promise<T>(async (resolve, reject) => {
                const xhr: XMLHttpRequest = new XMLHttpRequest();

                // If callback has been supplied, invoke it now
                config.xhrConfigurationCallback?.(xhr);

                // If we should add event handlers, add them now
                if (uploadEvent) {
                    xhr.upload.addEventListener("abort", uploadEvent);
                    xhr.upload.addEventListener("error", uploadEvent);
                    xhr.upload.addEventListener("load", uploadEvent);
                    xhr.upload.addEventListener("loadend", uploadEvent);
                    xhr.upload.addEventListener("loadstart", uploadEvent);
                    xhr.upload.addEventListener("progress", uploadEvent);
                    xhr.upload.addEventListener("timeout", uploadEvent);
                }

                // Add a ready state listener
                xhr.addEventListener("readystatechange", () => {
                    // If the request has yet to complete, just return
                    if (xhr.readyState !== XMLHttpRequest.DONE) {
                        return;
                    }

                    // Less than 300 means success, so yay us
                    if (xhr.status < 300) {
                        try {
                            // If the status is 200 and we have received a response
                            if (xhr.status === 200 && !!xhr.responseText) {
                                // Check the content type
                                const contentType = xhr.getResponseHeader("Content-Type");
                                // If we've received JSON, apply JSON.parse to the payload

                                // TODO: Allow configuration of custom content type resolvers
                                if (contentType && contentType.toLowerCase().indexOf("application/json") > -1) {
                                    resolve(JSON.parse(xhr.responseText));
                                } else {
                                    // Otherwise, we have no idea what it is, just return it as is
                                    resolve((xhr.responseText as unknown) as T);
                                }
                            } else {
                                // If the status was other than 200, just resolve as undefined
                                // TODO: Allow configuration of custom status resolvers
                                resolve((undefined as unknown) as T);
                            }
                        } catch (ex) {
                            // Something went wrong, reject the whole thing with the caught exception
                            reject(ex);
                        }
                    } else {
                        if (returnXhr || config.rejectWith === RejectWith.xhr) {
                            // Should we reject with the XHR?
                            reject(xhr);
                        } else if (config.rejectWith === RejectWith.object) {
                            // Or with a copy of the salient details?
                            const { readyState, response, responseText, responseType, responseURL, status, statusText } = xhr;
                            reject({
                                readyState,
                                response,
                                responseText,
                                responseType,
                                responseURL,
                                status,
                                statusText,
                            });
                        } else {
                            // Otherwise, just reject with the response text and hope for the best
                            reject(xhr.responseText);
                        }
                    }
                });

                xhr.open(verb, path, true);
                xhr.withCredentials = config.withCredentials;

                // For each default header
                for (const name in config.defaultHeaders) {
                    // Do not override request header with default header
                    if (headers && headers[name]) {
                        continue;
                    }

                    let header = config.defaultHeaders[name];
                    if (typeof header == "function") {
                        // If the default header is a producer function, invoke it
                        header = header();
                    }

                    // The header could be a Promise<string> at this point, so call Promise.resolve on it just to be sure
                    xhr.setRequestHeader(name, await Promise.resolve(header));
                }

                if (headers) {
                    // For each supplied header
                    for (const name in headers) {
                        let header = headers[name];
                        if (typeof header == "function") {
                            header = header();
                        }
                        xhr.setRequestHeader(name, await Promise.resolve(header));
                    }
                }

                // Beware truthyness, we want to skip only if the supplied body is null or undefined
                if (body !== null && body !== undefined) {
                    if (body instanceof Blob) {
                        const fd = new FormData();
                        // TODO: Handle any parameter name
                        fd.append("file", body);
                        xhr.send(fd);
                    } else if (body instanceof FormData) {
                        // TODO: Maybe explicitly set content type here
                        xhr.send(body);
                    } else {
                        // Ensure that the content type is set correctly
                        xhr.setRequestHeader("Content-Type", "application/json");
                        xhr.send(JSON.stringify(body));
                    }
                } else {
                    xhr.send();
                }
            });
        },
    };
})();
