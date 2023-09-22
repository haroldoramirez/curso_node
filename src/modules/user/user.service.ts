import { PrismaClient } from '@prisma/client';
import { UserModel } from './user.module';
import { UserInsertDTO } from './dtos/user-insert.dto';

const prisma = new PrismaClient();

export const getUsers = async (): Promise<UserModel[]> => {
  return prisma.user.findMany();
};

export const createUser = async (body: UserInsertDTO): Promise<UserModel> => {
  console.log('body', body);
  return prisma.user.create({
    data: body,
  });
};
