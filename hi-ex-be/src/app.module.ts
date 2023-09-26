import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressesModule } from './addresses/addresses.module';
import { CryptoModule } from './crypto/crypto.module';
import { ExchangeModule } from './exchange/exchange.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './entities/user.entity'
import { Transaction } from './entities/transaction.entity'
// import { TransactionService } from './transaction/transaction.service';
import { TransactionModule } from './transaction/transaction.module';
import { JwtGuard } from './auth/guards/jwt-auth.guard';
import { JwtUserMiddleware } from './middleware/jwt-user.middleware';
import { jwtConsts } from './auth/constants';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConsts.secret, // Replace with your JWT secret
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    AddressesModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config_service: ConfigService) => {
        return {
          type: 'postgres',
          host: config_service.get(`DATABASE_HOSTNAME`),
          port: 5432,
          username: config_service.get('DATABASE_USER'),
          password: config_service.get('DATABASE_PASSWORD'),
          database: config_service.get('DATABASE_NAME'),
          autoLoadEntities: true,
          synchronize: false,
          entities: [User, Transaction],
          ssl: true,
        };
      },
    }),
    CryptoModule,
    ExchangeModule,
    UserModule,
    AuthModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtGuard,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtUserMiddleware).forRoutes('*'); // Apply the middleware globally
    // You can specify routes to apply the middleware to by replacing '*' with your route path
  }
}
