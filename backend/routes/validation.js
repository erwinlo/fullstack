function isBlank(param) {
  return (param == null || param == "")
}

function isWrong(param) {
  if (param == 'savings' || param == 'current' || param == 'fixed_deposit' || param == 'investment') {
    return false;
  } else {
    return true;
  }
}

function isNegative(param) {
  return (param < 0)
}

function notNumber(param){
  return (typeof param != 'number')
}


module.exports = {
  isBlank: isBlank,
  isWrong: isWrong,
  isNegative: isNegative,
  notNumber: notNumber
};

