import queryStringify from 'helpers/queryStringify';

enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Request = {
  method?: METHODS;
  timeout?: number;
  data?: unknown;
  headers?: Record<string, string>;
};

class XHRFetch {
  get = (url: string, options = {}) => this.request(url, { ...options, method: METHODS.GET });

  post = (url: string, options = {}) => this.request(url, { ...options, method: METHODS.POST });

  put = (url: string, options = {}) => this.request(url, { ...options, method: METHODS.PUT });

  delete = (url: string, options = {}) => this.request(url, { ...options, method: METHODS.DELETE });

  request = (url: string, options: Request) => {
    const {
      headers = {}, method = METHODS.GET, data, timeout = 5000,
    } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(
        method,
        method === METHODS.GET && !!data
          ? `${url}${queryStringify(data)}`
          : url,
      );

      if (timeout) {
        xhr.timeout = timeout;
      }

      Object.keys(headers).forEach((header) => {
        xhr.setRequestHeader(header, headers[header]);
      });

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      xhr.onload = () => {
        if (xhr.status >= 300) {
          reject(xhr);
        } else {
          resolve(xhr);
        }
      };

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data as any);
      }
    });
  };
}

export default new XHRFetch();
