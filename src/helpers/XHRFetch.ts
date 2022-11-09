import { Method } from './types';

type Options = {
  method?: Method;
  timeout?: number;
  data?: unknown;
  headers?: Record<string, string>;
};

export const Methods = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

class XHRFetch {
  get = (url: string, options: Options = {}) => {
    return this
      .request(url, { ...options, method: Methods.GET });
  };

  post = (url: string, options: Options = {}) => {
    return this
      .request(url, { ...options, method: Methods.POST });
  };

  put = (url: string, options: Options = {}) => {
    return this
      .request(url, { ...options, method: Methods.PUT });
  };

  delete = (url: string, options: Options = {}) => {
    return this
      .request(url, { ...options, method: Methods.DELETE });
  };

  request = (url: string, options: { method: any; data?: any }, timeout = 5000) => {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const formData = new FormData();

      xhr.open(method, `${process.env.API_ENDPOINT}${url}`);

      if (!(data instanceof File)) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }
      if (data instanceof File) {
        formData.append('avatar', data);
      }

      xhr.timeout = timeout;
      xhr.withCredentials = true;
      xhr.onload = () => {
        if (xhr.status < 400) {
          resolve(xhr.response);
        } else {
          reject(xhr.response);
        }
      };

      xhr.ontimeout = reject;
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.responseType = 'json';

      if (method === Methods.GET) {
        xhr.send();
      } else if (data instanceof File) {
        xhr.send(formData);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}

const ComposedXHRFetch = new XHRFetch();

export { ComposedXHRFetch as XHRFetch };
