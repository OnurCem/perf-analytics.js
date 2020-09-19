const baseURL = 'http://localhost:8080'; // TODO Get from env variable

interface RequestConfig {
  data: unknown;
}

type Config = RequestConfig & RequestInit;

export const makeRequest = (url: string, config: Config): Promise<Response> =>
  new Promise((resolve, reject) => {
    fetch(`${baseURL}${url}`, {
      ...config,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config.data),
    })
      .then((response) => resolve(response.json()))
      .catch(reject);
  });
