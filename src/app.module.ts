import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuItemService } from './menu-item/menu-item.service';
import { MenuItemController } from './menu-item/menu-item.controller';
import { MenuItemModule } from './menu-item/menu-item.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [MenuItemModule, PrismaModule],
  controllers: [AppController, MenuItemController],
  providers: [AppService, MenuItemService, PrismaService],
})
export class AppModule {}
