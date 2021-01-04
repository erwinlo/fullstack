function isBlank(param) {
  return (param === null || param === '')
}

function isNegative(param) {
  return (param < 0)
}

function notNumber(param){
  return (typeof param != 'number')
}

function invalidEmail(param) {
  let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (param.match(mailformat)) {
    return false;
  } else {
    return true;
  }
}

function validPassword(param) {
     return (/^(?=.*[\w])\S{6,20}$/).test(param);
}


module.exports = {
  isBlank: isBlank,
  isNegative: isNegative,
  notNumber: notNumber, 
  invalidEmail: invalidEmail,
  validPassword: validPassword
};

