export function isEmpty(obj) {
  return isNil(obj) || (isFinite(obj.length) && obj.length === 0);
}
export function isNil(obj) {
  return obj == null;
}
export function isString(obj) {
  return typeof obj === 'string';
}
export function isFunction(obj) {
  return typeof obj === 'function';
}

export function urlQuery() {
  const pairs = window.location.search.substring(1).split('&');
  const obj = {};

  for (let i in pairs) {
    if (pairs[i] === '') {
      continue;
    }

    const [key, value] = pairs[i].split('=');
    obj[decodeURIComponent(key)] = decodeURIComponent(value);
  }

  return obj;
}

export function fetchJSON(url, options = { method: 'GET' }) {
  const controller = new AbortController();
  const { signal } = controller;
  return {
    promise: fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      signal,
      ...options,
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    }),
    controller,
  };
}

const images = [
  'https://images.unsplash.com/photo-1509082916244-3c5018ed3651?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1547700055-b61cacebece9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1535378620166-273708d44e4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1524582642571-404d774f344f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1530095829295-3924294a386c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1508521049563-61d4bb00b270?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1523438927869-e5819c560724?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
];

let imageIndex = -1;

export function getImage() {
  return images[++imageIndex % (images.length - 1)];
}
