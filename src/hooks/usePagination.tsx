import React, { useState } from "react";
import { Paginator } from "../components";

export function usePagination(items: Array<any>, itemsPerPage? : number) {

  const [pageNumber, setPageNumber] = useState(1);
  const [perPageCount] = useState(itemsPerPage ?? 10);

  const fromItems = pageNumber * perPageCount - perPageCount;
  const allPageCount = items.length / perPageCount;
  const paginatedItems = items.splice(fromItems, perPageCount);


    return {
       PaginatorComponent : () => <Paginator 
       setPage={(val : number) => setPageNumber(val)}
       next={() => setPageNumber(pageNumber < allPageCount ? pageNumber+1 : pageNumber )}
       previous={() => setPageNumber(pageNumber > 1 ? pageNumber-1 : pageNumber )}
       actualPageNum= {pageNumber}
       pageNum= {allPageCount} />,
       items: paginatedItems
       };



};
