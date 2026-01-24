import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  const isProd = process.env.NODE_ENV === 'production';
  let app;

  if (isProd) {
    // Render handles SSL/HTTPS termination at the load balancer.
    // The application should run as a standard HTTP server.
    app = await NestFactory.create(AppModule);
  } else {
    // Local development logic
    try {
      // Check if local certificates exist for dev; if not, fallback to HTTP
      if (fs.existsSync('/certs/privkey.pem') && fs.existsSync('/certs/fullchain.pem')) {
        const httpsOptions = {
          key: fs.readFileSync('/certs/privkey.pem'),
          cert: fs.readFileSync('/certs/fullchain.pem'),
        };
        app = await NestFactory.create(AppModule, { httpsOptions });
      } else {
        app = await NestFactory.create(AppModule);
      }
    } catch (e) {
      app = await NestFactory.create(AppModule);
    }
  }

  app.enableCors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Render provides the PORT environment variable. 
  // Default to 3000 if not provided.
  const port = process.env.PORT || 3000;
  
  // Bind to 0.0.0.0 to allow external connections within the Render network
  await app.listen(port, '0.0.0.0');
  
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
