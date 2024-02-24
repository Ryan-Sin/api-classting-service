import {CommonError} from "../../utils/common-exception";
import {ERROR_TYPE} from "../../utils/enum";
import {ERROR_MESSAGE, STATUS_CODE} from "../../utils/constant";
import { StudentEntity } from "../../entity/student.entity";

export const assertNotExistStudent = (studentEntity: StudentEntity) => {
    if (!studentEntity)
        throw new CommonError(
            ERROR_TYPE.DEVELOPER,
            STATUS_CODE.FAIL,
            ERROR_MESSAGE.NOT_EXIST_MEMBER
        );
}

export const assertExistStudent = (studentEntity: StudentEntity) => {
    if (studentEntity)
        throw new CommonError(
            ERROR_TYPE.DEVELOPER,
            STATUS_CODE.FAIL,
            ERROR_MESSAGE.EXIST_MEMBER
        );
}

export const assertStudentPasswordMismatch = (studentEntity: StudentEntity, decryptionPassword: string) => {
    if (studentEntity.password !== decryptionPassword)
        throw new CommonError(
            ERROR_TYPE.DEVELOPER,
            STATUS_CODE.FAIL,
            ERROR_MESSAGE.PASSWORD_MISMATCH
        );

}
