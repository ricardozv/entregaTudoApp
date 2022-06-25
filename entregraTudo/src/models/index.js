// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { UntitledModel, Dish, Restaurant } = initSchema(schema);

export {
  UntitledModel,
  Dish,
  Restaurant
};