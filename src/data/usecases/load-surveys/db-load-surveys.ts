import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository';
import { LoadSurveys } from '@/domain/usecases/load-surveys';
import { SurveyModel } from '../add-account/db-add-account-protocols';

export class DbLoadSurveys implements LoadSurveys {
  constructor(private readonly loadSurveysRepository: LoadSurveysRepository) {}

  async load(): Promise<SurveyModel[]> {
    return await this.loadSurveysRepository.loadAll();
  }
}
