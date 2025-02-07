"use server";

import { Prisma, PrismaClient } from "@prisma/client";
import { handleError } from "../utils";

import {
  CreateEventParams,
  DeleteEventParams,
  GetAllEventsParams,
  GetEventsByUserParams,
  GetRelatedEventsByCategoryParams,
  UpdateEventParams,
} from "@/types";
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

export const updateEvent = async ({
  userId,
  event,
  path,
}: UpdateEventParams) => {
  try {
    const eventToUpdate = await prisma.event.findUnique({
      where: { id: event.id },
      select: { organizerId: true },
    });

    if (!eventToUpdate || eventToUpdate.organizerId !== userId) {
      throw new Error("Unauthorized or event not found");
    }

    const updatedEvent = await prisma.event.update({
      where: { id: event.id },
      data: {
        ...event,
        categoryId: event.categoryId,
      },
    });

    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedEvent));
  } catch (error) {
    console.log(JSON.stringify(error));

    handleError(error);
  }
};

export async function getAllEvents({
  query,
  limit = 6,
  page,
  category,
}: GetAllEventsParams) {
  try {
    const titleCondition = query
      ? {
          title: {
            contains: query,
            mode: Prisma.QueryMode.insensitive,
          },
        }
      : {};

    const categoryCondition = category
      ? await prisma.category.findUnique({
          where: { name: category },
        })
      : null;

    const conditions: Prisma.EventWhereInput = {
      AND: [
        titleCondition,
        categoryCondition ? { categoryId: categoryCondition.id } : {},
      ],
    };

    const skipAmount = (Number(page) - 1) * limit;

    const events = await prisma.event.findMany({
      where: conditions,
      orderBy: {
        createdAt: "desc",
      },
      skip: skipAmount,
      take: limit,
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

    const eventsCount = await prisma.event.count({
      where: conditions,
    });

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

export const deleteEvent = async ({ eventId, path }: DeleteEventParams) => {
  try {
    const deletedEvent = await prisma.event.delete({
      where: { id: eventId },
    });

    if (deletedEvent) revalidatePath(path);

    return JSON.parse(JSON.stringify(deletedEvent));
  } catch (error) {
    console.log(JSON.stringify(error));

    handleError(error);
  }
};

export const getRelatedEventsByCategory = async ({
  categoryId,
  eventId,
  limit = 3,
  page = 1,
}: GetRelatedEventsByCategoryParams) => {
  try {
    const skipAmount = (Number(page) - 1) * limit;

    const events = await prisma.event.findMany({
      where: {
        categoryId: categoryId,
        NOT: {
          id: eventId,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: skipAmount,
      take: limit,
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

    const eventsCount = await prisma.event.count({
      where: {
        categoryId: categoryId,
        NOT: {
          id: eventId,
        },
      },
    });

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    console.log(JSON.stringify(error));
    handleError(error);
  }
};

export async function getEventsByUser({
  userId,
  limit = 6,
  page,
}: GetEventsByUserParams) {
  try {
    const skipAmount = (Number(page) - 1) * limit;

    const events = await prisma.event.findMany({
      where: {
        organizerId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: skipAmount,
      take: limit,
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    const eventsCount = await prisma.event.count({
      where: {
        organizerId: userId,
      },
    });

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    console.log(JSON.stringify(error));
    handleError(error);
  }
}

export const getEventsByCategory = async (category: string) => {
  try {
    const categoryData = await prisma.category.findUnique({
      where: { name: category },
    });

    if (!categoryData) {
      throw new Error("Category not found");
    }

    const events = await prisma.event.findMany({
      where: { categoryId: categoryData.id },
      orderBy: { createdAt: "desc" },
      include: {
        category: { select: { name: true } },
        organizer: { select: { firstName: true, lastName: true } },
      },
    });

    return JSON.parse(JSON.stringify(events));
  } catch (error) {
    console.log(JSON.stringify(error));
    handleError(error);
  }
};
