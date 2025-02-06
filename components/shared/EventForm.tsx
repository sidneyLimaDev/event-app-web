"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { eventFormSchema } from "@/lib/validator";
import { z } from "zod";
import { eventDefaultValues } from "@/constants";
import Dropdown from "./Dropdown";
import { Textarea } from "../ui/textarea";
import { FileUploader } from "./FileUploader";
import { useState } from "react";
import { Calendar, DollarSign, Link, MapPin } from "lucide-react";
import { DatePicker } from "./DatePicker";
import { Checkbox } from "../ui/checkbox";
import { useRouter } from "next/navigation";
import { createEvent, updateEvent } from "@/lib/actions/event.actions";
import { generateReactHelpers } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { Event } from "@prisma/client";

const { useUploadThing } = generateReactHelpers<OurFileRouter>();
type EventFormProps = {
  userId: string;
  type: "Create" | "Update";
  event?: Event;
  eventId?: string;
};

const EventForm = ({ userId, type, event, eventId }: EventFormProps) => {
  console.log("teste");
  const [files, setFiles] = useState<File[]>([]);
  const initialValues =
    event && type === "Update"
      ? {
          ...event,
          startDateTime: new Date(event.startDateTime),
          endDateTime: new Date(event.endDateTime),
          description: event.description ?? "",
          location: event.location ?? "",
          tickets: event.tickets ?? undefined,
          maxTickets: event.tickets ?? undefined,
          url: event.url ?? undefined,
        }
      : eventDefaultValues;
  const router = useRouter();

  const { startUpload, isUploading } = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    console.log("initalValues", initialValues);

    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedFiles = await startUpload(files);
      if (uploadedFiles && uploadedFiles.length > 0) {
        uploadedImageUrl = uploadedFiles[0].url;
      }
    }

    if (type === "Create") {
      try {
        const newEvent = await createEvent({
          event: { ...values, imageUrl: uploadedImageUrl },
          userId,
          path: "/profile",
        });

        if (newEvent) {
          form.reset();
          router.push(`/events/${newEvent.id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (type === "Update") {
      try {
        if (!eventId) {
          throw new Error("Event ID is required for updating.");
        }

        const updatedEvent = await updateEvent({
          event: {
            ...values,
            imageUrl: uploadedImageUrl,
            id: eventId,
            description: values.description ?? "",
          },
          userId,
          path: `/events/${eventId}`,
        });

        if (updatedEvent) {
          form.reset();
          router.push(`/events/${updatedEvent.id}`);
        }
      } catch (error) {
        console.error("Error updating event:", error);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Titulo do Evento" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Dropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea placeholder="Descrição do Evento" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex items-center gap-2 overflow-hidden w-full">
                    <MapPin />
                    <Input placeholder="Localização do evento" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="startDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex items-center gap-2 overflow-hidden w-full">
                    <Calendar />
                    <p className="ml-3 whitespace-nowrap text-gray-600">
                      Data do inicio:
                    </p>
                    <DatePicker value={field.value} onChange={field.onChange} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex items-center gap-2 overflow-hidden w-full">
                    <Calendar />
                    <p className="ml-3 whitespace-nowrap text-gray-600">
                      Data de Termino:
                    </p>
                    <DatePicker value={field.value} onChange={field.onChange} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormControl>
                  <div className="flex items-center gap-2 overflow-hidden w-full bg-slate-200 p-2">
                    <DollarSign />
                    <input
                      type="number"
                      placeholder="Preço"
                      {...field}
                      className="bg-slate-200 focus:outline-none"
                    />
                    <FormField
                      control={form.control}
                      name="isFree"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex items-center">
                              <label
                                htmlFor="isFree"
                                className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
                              >
                                Gratuito
                              </label>
                              <Checkbox
                                onCheckedChange={field.onChange}
                                checked={field.value}
                                id="isFree"
                                className="mr-2"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex justify-center items-center gap-2 overflow-hidden w-full">
                    <Link />
                    <Input placeholder="URL" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="tickets"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex justify-center items-center gap-2 overflow-hidden w-full">
                    <Input
                      type=""
                      placeholder="Quantos tickets disponiveis?"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxTickets"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex justify-center items-center gap-2 overflow-hidden w-full">
                    <Input
                      type="number"
                      placeholder="Quantos tickets disponiveis?"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          size={"lg"}
          disabled={isUploading || form.formState.isSubmitting}
          className="button col-span-2 w-full"
        >
          {form.formState.isSubmitting ? "Enviando..." : "Enviar"}
        </Button>
      </form>
    </Form>
  );
};

export default EventForm;
