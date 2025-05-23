import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DATABASE_MONGO_URL: string;
  // PRODUCT_MICROSERVICES_PORT: number;
  // ORDER_MICROSERVICES_HOST: string;
  // ORDER_MICROSERVICES_PORT: number;
  NATS_SERVERS: Array<string>;
  JWT_SECRET: string;
}

const envSchema = joi
  .object({
    PORT: joi.number().required(),
    DATABASE_MONGO_URL: joi.string().required(),
    // PRODUCT_MICROSERVICES_PORT: joi.number().required(),
    // ORDER_MICROSERVICES_HOST: joi.string().required(),
    // ORDER_MICROSERVICES_PORT: joi.number().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
    JWT_SECRET: joi.string().required(),
  })
  .unknown(true);

const { value, error } = envSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});

if (error) {
  throw new Error('VARIABLES DE ENTORNO INVALIDAS O INCOMPLETAS');
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  databaseMongoUrl: envVars.DATABASE_MONGO_URL,
  // productsMicroservicePort: envVars.PRODUCT_MICROSERVICES_PORT,
  // ordersMicroserviceHost: envVars.ORDER_MICROSERVICES_HOST,
  // ordersMicroservicePort: envVars.ORDER_MICROSERVICES_PORT,
  natsServers: envVars.NATS_SERVERS,
  jwtSecret: envVars.JWT_SECRET,
};
