import { API_ROUTE, endpointFront } from "../Components/Routes/Enrouters";
import { getToken, removeToken } from "./Auth";

const originalFetch = window.fetch;

window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
  const url =
    typeof input === "string"
      ? input
      : input instanceof URL
        ? input.href
        : input.url;
  const isApiUrl = url.includes(API_ROUTE);
  const token = getToken();
  // eslint-disable-next-line prefer-const
  let customInit = { ...init };
  if (isApiUrl && token) {
    const headers = new Headers(customInit?.headers);
    headers.set("Authorization", `Bearer ${token}`);
    customInit.headers = headers;
  }
  const response = await originalFetch(input, customInit);
  if (response.status === 401 && isApiUrl) {
    console.warn("Unauthorized access detected. Logging out.");
    removeToken();
    window.location.href = endpointFront.login.action;
  }
  return response;
};
