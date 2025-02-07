"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCategories } from "@/lib/actions/category.actions";

import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { Category } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const CategoryFilter = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();

      if (categoryList) {
        setCategories(categoryList as Category[]);
      }
    };

    getCategories();
  }, []);

  const onSelectCategory = (category: string) => {
    let newUrl = "";

    if (category && category !== "All") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "category",
        value: category,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["category"],
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <Select onValueChange={(value: string) => onSelectCategory(value)}>
      <SelectTrigger className="overflow-hidden rounded-full bg-gray-50 px-4 py-2 min-h-[54px] ">
        <SelectValue placeholder="Categoria" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All" className="">
          Todas as Categorias
        </SelectItem>

        {categories
          .filter((category) => category.name && category.id)
          .map((category) => (
            <SelectItem
              value={category.name}
              key={category.id}
              className="select-item p-regular-14"
            >
              {category.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default CategoryFilter;
