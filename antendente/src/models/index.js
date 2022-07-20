// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const TransportationModes = {
  "DRIVING": "DRIVING",
  "BICYCLING": "BICYCLING"
};

const OrderStatus = {
  "NEW": "NEW",
  "COOKING": "COOKING",
  "READY_FOR_PICKUP": "READY_FOR_PICKUP",
  "PICKED_UP": "PICKED_UP",
  "COMPLETED": "COMPLETED"
};

const { Courier, BasketDish, Dish, Restaurant, Basket, User, Order, OrderDish } = initSchema(schema);

export {
  Courier,
  BasketDish,
  Dish,
  Restaurant,
  Basket,
  User,
  Order,
  OrderDish,
  TransportationModes,
  OrderStatus
};