/* eslint-disable @typescript-eslint/no-explicit-any */
// user.action.ts
import { PrismaClient } from "@prisma/client";
import { CreateUserParams, UpdateUserParams } from "@/types/index";

const prisma = new PrismaClient();

// ====== CREATE USER
export const createUser = async (params: CreateUserParams) => {
  const { clerkId, firstName, lastName, username, email, photo } = params;

  try {
    const newUser = await prisma.user.create({
      data: {
        clerkId,
        email,
        username,
        firstName,
        lastName,
        photo,
      },
    });

    return newUser;
  } catch (error) {
    throw new Error(`Error creating user: ${(error as any).message}`);
  }
};

// ====== GET USER BY ID
export const getUserById = async (clerkId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    throw new Error(`Error fetching user: ${(error as any).message}`);
  }
};

// ====== UPDATE USER
export const updateUser = async (clerkId: string, params: UpdateUserParams) => {
  const { firstName, lastName, username, photo } = params;

  try {
    const updatedUser = await prisma.user.update({
      where: { clerkId },
      data: {
        firstName,
        lastName,
        username,
        photo,
      },
    });

    return updatedUser;
  } catch (error) {
    throw new Error(`Error updating user: ${(error as any).message}`);
  }
};

// ====== DELETE USER
export const deleteUser = async (clerkId: string) => {
  try {
    const existingUser = await prisma.user.findUnique({ where: { clerkId } });
    if (!existingUser) {
      console.warn(`User not found for deletion`);
      return null;
    }
    const deletedUser = await prisma.user.delete({
      where: { clerkId },
    });

    return deletedUser;
  } catch (error) {
    throw new Error(`Error deleting user: ${(error as any).message}`);
  }
};
