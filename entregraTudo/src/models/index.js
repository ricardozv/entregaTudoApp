// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const OrderStatu = {
  "NEW": "NEW",
  "COOKING": "COOKING",
  "READY_FOR_PICKUP": "READY_FOR_PICKUP",
  "PICKED_UP": "PICKED_UP",
  "COMPLETED": "COMPLETED"
};

const { Dish, Restaurant, Basket, BasketDish, OrderDish, Order, User } = initSchema(schema);

export {
  Dish,
  Restaurant,
  Basket,
  BasketDish,
  OrderDish,
  Order,
  User,
  OrderStatu
};