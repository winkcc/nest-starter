import { IsBoolean, IsInt, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Transform } from 'class-transformer';

export class TypeormConfig {
  @IsString()
  url!: string;
  @IsString()
  type = 'mysql' as const;
  @IsBoolean()
  logging = true;
  @IsBoolean()
  synchronize = true;
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

  @IsBoolean()
  enableSwagger = true;

  @IsInt()
  port = 3000;
}
