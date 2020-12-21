import * as dotenv from 'dotenv';
import * as crypto from 'crypto';
import * as fs from 'fs';

dotenv.config();

process.env.PORT = process.env.PORT || '3000';

process.env.DEBUG = process.env.DEBUG || `${false}`;

process.env.MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/nest';

process.env.GQL_PLAYGROUD = process.env.GQL_PLAYGROUD || `${false}`;

process.env.JWT_SECRET =
  process.env.JWT_SECRET ||
  (() => {
    const secret = crypto.randomBytes(256).toString('hex');
    process.env.JWT_SECRET = secret;

    fs.appendFile(
      '.env',
      `\n# Auto generated, do not change it.\nJWT_SECRET=${secret}`,
      'utf8',
      (err) => {
        if (err) {
          console.error(err);
        }
      },
    );

    return secret;
  })();
