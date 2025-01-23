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

export const getEventById = async (eventId: string) => {
  try {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        category: {
          select: {
            name: true,
          },
        },
        organizer: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!event) {
      throw new Error("Event not found");
    }

    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    console.log(JSON.stringify(error));

    handleError(error);
  }
};
