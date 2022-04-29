import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const APP_NAME = process.env.APP_NAME;
  const APP_VERSION = process.env.APP_VERSION;

  console.log('Running ' + APP_NAME + ' -v' + APP_VERSION);

  const options = new DocumentBuilder()
    .setTitle(APP_NAME)
    .setDescription(`${APP_NAME} API description`)
    .setVersion(APP_VERSION)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);

  /*
steps for migration:
get auto generated migration script:npx typeorm migration:generate -n dB
build project: npm run build
run migration: npm run typeorm migration:run
npm run start:dev

github:
create new branch: git checkout -b dev_branch
setting upstream repo: git remote add https://github.com/sarathbaby/zamaon-web-app
commit all changes: git add -A && git commit -m "changes"
push to forked branch: git push -u -f origin dev_branch

**Create and handle Pull requests

Syncing local repo with upstream: git stash
*/
}
bootstrap();
