import {CommonError} from "../../utils/exception/common-exception";
import {ERROR_TYPE} from "../../utils/enum";
import {ERROR_MESSAGE, STATUS_CODE} from "../../utils/constant";
import { SchoolNewsEntity } from "../../entity/school-news.entity";

export const assertNotExistSchoolNews = (schoolNewsEntity: SchoolNewsEntity) => {
  if (!schoolNewsEntity)
    throw new CommonError(
      ERROR_TYPE.DEVELOPER,
      STATUS_CODE.FAIL,
      ERROR_MESSAGE.NOT_EXIST_SCHOOL_NEWS
    );
}

