import { selectConfig } from 'nest-typed-config';
import { Starter } from '@libs/common';
import type { INestApplication } from '@nestjs/common';
import express from 'express';
import { AdminModule } from './admin.module';
import { Config } from './config';
import { ConfigModule } from './config.module';

class NewStarter extends Starter {
  // protected override async setupGlobalConfig(app: INestApplication): Promise<void> {
  //   await super.setupGlobalConfig(app);
  // }
}

void NewStarter.getInstance(selectConfig(ConfigModule, Config)).start(
  AdminModule,
);
