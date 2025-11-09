import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGaurd } from './auth/jwt-auth-gaurd';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:['http://localhost:5173','http://locolhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })

  app.useGlobalGuards(new JwtAuthGaurd(app.get(Reflector)))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
