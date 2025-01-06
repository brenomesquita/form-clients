interface RequestInits extends RequestInit {
  responseType?: "json" | "blob";
}

export async function fetchWrapper<T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInits | undefined
) {
  const headers: any = {};

  const res = await fetch(`${input}`, {
    ...init,
    headers: { ...init?.headers, ...headers },
  });

  const contentLength = res.headers.get("Content-Length");
  const result =
    !contentLength || contentLength === "0"
      ? null
      : await res[init?.responseType || "json"]();

  if (res.ok) {
    return result as T;
  } else {
    throw new Error(result.message);
  }
}
