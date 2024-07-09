import axios, { ResponseType } from "axios";
import { getParam } from "./AxiosParamResolver";
import Cookies from "js-cookie";
import { Login401 } from "./Logout";
import { Delete } from "../util/Object";
import { getState } from "../store/Store";

export type AxiosRequestConfig = {
  ignoreNotifyError?: number[];
  versionUrl?: string;
  version?: number;
  versionSkip?: boolean;
  base?: "CSR";
  headers?: any;
  params?: any;
  data?: any;
  method?: string;
  baseURL?: string;
  url?: string;
  httpAgent?: any;
  responseType?: ResponseType;
  environment?: string;
};

export const baseURL = (env?: string) =>
  isProductionData(env)
    ? {
        CSR: "http://ef666f36-0e89-4d95-9dbc-006d1b95b64a.hsvc.ir:30051/api/v1/",
      }
    : {
        CSR: "http://ef666f36-0e89-4d95-9dbc-006d1b95b64a.hsvc.ir:30051/api/v1/",
      };

export const isProduction = process.env.NEXT_PUBLIC_ENV === "production";
export const isProductionData = (env?: string) =>
  isProduction || env === "production";
export const URL = isProduction
  ? "https://www.grand-bazaar.ir/"
  : "http://ef666f36-0e89-4d95-9dbc-006d1b95b64a.hsvc.ir:30051";

export function getHeader() {
  const auth = Cookies.get("auth");
  const headers = {
    Authorization: `Bearer ${auth}`,
    traceNumber: `zishoppanel-${new Date().getTime()}`,
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "public",
    "Content-Type": "application/json",
    "api-version": "1.0",
  };
  if (!auth) Delete(headers, "Authorization");
  return headers;
}

export function Axios(params: AxiosRequestConfig) {
  params = setParam(params);
  return axios({
    baseURL: baseURL(params.environment)[params.base || "CSR"],
    headers: { ...getHeader(), ...(params.headers || {}) },
    paramsSerializer: {
      indexes: null, // no brackets at all
    },
    method: "GET",

    ...params,
    url: params.url?.endsWith("/") ? params.url : params.url + "/",
  }).catch((error: any) => {
    return checkError(error, params);
  });
}
// function replaceAll(target: string, search: string, replacement: string) {
//   return target.replace(new RegExp(search, "g"), replacement);
// }

export function setParam(params: AxiosRequestConfig) {
  params.params = getParam(params.params); // remove null and undefined and empty params
  if (params.data?.get && !params.data?.get("file")) {
    // if not formData
    params.data = getParam(params.data); // remove null and undefined and empty data
  }
  return params;
}

export function checkAxiosError(error: any, params: AxiosRequestConfig) {
  params = setParam(params);
  return checkError(error, params);
}

function checkError(error: any, params: AxiosRequestConfig) {
  const setNotify = getState("setNotify");
  if (!error.response) {
    setNotify({
      type: "error",
      text: "خطای اتصال به سرویس دهنده",
    });
    // setSplunk(error?.request?.headers, error).then();
    return Promise.reject(error);
  }
  if (
    error.response?.status === 401 &&
    !params?.ignoreNotifyError?.includes(error.response?.status)
  ) {
    Login401();
  }
  if (error.response.status === 401) {
    return Promise.reject(error);
  }
  if (error.response.status === 404) {
    return Promise.reject(error);
  }
  if (error.response.status === 402) {
    return Promise.reject(error);
  }

  if (error.response.status === 412) {
    // version is wrong
    return Promise.reject(error);
  }

  if (error.response.status === 429) {
    setNotify({
      type: "error",
      text: "محدودیت تعداد درخواست، لطفا ۱ دقیقه دیگر تلاش نمایید",
    });
    return Promise.reject(error);
  }

  if (error.response.status >= 500) {
    // setSplunk(error.request.headers, error.response).then();
    return Promise.reject(error);
  }
  if (
    !params?.ignoreNotifyError?.includes(error.response?.status) &&
    (error.response.inputErrors || error.response.data?.inputErrors)
  ) {
    const errors =
      error.response.inputErrors || error.response.data?.inputErrors;

    if (errors)
      Object.keys(errors)?.map((item) =>
        setNotify({ type: "error", text: errors[item] }),
      );
  }
  if (
    !params?.ignoreNotifyError?.includes(error.response.status) &&
    (error.response.message ||
      error.response.data?.actionMessage ||
      error.response.data?.error) &&
    error.response.data?.codeNumber !== 4000 // 4000 is code for inputErrors
  ) {
    setNotify({
      type: "error",
      text:
        error.response.message ||
        error.response.data?.actionMessage ||
        error.response.data?.error,
    });
  }

  return Promise.reject(error);
}
