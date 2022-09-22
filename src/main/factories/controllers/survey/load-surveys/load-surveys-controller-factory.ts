import { makeDbLoadSurveys } from '../../../../../main/factories/usecases/survey/load-surveys/db-load-surveys-factory';
import { LoadSurveysController } from '../../../../../presentation/controllers/survey/load-surveys/load-surveys-controller';
import { Controller } from '../../../../../presentation/protocols';
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory';

export const makeLoadSurveysController = (): Controller => {
  return makeLogControllerDecorator(
    new LoadSurveysController(makeDbLoadSurveys())
  );
};
