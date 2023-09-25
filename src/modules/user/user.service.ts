import { PrismaClient } from '@prisma/client';
import { UserModel } from './user.module';
import { UserInsertDTO } from './dtos/user-insert.dto';
import { NotFoundException } from '@exceptions/not-found-exception';

const prisma = new PrismaClient();

export const getUsers = async (): Promise<UserModel[]> => {

  const listaUsuarios = await prisma.user.findMany();

  if (listaUsuarios?.length === 0) {
    throw new NotFoundException('Usuário');
  }

  return prisma.user.findMany();
};

export const createUser = async (body: UserInsertDTO): Promise<UserModel> => {
  console.log('body', body);
  return prisma.user.create({
    data: body,
  });
};
