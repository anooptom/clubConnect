const bcrypt = require('bcrypt');
const { promisify } = require('util');

const hash = promisify(bcrypt.hash);

async function encr(pass) {
  try {
    const salt = "$2b$04$iBo8ehfnErqLRmILo.48nu";
    
    const hashedPassword = await hash(pass, salt);
    return hashedPassword;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
    encr: encr
  };