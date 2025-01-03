import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MenuItem } from '@prisma/client';

@Injectable()
export class MenuItemService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a menu item
  async createMenuItem(name: string, depth: number, parentId: string | null): Promise<MenuItem> {
    return this.prisma.menuItem.create({
      data: { name, depth, parentId },
    });
  }

  // Get all menu items in a tree structure
  async getMenuTree(): Promise<MenuItem[]> {
    const include = await this.buildDynamicInclude();

    return this.prisma.menuItem.findMany({
      where: { parentId: null }, // Fetch root items
      include,
    });
  }

  private async buildDynamicInclude(): Promise<object> {
    return this.buildInclude(this.prisma, null);
  }

  private async buildInclude(prisma: PrismaService, parentId: string | null): Promise<object> {
    // Check if there are any children for the given parentId
    const hasChildren = await prisma.menuItem.findFirst({
      where: { parentId },
    });

    // If no children, return an empty object
    if (!hasChildren) {
      return {};
    }

    // Recursively include children and their respective parent name
    return {
      children: {
        include: {
          children: {
            include: {
              children: {
                include: {
                  children: {
                    include: {
                      children: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    };
  }
  
 
  async getMenuItems() {
    return this.prisma.menuItem.findMany();
  }


  // Get a single menu item
  async getMenuItem(id: string): Promise<MenuItem | null> {
    return this.prisma.menuItem.findUnique({
      where: { id },
      include: { children: true },
    });
  }

  // Update a menu item
  async updateMenuItem(id: string, data: Partial<MenuItem>): Promise<MenuItem> {
    return this.prisma.menuItem.update({
      where: { id },
      data,
    });
  }

  // Delete a menu item and its children
  async deleteMenuItem(id: string): Promise<MenuItem> {
    return this.prisma.menuItem.delete({
      where: { id },
    });
  }
}
