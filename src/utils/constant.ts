/**
 * @author Ryan
 * @description Common Status 코드
 */
export const STATUS_CODE = {
  SUCCESS: 'success',
  FAIL: 'fail',
  DISASTER: 'disaster',
};

/**
 * @author Ryan
 * @description 각 도메인 Error 메세지 정의
 */
export const ERROR_MESSAGE = {
  SERVER_ERROR: '개발팀의 문의해주세요.',
  UNAUTHORIZED: "유효한 인증 자격 증명이 없습니다.",
  NOT_EXIST_ADMIN: "관리자 계정이 존재하지 않습니다.",
  NOT_EXIST_MEMBER: "회원이 존재하지 않습니다.",
  EXIST_MEMBER: "가입 된 회원입니다.",
  PASSWORD_MISMATCH: "비밀번호가 일치하지 않습니다.",
  INVALID_TYPE_SETTING: "올바른 타입을 설정해주세요.",
  NOT_EXIST_SCHOOL: "학교가 존재하지 않습니다.",
  NOT_EXIST_SCHOOL_PAGE: "학교 페이지가 존재하지 않습니다.",
  EXIST_SCHOOL_PAGE: "학교 페이지가 존재합니다.",
  NOT_EXIST_SCHOOL_NEWS: "학교 소식이 존재하지 않습니다.",
  NOT_EXIST_SUBSCRIPTION_SCHOOL_PAGE: "구독중인 학교 페이지가 존재하지 않습니다.",
};
