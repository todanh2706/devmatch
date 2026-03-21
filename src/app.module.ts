import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfilesModule } from './profiles/profiles.module';

@Module({
  imports: [ProfilesModule], // Define the other Modules for app to detect
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
