import {CommonError} from "../../utils/exception/common-exception";
import {ERROR_TYPE} from "../../utils/enum";
import {ERROR_MESSAGE, STATUS_CODE} from "../../utils/constant";
import { SchoolPageEntity } from "../../entity/school-page.entity";

export const assertNotExistSchoolPage = (schoolPageEntity: SchoolPageEntity) => {
  if (!schoolPageEntity)
    throw new CommonError(
      ERROR_TYPE.DEVELOPER,
      STATUS_CODE.FAIL,
      ERROR_MESSAGE.NOT_EXIST_SCHOOL_PAGE
    );
}

