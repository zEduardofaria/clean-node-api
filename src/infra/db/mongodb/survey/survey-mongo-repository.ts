import { AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository';
import { SurveyModel } from '@/domain/models';
import { AddSurveyModel } from '@/domain/usecases';
import { WithId } from 'mongodb';
import { MongoHelper } from '../helpers/mongo-helper';

export class SurveyMongoRepository implements AddSurveyRepository {
  async add(surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys');

    await surveyCollection.insertOne(surveyData);
  }

  async loadAll(): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    const surveys: any = await surveyCollection.find().toArray();
    return surveys;
  }
}
