import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const extractErrorMessages = (errors: ValidationError[]): string[] => {
    const messages: string[] = [];
    const traverseErrors = (errors: ValidationError[], parentKey = '') => {
      errors.forEach((error) => {
        const key = parentKey
          ? `${parentKey}.${error.property}`
          : error.property;

        if (error.constraints) {
          messages.push(
            ...Object.values(error.constraints).map((msg) => `${key}: ${msg}`),
          );
        }

        if (error.children && error.children.length > 0) {
          traverseErrors(error.children, key);
        }
      });
    };

    traverseErrors(errors);
    return messages;
  };

  await app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: async (errors: ValidationError[]) => {
        const errorMessages = extractErrorMessages(errors);
        return new BadRequestException(errorMessages.toString());
      },
    }),
  );


  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders:
      'Content-Type, Authorization, X-Requested-With, Accept, Timezone',
    preflightContinue: false,
  });


  app.use((req, res, next) => {
    res.setHeader(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate',
    );
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, X-Requested-With, Accept, Timezone',
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    );

    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });

  app.enableShutdownHooks();

  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
