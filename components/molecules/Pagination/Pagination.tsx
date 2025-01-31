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
  className?: string;
  pageKey?: string;
};

/** WOULDDO: Do a summary, handle single buttons etc */
export function Pagination(props: Readonly<PaginationProps>) {
  const { pageSize, totalItems, className, pageKey = "page" } = props;
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get(pageKey)) || 1;
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const totalPages = Math.ceil(totalItems / pageSize);

  /** Helper function to capture current search params and genrate new link */
  const generateLink = (page: number) => {
    const linkSearchParams = new URLSearchParams(searchParams);
    linkSearchParams.set(pageKey, page.toString());
    return `${pathName}?${linkSearchParams.toString()}`;
  };

  const prevLink = currentPage > 1 ? generateLink(prevPage) : null;
  const nextLink = nextPage <= totalPages ? generateLink(nextPage) : null;

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
    <PaginationWrapper className={className}>
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
              href={generateLink(page)}
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
            <PaginationLink href={`${pathName}?${pageKey}=${totalPages}`}>
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
