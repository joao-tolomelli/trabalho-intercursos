import { initializeCsrfToken } from "@/utils/api";

export const fetchCsrfToken = async () => {
  return initializeCsrfToken();
};
