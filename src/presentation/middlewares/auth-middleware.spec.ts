import { forbidden, ok } from '../helpers/http/http-helper';
import { AccessDeniedError } from '../errors';
import { AuthMiddleware } from './auth-middleware';
import {
  AccountModel,
  HttpRequest
} from '../controllers/login/signup/signup-controller-protocols';
import { LoadAccountByToken } from '../../domain/usecases/load-account-by-token';

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password'
});

const makeFakeRequest = (): HttpRequest => ({
  headers: {
    'x-access-token': 'any_token'
  }
});

const makeLoadAccountByTokenStub = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load(accessToken: string, role?: string): Promise<AccountModel> {
      return Promise.resolve(makeFakeAccount());
    }
  }

  return new LoadAccountByTokenStub();
};

interface SutTypes {
  loadAccountByTokenStub: LoadAccountByToken;
  sut: any;
}

const makeSut = (): SutTypes => {
  const loadAccountByTokenStub = makeLoadAccountByTokenStub();
  const sut = new AuthMiddleware(loadAccountByTokenStub);

  return {
    loadAccountByTokenStub,
    sut
  };
};

describe('Auth Middleware', () => {
  test('Should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });

  test('Should call LoadAccountByToken with correct accessToken', async () => {
    const { loadAccountByTokenStub, sut } = makeSut();
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load');

    await sut.handle(makeFakeRequest());
    expect(loadSpy).toHaveBeenCalledWith('any_token');
  });

  test('Should return 403 if LoadAccountByToken returns null', async () => {
    const { loadAccountByTokenStub, sut } = makeSut();
    jest.spyOn(loadAccountByTokenStub, 'load').mockResolvedValueOnce(null);

    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });

  test('Should return 200 if LoadAccountByToken returns an account', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok({ accountId: 'valid_id' }));
  });
});
