import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ApplicationsModule } from './applications/applications.module';
import { RequestResponseLogger } from './common/middleware/logger.middleware';

@Module({
  imports: [ApplicationsModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestResponseLogger).forRoutes('*');
  }
}
