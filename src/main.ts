import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import { Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: '*',
    },
  });

  // Utilisation d'Express pour servir des fichiers statiques
  app.use('/public', express.static(join(__dirname, '..', 'public')));

  // Route par défaut pour servir un fichier statique
  app.use((req: Request, res: Response) => {
    res.sendFile(join(__dirname, '..', 'public', 'index.html'));
  });

  // Utilisez le port dynamique fourni par l'environnement, ou 3000 par défaut
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
