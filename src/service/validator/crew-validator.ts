import {CrewEntity} from "../../entity/crew.entity";
import {CommonError} from "../../utils/common-exception";
import {ERROR_TYPE} from "../../utils/enum";
import {ERROR_MESSAGE, STATUS_CODE} from "../../utils/constant";

export const assertNotExistCrew= (crewEntity: CrewEntity) => {
    if (!crewEntity)
        throw new CommonError(
            ERROR_TYPE.DEVELOPER,
            STATUS_CODE.FAIL,
            ERROR_MESSAGE.NOT_EXIST_ADMIN
        );
}

export const assertExistCrew= (crewEntity: CrewEntity) => {
    if (crewEntity)
        throw new CommonError(
            ERROR_TYPE.DEVELOPER,
            STATUS_CODE.FAIL,
            ERROR_MESSAGE.EXIST_MEMBER
        );
}

export const assertCrewPasswordMismatch = (crewEntity: CrewEntity, decryptionPassword: string) => {
    if (crewEntity.password !== decryptionPassword)
        throw new CommonError(
            ERROR_TYPE.DEVELOPER,
            STATUS_CODE.FAIL,
            ERROR_MESSAGE.PASSWORD_MISMATCH
        );

}
