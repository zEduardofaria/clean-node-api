import { AddAccountRepository } from '@/data/protocols/add-account-repository';
import { AccountModel } from '@/domain/models';
import { AddAccountModel } from '@/domain/usecases';
import { MongoHelper } from '../helpers/mongo-helper';

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getConnection('accounts');

    const result = await accountCollection.insertOne(accountData);
    const { insertedId: id } = result;

    const accountById = await accountCollection.findOne({ _id: id });

    return MongoHelper.map(accountById);
  }
}
