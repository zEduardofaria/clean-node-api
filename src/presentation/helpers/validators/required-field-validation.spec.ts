import { MissingParamError } from '../../../presentation/errors';
import { RequiredFieldValidation } from './required-field-validation';

describe('RequiredField Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = new RequiredFieldValidation('fakeField');
    const error = sut.validate({ name: 'any_name' });
    expect(error).toEqual(new MissingParamError('fakeField'));
  });
});
