import {
  SurveyModel,
  LoadSurveyByIdRepository
} from './db-load-survey-by-id-protocols';

export class DbLoadSurveyById implements LoadSurveyByIdRepository {
  constructor(
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
  ) {}

  async loadById(id: string): Promise<SurveyModel> {
    return await this.loadSurveyByIdRepository.loadById(id);
  }
}
