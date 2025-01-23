"use server";

import { PrismaClient } from "@prisma/client";
import { handleError } from "../utils";

import { CreateEventParams } from "@/types";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export const createEvent = async ({
  event,
  userId,
  path,
}: CreateEventParams) => {
  try {
    console.log({ categoryId: event.categoryId, organizerId: userId });

    const newEvent = await prisma.event.create({
      data: {
        ...event,
        categoryId: event.categoryId,
        organizerId: userId,
      },
    });
    revalidatePath(path);
    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    console.log(JSON.stringify(error));

    handleError(error);
  }
};
