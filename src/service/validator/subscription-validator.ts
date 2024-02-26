import {CommonError} from "../../utils/exception/common-exception";
import {ERROR_TYPE} from "../../utils/enum";
import {ERROR_MESSAGE, STATUS_CODE} from "../../utils/constant";
import { SubscriptionEntity } from "../../entity/subscription.entity";

export const assertNotExistSubscriptionPage = (schoolPageEntity: SubscriptionEntity) => {
  if (!schoolPageEntity)
    throw new CommonError(
      ERROR_TYPE.DEVELOPER,
      STATUS_CODE.FAIL,
      ERROR_MESSAGE.NOT_EXIST_SUBSCRIPTION_SCHOOL_PAGE
    );
}

