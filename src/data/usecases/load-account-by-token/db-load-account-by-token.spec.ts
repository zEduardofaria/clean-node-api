import { Decrypter } from '@/data/protocols/criptography/decrypter';
import { AccountModel } from '../add-account/db-add-account-protocols';
import { DbLoadAccountByToken } from './db-load-account-by-token';
import { LoadAccountByTokenRepository } from '../../protocols/db/account/load-account-by-token-repository';

const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt(value: string): Promise<string> {
      return Promise.resolve('any_value');
    }
  }
  return new DecrypterStub();
};

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password'
});

const makeLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub
    implements LoadAccountByTokenRepository
  {
    async loadByToken(token: string, role?: string): Promise<AccountModel> {
      return Promise.resolve(makeFakeAccount());
    }
  }
  return new LoadAccountByTokenRepositoryStub();
};

interface SutTypes {
  decrypterStub: Decrypter;
  sut: DbLoadAccountByToken;
  loadAccountByTokenRepositorStub: LoadAccountByTokenRepository;
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypter();
  const loadAccountByTokenRepositorStub = makeLoadAccountByTokenRepository();
  const sut = new DbLoadAccountByToken(
    decrypterStub,
    loadAccountByTokenRepositorStub
  );

  return {
    decrypterStub,
    loadAccountByTokenRepositorStub,
    sut
  };
};

describe('DbLoadAccountByToken Usecase', () => {
  test('Should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut();
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt');
    await sut.load('any_token', 'any_role');
    expect(decryptSpy).toHaveBeenCalledWith('any_token');
  });

  test('Should return null if Decrypter returns null', async () => {
    const { sut, decrypterStub } = makeSut();
    jest.spyOn(decrypterStub, 'decrypt').mockResolvedValueOnce(null);
    const account = await sut.load('any_token', 'any_role');
    expect(account).toBeNull();
  });

  test('Should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositorStub } = makeSut();
    const loadByTokenSpy = jest.spyOn(
      loadAccountByTokenRepositorStub,
      'loadByToken'
    );
    await sut.load('any_token', 'any_role');
    expect(loadByTokenSpy).toHaveBeenCalledWith('any_token', 'any_role');
  });

  test('Should return null if LoadAccountByTokenRepository returns null', async () => {
    const { sut, loadAccountByTokenRepositorStub } = makeSut();
    jest
      .spyOn(loadAccountByTokenRepositorStub, 'loadByToken')
      .mockResolvedValueOnce(null);
    const account = await sut.load('any_token', 'any_role');
    expect(account).toBeNull();
  });
});
