import { SurveyResultModel } from '@/domain/models';
import { SaveSurveyResultModel } from '@/domain/usecases';

export interface SaveSurveyResultRepository {
  save: (surveyData: SaveSurveyResultModel) => Promise<SurveyResultModel>;
}
