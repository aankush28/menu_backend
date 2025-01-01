export interface IMenuItem {
    id: string;
    name: string;
    depth: number;
    parentId?: string;
    createdAt: Date;
    updatedAt: Date;
    children?: IMenuItem[];
  }
  