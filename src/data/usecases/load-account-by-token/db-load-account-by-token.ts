import { Decrypter } from '@/data/protocols/criptography/decrypter';
import {
  AccountModel,
  LoadAccountByToken
} from '../add-account/db-add-account-protocols';

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(private readonly decrypter: Decrypter) {}

  async load(accessToken: string, role?: string): Promise<AccountModel> {
    await this.decrypter.decrypt(accessToken);

    return null;
  }
}
