import { WithId } from 'mongodb';

export interface SurveyModel {
  id: string;
  question: string;
  answers: SurveyAnswerModel[];
  date: Date;
}

export interface SurveyAnswerModel {
  image?: string;
  answer: string;
}
