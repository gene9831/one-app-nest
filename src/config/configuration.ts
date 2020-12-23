import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  debug: process.env.DEBUG === `${true}`,
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost/',
  gqlPlayground: process.env.GQL_PLAYGROUND === `${true}`,
  jwtSecret:
    process.env.JWT_SECRET ||
    (() => {
      const secret = crypto.randomBytes(256).toString('hex');

      fs.appendFile(
        path.join(process.env.PWD, '.env'),
        `\n# Auto generated, do not change it.\nJWT_SECRET=${secret}\n`,
        'utf8',
        (err) => {
          if (err) {
            console.error(err);
          }
        },
      );

      return secret;
    })(),
});
