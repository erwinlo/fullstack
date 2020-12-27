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

module.exports = {
  isBlank: isBlank,
  isWrong: isWrong
};

