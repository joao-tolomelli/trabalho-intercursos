import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL ?? "/api",
  withCredentials: true,
});

type CsrfTokenResponse = {
  csrf_token: string;
};

const STATE_CHANGING_METHODS = new Set(["post", "put", "patch", "delete"]);

let csrfToken: string | null = null;
let csrfTokenRequest: Promise<string> | null = null;

const isStateChangingMethod = (method?: string) => {
  if (!method) return false;
  return STATE_CHANGING_METHODS.has(method.toLowerCase());
};

const setCsrfToken = (token: string) => {
  csrfToken = token;
  api.defaults.headers.common["X-CSRFToken"] = token;
};

export const initializeCsrfToken = async () => {
  if (csrfToken) return csrfToken;

  if (!csrfTokenRequest) {
    csrfTokenRequest = api
      .get<CsrfTokenResponse>("/auth/csrf-token")
      .then((response) => {
        const token = response.data?.csrf_token;

        if (!token) {
          throw new Error("Token CSRF não encontrado na resposta.");
        }

        setCsrfToken(token);
        return token;
      })
      .finally(() => {
        csrfTokenRequest = null;
      });
  }

  return csrfTokenRequest;
};

api.interceptors.request.use(async (config) => {
  if (isStateChangingMethod(config.method) && !csrfToken) {
    await initializeCsrfToken();
  }

  if (isStateChangingMethod(config.method) && csrfToken) {
    config.headers = config.headers ?? {};
    (config.headers as Record<string, string>)["X-CSRFToken"] = csrfToken;
  }

  return config;
});

// Interceptor para renovar token CSRF quando expirar
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Se for erro 403 CSRF e ainda não tentou renovar
    if (
      error.response?.status === 403 &&
      originalRequest &&
      !originalRequest._retry &&
      isStateChangingMethod(originalRequest.method)
    ) {
      originalRequest._retry = true;

      try {
        // Limpa o token expirado
        csrfToken = null;

        // Obtém um novo token
        await initializeCsrfToken();

        // Tenta novamente com o novo token
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
