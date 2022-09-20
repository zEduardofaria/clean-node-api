import { SignUpController } from '../../../../../presentation/controllers/login/signup/signup-controller';
import { Controller } from '@/presentation/protocols';
import { makeSignUpValidation } from './signup-validation-factory';
import { makeDbAuthentication } from '../../../usecases/account/authentitcation/db-authentication-factory';
import { makeDbAddAccount } from '../../../usecases/account/add-account/db-add-account-factory';
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory';

export const makeSignUpController = (): Controller => {
  return makeLogControllerDecorator(
    new SignUpController(
      makeDbAddAccount(),
      makeSignUpValidation(),
      makeDbAuthentication()
    )
  );
};