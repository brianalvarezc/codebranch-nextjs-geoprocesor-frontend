import 'dotenv/config';
import joi from 'joi';

interface EnvVars {
  PORT: number;
  GEO_PROCESOR_API_URL: string;
  GEO_PROCESOR_API_PATH: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    GEO_PROCESOR_API_URL: joi.string().uri().required(),
    GEO_PROCESOR_API_PATH: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) throw new Error(`Config value error ${error.message}`);

const envVars: EnvVars = value;

export const env = {
  port: envVars.PORT,
  geoProcesorApiUrl: envVars.GEO_PROCESOR_API_URL,
  geoProcesorApiPath: envVars.GEO_PROCESOR_API_PATH,
};
