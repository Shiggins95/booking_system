export interface HeadersObject {
    [token: string]: string;
    contentType: string;
}
export interface RequestParams {
    url: string;
    body?: Object;
}

const generateHeaders = () => {
  const requestHeaders = new Headers();
  let { REACT_APP_API_KEY } = process.env;
  if (!REACT_APP_API_KEY) REACT_APP_API_KEY = '';
  requestHeaders.set('token', REACT_APP_API_KEY);
  requestHeaders.set('Content-Type', 'application/json');
  return requestHeaders;
};

export const post = async (params: RequestParams) => {
  const {
    url, body,
  } = params;
  if (!body) {
    return { error: true };
  }

  const data = await fetch(`http://localhost:8080/${url}`, {
    method: 'POST',
    headers: generateHeaders(),
    body: JSON.stringify(body),
  });
  const parsedData = await data.json();
  console.log('POST REQUEST RESPONSE: ', parsedData);
  return parsedData;
};

export const get = async ({ url }:RequestParams) => {
  const data = await fetch(`http://localhost:8080/${url}`, {
    headers: generateHeaders(),
  });
  const parsedData = await data.json();
  console.log('GET REQUEST RESPONSE: ', parsedData);
  return parsedData;
};
