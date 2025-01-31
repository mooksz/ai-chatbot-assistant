"use client";

import {
  Pagination as PaginationWrapper,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";

type PaginationProps = {
  pageSize: number;
  totalItems: number;
};

export function Pagination(props: Readonly<PaginationProps>) {
  const { pageSize, totalItems } = props;
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const totalPages = Math.ceil(totalItems / pageSize);

  const prevLink = currentPage > 1 ? `${pathName}?page=${prevPage}` : null;
  const nextLink =
    nextPage < totalPages ? `${pathName}?page=${nextPage}` : null;

  /**
   * Pushes pages into an array; they must be within the range of totalPages.
   * This is to display all array items as buttons later.
   */
  /** Amount of page Buttons surrounding pageNumber button.*/
  const siblingPageAmount = 1;
  const startArray = currentPage - siblingPageAmount;
  const endArray = currentPage + siblingPageAmount;
  const pagesArray: number[] = [];
  for (let i = startArray; i <= endArray; i++) {
    if (i > 0 && i <= totalPages) {
      pagesArray.push(i);
    }
  }

  return (
    <PaginationWrapper>
      <PaginationContent>
        {prevLink && (
          <PaginationItem>
            <PaginationPrevious href={prevLink} />
          </PaginationItem>
        )}
        {currentPage - siblingPageAmount > 1 && (
          <PaginationItem>
            <PaginationLink href={`${pathName}`}>1</PaginationLink>
          </PaginationItem>
        )}
        {currentPage - (siblingPageAmount + 1) > 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {pagesArray.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={`${pathName}?page=${page}`}
              isActive={currentPage === page}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {currentPage + (siblingPageAmount + 1) < totalPages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {currentPage + siblingPageAmount < totalPages && (
          <PaginationItem>
            <PaginationLink href={`${pathName}?page=${totalPages}`}>
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}
        {nextLink && (
          <PaginationItem>
            <PaginationNext href={nextLink} />
          </PaginationItem>
        )}
      </PaginationContent>
    </PaginationWrapper>
  );
}
