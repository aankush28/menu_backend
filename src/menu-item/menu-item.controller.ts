import { Controller, Post, Get, Param, Body, Delete, Put } from '@nestjs/common';
import { MenuItemService } from './menu-item.service';
import { MenuItem } from '@prisma/client';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';

@Controller('menu-items')
export class MenuItemController {
  constructor(private readonly menuItemService: MenuItemService) {}

  @Post()
  async createMenuItem(@Body() body: CreateMenuItemDto): Promise<MenuItem> {
    return this.menuItemService.createMenuItem(body.name, body.depth, body.parentId || null);
  }

  @Get('tree')
  async getMenuTree(): Promise<MenuItem[]> {
    return this.menuItemService.getMenuTree();
  }

  @Get()
  async getMenuItems(): Promise<MenuItem[]> {
    return this.menuItemService.getMenuItems();
  }

  @Get(':id')
  async getMenuItem(@Param('id') id: string): Promise<MenuItem | null> {
    return this.menuItemService.getMenuItem(id);
  }

  @Put(':id')
  async updateMenuItem(@Param('id') id: string, @Body() body:UpdateMenuItemDto): Promise<MenuItem> {
    return this.menuItemService.updateMenuItem(id, body);
  }

  @Delete(':id')
  async deleteMenuItem(@Param('id') id: string): Promise<MenuItem> {
    return this.menuItemService.deleteMenuItem(id);
  }
}
