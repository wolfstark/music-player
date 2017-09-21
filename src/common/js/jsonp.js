import originJsonp from "jsonp";

export default function jsonp(url, data, option) {
  url += (url.indexOf("?") < 0 ? "?" : "&") + param(data);

  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
}

export function param(data) {
  const paramsArr = Object.keys(data).map(key => {
    return `${key}=${encodeURIComponent(
      data[key] === undefined ? "" : data[key]
    )}`;
  });
  return paramsArr.join("&");
}
