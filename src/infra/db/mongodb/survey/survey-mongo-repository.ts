import { AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository';
import { LoadSurveyByIdRepository } from '@/data/usecases/load-survey-by-id/db-load-survey-by-id-protocols';
import { LoadSurveysRepository } from '@/data/usecases/load-surveys/db-load-surveys-protocols';
import { SurveyModel } from '@/domain/models';
import { AddSurveyModel } from '@/domain/usecases';
import { ObjectId } from 'mongodb';
import { MongoHelper } from '../helpers/mongo-helper';

export class SurveyMongoRepository
  implements
    AddSurveyRepository,
    LoadSurveysRepository,
    LoadSurveyByIdRepository
{
  async add(surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys');

    await surveyCollection.insertOne(surveyData);
  }

  async loadAll(): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    const surveys: any = await surveyCollection.find().toArray();
    return surveys;
  }

  async loadById(id: string): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    const survey: any = await surveyCollection.findOne({
      _id: new ObjectId(id)
    });
    return survey;
  }
}
