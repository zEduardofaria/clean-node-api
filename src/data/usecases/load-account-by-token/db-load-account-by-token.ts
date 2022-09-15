import { Decrypter } from '@/data/protocols/criptography/decrypter';
import { LoadAccountByTokenRepository } from '@/data/protocols/db/account/load-account-by-token-repository';
import {
  AccountModel,
  LoadAccountByToken
} from '../add-account/db-add-account-protocols';

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load(accessToken: string, role?: string): Promise<AccountModel> {
    const token = await this.decrypter.decrypt(accessToken);

    if (token) {
      await this.loadAccountByTokenRepository.loadByToken(accessToken, role);
    }

    return null;
  }
}
