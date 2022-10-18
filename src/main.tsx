import React from "react";
import {
  CellBasic,
  CellHeader,
  TableHeader,
  TableRow,
  Table,
  CellHeaderDirection,
  CellComponent,
  Tag,
  Pagination
} from "czifui";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  SortingState,
  useReactTable,
  PaginationState
} from "@tanstack/react-table";
import { makeData, Person } from "./makeData";

import "./index.css";

function App() {
  const DATA_COUNT = 100;
  const PAGE_SIZE = 5;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const data = React.useState(() => makeData(DATA_COUNT))[0];

  const [{ pageIndex, pageSize }, setPagination] = React.useState<
    PaginationState
  >({
    pageIndex: 0,
    pageSize: PAGE_SIZE
  });

  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "firstName",
        id: "firstName",
        cell: (info) => info.getValue(),
        header: "First Name",
        footer: (props) => props.column.id
      },
      {
        accessorFn: (row) => row.lastName,
        id: "lastName",
        cell: (info) => info.getValue(),
        header: "Last Name"
      },
      {
        accessorKey: "age",
        header: "Age",
        footer: (props) => props.column.id
      },
      {
        accessorKey: "visits",
        header: "Visits",
        footer: (props) => props.column.id
      },
      {
        accessorKey: "status",
        id: "status",
        header: "Status",
        footer: (props) => props.column.id
      },
      {
        accessorKey: "progress",
        header: "Profile Progress",
        footer: (props) => props.column.id
      }
    ],
    []
  );

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize
    }),
    [pageIndex, pageSize]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true
  });

  return (
    <div className="app">
      <h1 className="title">Table with Front-End only Pagination</h1>
      <p className="description">
        Using front-end pagination to show table data in multiple pages.
      </p>
      <Table>
        <TableHeader>
          {table.getFlatHeaders().map((header) => (
            <CellHeader
              key={header.id}
              colSpan={header.colSpan}
              direction={
                header.column.getIsSorted()
                  ? (header.column.getIsSorted() as CellHeaderDirection)
                  : null
              }
              active={!!header.column.getIsSorted()}
              onClick={header.column.getToggleSortingHandler()}
              horizontalAlign={header.id === "createdAt" ? "right" : "left"}
            >
              {
                flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                ) as string
              }
            </CellHeader>
          ))}
        </TableHeader>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  switch (cell.column.id) {
                    case "status":
                      const tagIndentMap = {
                        single: "beta",
                        relationship: "error",
                        complicated: "warning"
                      };
                      const tagValue = cell.getValue() as string;
                      return (
                        <CellComponent key={cell.id} verticalAlign="center">
                          <Tag
                            label={tagValue}
                            color={tagIndentMap[tagValue]}
                            sdsStyle="rounded"
                            sdsType="secondary"
                          />
                        </CellComponent>
                      );
                    default:
                      return (
                        <CellBasic
                          key={cell.id}
                          primaryText={
                            flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            ) as string
                          }
                          horizontalAlign={
                            cell.column.id === "progress" ? "center" : "left"
                          }
                          verticalAlign="center"
                          shouldShowTooltipOnHover={false}
                        />
                      );
                  }
                })}
              </TableRow>
            );
          })}
        </tbody>
      </Table>
      <div id="pagination-wrapper">
        <Pagination
          sdsStyle="round"
          pageSize={table.getState().pagination.pageSize}
          onPageChange={(page: number) => {
            table.setPageIndex(page - 1);
          }}
          onNextPage={() => table.nextPage()}
          onPreviousPage={() => table.previousPage()}
          totalCount={DATA_COUNT}
          siblingCount={1}
          currentPage={table.getState().pagination.pageIndex + 1}
          truncateDropdown
        />
      </div>
    </div>
  );
}

export default App;
