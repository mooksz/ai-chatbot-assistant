"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import type { FC } from "react";

type PageSizeSelectProps = {
  options?: number[];
  defaultPageSize: number;
};

export const PageSizeSelect: FC<Readonly<PageSizeSelectProps>> = (props) => {
  const { options = [3, 5, 10, 25], defaultPageSize } = props;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function onValueChange(pageSizeString: string) {
    const pageSize = Number(pageSizeString);

    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set("page_size", pageSize.toString());

    router.push(`${pathname}?${newSearchParams.toString()}`);
  }

  return (
    <Select
      defaultValue={defaultPageSize.toString()}
      onValueChange={onValueChange}
    >
      <SelectTrigger className="w-auto min-w-[8rem]">
        <SelectValue placeholder="Select page size" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option.toString()}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
