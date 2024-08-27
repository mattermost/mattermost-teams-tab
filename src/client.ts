export class FetchError extends Error {
  status_code?: number;

  constructor(message: string, status_code: number) {
    super(message)
    this.status_code = status_code;

    // Ensure message is treated as a property of this class when object spreading. Without this,
    // copying the object by using `{...error}` would not include the message.
    Object.defineProperty(this, 'message', { enumerable: true });
  }
}

export const validateServerURL = async (mattermostServerURL: string, authToken: string) => {
  try {
    let response = await fetch(
      `${mattermostServerURL}/plugins/playbooks/tabapp/runs`,
      {
        method: 'OPTIONS',
        headers: {
          "Authorization": authToken,
        },
      }
    );

    if (response.ok) {
      return true
    } else {
      return false
    }
  } catch (e) {
    console.warn("Validating Mattermost server failed", mattermostServerURL, e)
  }
}

export const fetchPlaybookRuns = async (mattermostServerURL: string, authToken: string) => {
  let response = await fetch(
    `${mattermostServerURL}/plugins/playbooks/tabapp/runs?page=0&per_page=100`,
    {
      headers: {
        "Authorization": authToken,
      },
    }
  );
  const contentType = response.headers.get('content-type');

  if (response.ok) {
    if (contentType !== 'application/json') {
      throw new FetchError('unexpected contentType: ' + contentType, response.status)
    }

    return await response.json();
  }

  let error: string;
  if (contentType === 'application/json') {
    let data: any;
    data = await response.json();
    error = data?.error;
  } else {
    error = await response.text();
  }

  throw new FetchError(error, response.status)
}
