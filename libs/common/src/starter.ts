import {
  DynamicModule,
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
   * 生成全局模块
   * @protected
   */
  protected getGlobalModuleImports(): Array<Type | DynamicModule> {
    const imports: Array<Type | DynamicModule> = [];
    /**
     * 全局数据库模块
     */
    if (this.starterConfig.globalModule?.typeorm != null) {
      imports.push(
        TypeOrmModule.forRoot(this.starterConfig.globalModule.typeorm),
      );
    }
    return imports;
  }

  /**
   * 启动应用
   * @param Module
   */
  async start(Module: Type | DynamicModule): Promise<void> {
    // 创建根模块，挂载子模块和providers
    const rootModule = RootModule.getDynamicRootModule({
      imports: this.getGlobalModuleImports().concat(Module),
    });

    // 创建Nest应用
    const app = await NestFactory.create<NestExpressApplication>(rootModule, {
      bufferLogs: true,
      ...this.nestApplicationOptions,
    });

    //配置swagger
    const swaggerOptions = new DocumentBuilder()
      .setTitle('启动类测试') //文档标题
      .setDescription('nestjs-api-说明') //文档描述
      .setVersion('1.0') //文档版本
      .build(); //创建

    //创建swagger
    const document = SwaggerModule.createDocument(app, swaggerOptions);
    //启动swagger
    SwaggerModule.setup('doc', app, document);

    // 启动http服务
    await app.listen(3000);
  }
}
