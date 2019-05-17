
const crypto = require('crypto');
const  algorithm = 'aes-256-ctr';
const Buffer = require('buffer');

/**https://blog.csdn.net/koastal/article/details/78789943
*使用AES-256-ctr加密数据
* obj ——加密对象,可以为buffer对象，
* password ——加密密钥
 * 返回加密后的数据
 * JSON.parse(jsonstr); //可以将json字符串转换成json对象
 *JSON.stringify(jsonobj); //可以将json对象转换成json对符串
 */
export function aesEncrypt(obj,password) {
  if(typeof obj == 'string'){
    obj = buffer.from(obj);
  }else if(typeof obj == 'object'){
    obj = Buffer.from(JSON.stringify(obj));
  }
    let cipher = crypto.createCipher(algorithm,password);
    let crypted = Buffer.concat([cipher.update(obj),cipher.final()]);
    return crypted;
}

/**
 *使用AES-256-ctr解密密数据
 * obj ——解密对象
 * password ——解密密钥
 * 返回解密后的数据
 */
export function aesDecrypt(obj,password) {
  let decipher = crypto.createCipher(algorithm,password);
  let dec = Buffer.concat([decipher.update(obj),decipher.final()]);
  return dec;
}

