/**
  * @date: 转换万元 
  * @format:
  */
export function thousandMoney(value) {
  return Math.floor(value / 10000)
}

/**
  * @date: 转换金额格式 
  * @format:
  */
export function formatMoney(amt, foramat = true, length = 2) {

  if (!isEmpty(amt)) {
    amt = amt + '';
    let zf = '';
    if (amt.charAt(0) == '+' || amt.charAt(0) == '-') {
      zf = amt.charAt(0);
      amt = amt.substr(1);
    }
    amt = parseFloat(amt.replace(/[^\d\.-]/g, "")).toFixed(length) + "";
    var l = amt.split(".")[0].split("").reverse();
    var r = amt.split(".")[1];
    if (foramat) {
      var t = "";
      for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
      }
      l = t.split("");
    }
    if (r) {
      return zf + l.reverse().join("") + "." + r;
    } else {
      return zf + l.reverse().join("");
    }
  } else {
    return '0.00';
  }
}

export function isEmpty(val) {
  if (val === undefined || val === null || val.length === 0) {
    return true;
  }
  return false;
}