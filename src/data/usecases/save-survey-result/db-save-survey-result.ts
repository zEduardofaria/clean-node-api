import { SaveSurveyResultRepository } from '@/data/protocols/db/survey/save-survey-result-repository';
import {
  SaveSurveyResultModel,
  SaveSurveyResult,
  SurveyResultModel
} from './db-save-survey-result-protocols';

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository
  ) {}

  async save(data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    return await this.saveSurveyResultRepository.save(data);
  }
}
