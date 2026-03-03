export function getCookie(name) {
  return document.cookie.replace(
    new RegExp(`(?:(?:^|.*;\\s*)${name}\\s*=\\s*([^;]*).*$)|^.*$`),
    "$1",
  );
}

export function removeCookie(name) {
  // 注意：path 要跟你當初寫入的一樣（你是 path=/）
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}
