import { Base64 } from "js-base64";
import pako from "pako";

/**
 * 解压
 * @param b64Data 解压源
 */
export function unzip(b64Data: string) {
  const strData = Base64.atob(b64Data);
  const charData = strData.split("").map(function (x) {
    return x.charCodeAt(0);
  });
  const binData = new Uint8Array(charData);
  const data = pako.ungzip(binData);
  // ↓切片处理数据，防止内存溢出报错↓
  let str = "";
  const chunk = 8 * 1024;
  let i;
  for (i = 0; i < data.length / chunk; i++) {
    str += String.fromCharCode.apply(
      null,
      Array.from(data.slice(i * chunk, (i + 1) * chunk))
    );
  }
  str += String.fromCharCode.apply(null, Array.from(data.slice(i * chunk)));
  // ↑切片处理数据，防止内存溢出报错↑
  const unzipStr = Base64.decode(str);
  let result = "";
  // 对象或数组进行JSON转换
  try {
    result = JSON.parse(unzipStr);
  } catch (error: unknown) {
    if (/Unexpected token o in JSON at position 0/.test(String(error))) {
      // 如果没有转换成功，代表值为基本数据，直接赋值
      result = unzipStr;
    }
  }
  return result;
}
