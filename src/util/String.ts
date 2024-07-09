export function Trim(s: string) {
  return s?.toString().replace(/^\s+|\s+$/g, "");
}
export function TrimSpace(s: string) {
  return s?.toString().replace(/[_-]/g, " ");
}

export function charReplace(value?: string) {
  if (!value) return value;
  const str = value?.split("");
  str?.forEach((item, index) => {
    const charCode = item.charCodeAt(0);
    if (charCode === 32 || charCode === 8204) {
      str[index] = "-";
    }
  });
  value = str?.join("");
  return value;
}

export function just_persian(str: string) {
  const arabic = /[\u0600-\u06FF]/;
  return !arabic.test(str);
}
