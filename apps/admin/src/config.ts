import { Type } from 'class-transformer';
import { StarterConfig } from '@libs/common';
import { IsNotEmpty, ValidateNested } from 'class-validator';

export class Config {
  @Type(() => StarterConfig)
  @ValidateNested()
  @IsNotEmpty()
  starter!: StarterConfig;
}
