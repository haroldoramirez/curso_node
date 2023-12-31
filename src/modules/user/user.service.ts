import { PrismaClient } from '@prisma/client';
import { UserModel } from './user.module';
import { UserInsertDTO } from './dtos/user-insert.dto';
import { NotFoundException } from '@exceptions/not-found-exception';
import { BadRequestException } from '@exceptions/bad-request-exception';
import { createPasswordHashed } from '@utils/password';
import { UserEditPasswordDTO } from './dtos/user-edit-password.dto';

const prisma = new PrismaClient();

export const getUsers = async (): Promise<UserModel[]> => {
  const listaUsuarios = await prisma.user.findMany();

  if (listaUsuarios?.length === 0) {
    throw new NotFoundException('Usuário');
  }

  return prisma.user.findMany();
};

export const getUserByEmail = async (email: string): Promise<UserModel> => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    throw new NotFoundException('Usuário');
  }

  return user;
};

export const getUserByCpf = async (cpf: string): Promise<UserModel> => {
  const user = await prisma.user.findFirst({
    where: {
      cpf,
    },
  });

  if (!user) {
    throw new NotFoundException('User');
  }

  return user;
};

export const createUser = async (body: UserInsertDTO): Promise<UserModel> => {
  const emailUsuario = await getUserByEmail(body.email).catch(() => undefined);

  if (emailUsuario) {
    throw new BadRequestException('Email encontrado no banco de dados');
  }

  const emailCPF = await getUserByCpf(body.cpf).catch(() => undefined);

  if (emailCPF) {
    throw new BadRequestException('CPF encontrado no banco de dados');
  }

  const user: UserInsertDTO = {
    ...body,
    password: await createPasswordHashed(body.password),
  };

  return prisma.user.create({
    data: user,
  });
};

export const getUserById = async (userId: number): Promise<UserModel> => {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new NotFoundException('User');
  } else {
    return user;
  }
};

export const editPassword = async (
  userId: number,
  userEditPasswordDTO: UserEditPasswordDTO,
): Promise<UserModel> => {
  const user = await getUserById(userId);

  const newUser = {
    ...user,
    password: await createPasswordHashed(userEditPasswordDTO.password),
  };

  return prisma.user.update({
    where: { id: userId },
    data: newUser,
  });
};
