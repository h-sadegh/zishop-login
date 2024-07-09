export function emailValidation(email: string) {
  if (havePersian(email)) return false;
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
export function NationalCodeValidation(code?: string) {
  if (!code) return false;
  if (code.length < 8 || parseInt(code, 10) === 0) return false;
  code = ("0000" + code).substr(code.length + 4 - 10);
  if (parseInt(code.substr(3, 6), 10) === 0) return false;
  const c = parseInt(code.substr(9, 1), 10);
  let s = 0;
  for (let i = 0; i < 9; i++) s += parseInt(code.substr(i, 1), 10) * (10 - i);
  s = s % 11;
  return (s < 2 && c === s) || (s >= 2 && c === 11 - s);
}

export function ShebaCodeValidation(code?: string) {
  if (!code) return false;
  // const level1 = code + "1827";
  // const level2 = level1.slice(2, level1.length) + level1.slice(0, 2);
  // const level3 = +level2 % 97;
  // return level3 === 1;
  const rearranged = code.substring(4, code.length) + code.substring(0, 4);
  const numeric = Array.from(rearranged)
    .map((c) => (isNaN(parseInt(c)) ? (c.charCodeAt(0) - 55).toString() : c))
    .join("");
  const remainder = Array.from(numeric)
    .map((c) => parseInt(c))
    .reduce((remainder, value) => (remainder * 10 + value) % 97, 0);

  return remainder === 1;
}

export function isPersianString(st: string) {
  const str_to_arr_of_UTF8 = new TextEncoder().encode(st);
  const filter = str_to_arr_of_UTF8.filter((e) => e > 128 && e < 220);
  return filter.length === str_to_arr_of_UTF8.length;
}

export function havePersian(st: string) {
  const str_to_arr_of_UTF8 = new TextEncoder().encode(st);
  const filter = str_to_arr_of_UTF8.filter((e) => e > 128 && e < 220);
  return filter.length > 0;
}

export function isEnglishString(st: string) {
  const p = /^[\u0600-\u06FF\s]+$/;
  return p.test(st);
}

export function isNumber(st: string) {
  const str_to_arr_of_UTF8 = new TextEncoder().encode(st);
  const filter = str_to_arr_of_UTF8.filter((e) => e >= 49 && e <= 58);
  return filter.length === str_to_arr_of_UTF8.length;
}

export function isSpecialCharacter(st: string) {
  const str_to_arr_of_UTF8 = new TextEncoder().encode(st);
  const filter = str_to_arr_of_UTF8.filter(
    (e) =>
      (e >= 33 && e <= 47) ||
      (e >= 91 && e <= 96) ||
      (e >= 59 && e <= 64) ||
      (e >= 123 && e <= 126),
  );
  return filter.length === str_to_arr_of_UTF8.length;
}

export function mobileValidation(mobile: string) {
  if ((mobile || "").match("^(\\+98|0098|98|0)?9\\d{9}$")) return true;
  else return false;
}
