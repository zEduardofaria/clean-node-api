import { SurveyModel } from '../models';

export type AddSurveyModel = Omit<SurveyModel, 'id'>;

export interface AddSurvey {
  add: (data: AddSurveyModel) => Promise<void>;
}
