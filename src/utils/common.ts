import { pbkdf2Sync, randomBytes, createHash } from "crypto";
import * as dayjs from "dayjs";

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

/**
 * @author Ryan
 * @description 년월일 값 반환
 */
export const getYearMonthDay = () =>
  dayjs().format("YYYY-MM-DD");

/**
 * @author Ryan
 * @description 특정 데이터 sha256으로 암호화
 * @param data 데이터
 */
export const setHashCode = (data: string) =>
  createHash("sha256").update(data).digest("hex");

/**
 * @author Ryan
 * @description 랜덤 임시 비밀번호 생성(8~20자 , 숫자 , 소문자 영문, 특수문자 (~ ! @ # $ % ^ * ,) 중 3개 조합 필수)
 * 정규식(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/)
 */
export const generateTemporaryPassword = () => {
  const length = 20;
  const specialChars = "!@#$%^*+=-";
  const numbers = "0123456789";
  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const getRandomChar = (charSet) => charSet[Math.floor(Math.random() * charSet.length)];

  const password = [
    getRandomChar(letters),
    getRandomChar(specialChars),
    getRandomChar(numbers)
  ];

  return password.concat(
    Array.from({ length: length - 3 }, () => {
      const charSet = letters + specialChars + numbers;
      return getRandomChar(charSet);
    })
  )
    .sort(() => Math.random() - 0.5)
    .join("");
};
