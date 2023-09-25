export function parseJwt(token) {
  if (!token) {
    return null;
  }

  const tokenSplitList = token.split(".");
  if (tokenSplitList.length < 2) {
    return null;
  }

  const base64Url = tokenSplitList[1];
  if (base64Url === null || base64Url === undefined) {
    return null;
  }

  const base64 = base64Url.replace("-", "+").replace("_", "/");

  try {
    return JSON.parse(window.atob(base64));
  } catch (error) {
    return null; // Handle parsing errors gracefully
  }
}

//source https://dev.to/ebereplenty/decoding-jasonwebtokens-on-the-frontend-4gpm
