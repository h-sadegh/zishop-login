import { Trim } from "../util/String";

export function getParam(params: any) {
  if (!checkNull(params)) return undefined;
  if (checkType(params)) return params;
  let newParam = {};
  Object.keys(params).forEach((item: string) => {
    const value = getParam(params[item]);
    if (checkNull(value)) newParam = { ...newParam, [item]: value };
  });
  return newParam;
}

function checkType(value: any) {
  if (
    typeof value === "string" ||
    typeof value === "boolean" ||
    typeof value === "number" ||
    Array.isArray(value)
  )
    return true;
}

function checkNull(value: any) {
  if (value === undefined) return false;
  if (value === null) return false;
  if (typeof value === "string" && Trim(value) === "") return true;
  if (
    typeof value === "string" &&
    Trim(value.toLowerCase()) !== "null" &&
    Trim(value.toLowerCase()) !== "undefined"
  )
    return true;
  if (value === 0) return true;
  if (typeof value === "number") return true;
  if (typeof value === "boolean") return true;
  if (Array.isArray(value)) return true;
  // @ts-ignore
  return !(value === {} || Object.keys(value).length === 0);
}
