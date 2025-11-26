import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as http from 'http';
import * as https from 'https';
import * as fs from 'fs';

async function bootstrap() {

  const httpsOptions = {
    key: fs.readFileSync('/certs/privkey.pem'),
    cert: fs.readFileSync('/certs/fullchain.pem'),
  };
  const app = await NestFactory.create(AppModule,{httpsOptions});
  app.enableCors({
    origin:true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })

  await app.listen(443, '0.0.0.0');

  http.createServer((req, res) => {
    res.writeHead(301, { Location: 'https://' + req.headers.host + req.url });
    res.end();
  }).listen(80, '0.0.0.0');
}
bootstrap();
