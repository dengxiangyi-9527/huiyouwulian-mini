function isValidPhone(str) {
  // var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
  var myreg = /^1\d{10}$/;
  if (!myreg.test(str)) {
    return false;
  } else {
    return true;
  }
}

module.exports = {
  isValidPhone
}