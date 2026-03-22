import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfilesModule } from './profiles/profiles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profiles/profile.entity';

@Module({
  imports: [
    ProfilesModule, // Define the other Modules for app to detect
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test-db',
      entities: [Profile], // notify for TypeORM that we have the entities
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
