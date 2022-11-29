import { IsBoolean, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class TypeormConfig {
  @IsString()
  url!: string;
  @IsString()
  type = 'mysql' as const;
  @IsBoolean()
  logging = false;
  @IsBoolean()
  synchronize = false;
}
export class GlobalModuleConfig {
  @Type(() => TypeormConfig)
  @ValidateNested()
  typeorm?: TypeormConfig;
}

export class StarterConfig {
  @Type(() => GlobalModuleConfig)
  @ValidateNested()
  globalModule?: GlobalModuleConfig;
}
