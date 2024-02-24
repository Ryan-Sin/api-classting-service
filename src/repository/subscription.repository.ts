import {Inject, Injectable} from '@nestjs/common';
import {DataSource, Repository} from "typeorm";
import {SubscriptionEntity} from "../entity/subscription.entity";

@Injectable()
export class SubscriptionRepository {
    private readonly repository: Repository<SubscriptionEntity>;

    constructor(
        @Inject('DATA_SOURCE') dataSource: DataSource) {
        this.repository = dataSource.getRepository(SubscriptionEntity).extend({});
    }

}