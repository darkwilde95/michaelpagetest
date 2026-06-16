import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { CorrelationIdMiddleware } from './common/middleware/correlation-id.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(new CorrelationIdMiddleware().use);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Ignora propiedades que no estén en el DTO
      forbidNonWhitelisted: true, // Lanza error si envían propiedades no permitidas
      transform: true, // Transforma los payloads a instancias de los DTOs

      exceptionFactory: (errors) => {
        // Mapeamos los errores para estructurarlos como { field, message } antes de pasarlos al filtro
        const formattedErrors = errors.map((error) => ({
          field: error.property,
          message: Object.values(error.constraints || {}).join(', '),
        }));
        return new BadRequestException(formattedErrors);
      },
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  app.enableCors();
  await app.listen(4000);
}
bootstrap();
