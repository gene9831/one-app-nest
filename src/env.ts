import * as dotenv from 'dotenv';

dotenv.config();

process.env.PORT = process.env.PORT || '3000';

process.env.DEBUG = process.env.DEBUG || `${false}`;

process.env.MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/nest';
