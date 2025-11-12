import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/jwt-auth-gaurd';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:['http://localhost:5173','http://localhost:80','http://localhost','http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })

  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
