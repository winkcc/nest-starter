import { resolve } from 'path';
import { TypedConfigModule, fileLoader } from 'nest-typed-config';
import { program } from 'commander';
import { Config } from './config';

export const ConfigModule = TypedConfigModule.forRoot({
  schema: Config,
  load: fileLoader({
    absolutePath: resolve(
      process.cwd(),
      program
        .requiredOption('-c --config <config>', 'config path')
        .parse(process.argv)
        .opts()['config'],
    ),
  }),
});
