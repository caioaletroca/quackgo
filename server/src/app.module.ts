import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import http from './config/http';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [http]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
