import {
  DynamicModule,
  INestApplication,
  Module,
  NestApplicationOptions,
  Type,
} from '@nestjs/common';
import { StarterConfig } from '@libs/common/starter-config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

interface TotalConfig {
  starter?: StarterConfig;
  [k: string | symbol]: any;
}

// 根模块
@Module({})
class RootModule {
  static getDynamicRootModule(
    args: Omit<DynamicModule, 'module'>,
  ): DynamicModule {
    return {
      module: RootModule,
      ...args,
    };
  }
}

/**
 * 启动类
 */
export class Starter {
  // 单例
  private static instance?: Starter;
  static getInstance(
    config: TotalConfig,
    nestApplicationOptions?: NestApplicationOptions,
  ): Starter {
    return (this.instance =
      this.instance ?? new this(config.starter, nestApplicationOptions));
  }

  protected constructor(
    private readonly starterConfig: StarterConfig = new StarterConfig(),
    private readonly nestApplicationOptions?: NestApplicationOptions,
  ) {}

  /**
   * 全局模块
   * @protected
   */
  protected getGlobalModuleImports(): Array<Type | DynamicModule> {
    const imports: Array<Type | DynamicModule> = [];

    //全局数据库模块
    if (this.starterConfig.globalModule?.typeorm != null) {
      imports.push(
        TypeOrmModule.forRoot(this.starterConfig.globalModule.typeorm),
      );
    }
    return imports;
  }

  /**
   * 全局配置
   * @param app
   * @protected
   */
  protected async setupGlobalConfig(app: INestApplication): Promise<void> {
    // 配置swagger 文档
    if (this.starterConfig.enableSwagger) {
      SwaggerModule.setup(
        'doc',
        app,
        SwaggerModule.createDocument(app, new DocumentBuilder().build()),
      );
    }
  }

  /**
   * 启动方法
   * @param Module
   */
  async start(Module: Type | DynamicModule): Promise<void> {
    // 创建根模块，挂载子模块和providers
    // 此处挂载了数据库module
    const rootModule = RootModule.getDynamicRootModule({
      imports: this.getGlobalModuleImports().concat(Module),
      // providers: this.getGlobalModuleProviders(),
    });

    // 创建Nest应用
    const app = await NestFactory.create<NestExpressApplication>(rootModule, {
      bufferLogs: true,
      ...this.nestApplicationOptions,
    });

    // 配置应用
    await this.setupGlobalConfig(app);

    // 启动http服务
    await app.listen(this.starterConfig.port);
  }
}
