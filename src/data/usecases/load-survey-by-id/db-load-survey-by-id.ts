import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository';
import { SurveyModel } from '../add-account/db-add-account-protocols';

export class DbLoadSurveyById implements LoadSurveyByIdRepository {
  constructor(
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
  ) {}

  async loadById(id: string): Promise<SurveyModel> {
    return await this.loadSurveyByIdRepository.loadById(id);
  }
}
