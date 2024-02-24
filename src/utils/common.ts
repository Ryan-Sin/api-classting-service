import { pbkdf2Sync, randomBytes } from "crypto";

/**
 * @author Ryan
 * @description 전달받은 데이터에서 존재하는 데이터만 구분하는 함수
 * @param object
 * @returns {Any} 문자열 또는 숫자 등 여러형태 데이터가 반환될 수 있습니다.
 */
export const stringifyWithoutCircular = (object: any) => {
  let output = object;
  try {
    output = JSON.stringify(object, getCircularReplacer());
  } catch (e) {
    // intentional
  }
  return output;
};

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return function(key, value) {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return null;
      }
      seen.add(value);
    }
    return value;
  };
};

/**
 * @author Ryan
 * @description salt & password 생성
 *
 * @param {String} password 비밀번호
 */
export const passwordEncryption = (password) => {
  const salt = randomBytes(64);

  const encryptionPassword = pbkdf2Sync(
    password,
    salt.toString("base64"),
    100000,
    64,
    "sha512"
  );

  return {
    salt: salt.toString("base64"),
    encryptionPassword: encryptionPassword.toString("base64")
  };
};

/**
 * @author Ryan
 * @description 기존 비밀번호로 암호화 및 검증
 *
 * @param {String} salt salt 값
 * @param {String} password 비밀번호
 */
export const passwordDecryption = (salt, password) => {
  const decryptionPassword = pbkdf2Sync(
    password,
    salt.toString("base64"),
    100000,
    64,
    "sha512"
  );

  return decryptionPassword.toString("base64");
};
