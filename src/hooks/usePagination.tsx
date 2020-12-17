import React, { Reducer, useReducer, useState } from "react";
import { Paginator } from "../components";

export function usePagination(items: Array<any>, itemsPerPage? : number) {

  const [pageNumber, setPageNumber] = useState(1);
  const [perPageCount] = useState(itemsPerPage ?? 10);

  const currentPageNumber = pageNumber * perPageCount - perPageCount;
  const allPageCount = items.length / perPageCount;
  const paginatedItems = items.splice(currentPageNumber, perPageCount);




    return {
       PaginatorComponent : () => <Paginator 
       setPage={(val : number) => setPageNumber(val)}
       next={() => setPageNumber(currentPageNumber < allPageCount ? currentPageNumber+1 : currentPageNumber )}
       previous={() => setPageNumber(currentPageNumber > 1 ? currentPageNumber-1 : currentPageNumber )}
       actualPageNum= {pageNumber}
       pageNum= {allPageCount} />,
       items: paginatedItems
       };



};
