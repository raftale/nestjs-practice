import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CatsController, AdminController } from './cats.controller';
import { AppService } from './app.service';
import { CatsService } from './cats.service';

@Module({
  imports: [],
  controllers: [AppController, CatsController, AdminController],
  providers: [AppService, CatsService],
})
export class AppModule {}
