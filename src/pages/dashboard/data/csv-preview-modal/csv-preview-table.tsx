'use client';

import * as React from 'react';
import { v4 } from 'uuid';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import CSVPreviewTablePaginationControls from '@/pages/dashboard/data/csv-preview-modal/csv-preview-table-pagination-controls';
import { CSV } from '@/utils/file';

interface CSVPreviewTableProps {
  csv: CSV
}

function CSVPreviewTable({ csv: { headers, rows } }: CSVPreviewTableProps) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);

  const totalPages = Math.max(1, Math.ceil(rows.length / itemsPerPage));

  const paginatedData = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return rows.slice(startIndex, endIndex);
  }, [rows, currentPage, itemsPerPage]);

  return (
    <>
      <div className="border rounded-md overflow-auto max-h-[450px]">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header) => (
                <TableHead key={v4()}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((row) => {
              const rowIdx = v4();
              return (
                <TableRow key={rowIdx}>
                  {Array.isArray(row) && row
                    .map((cell) => (
                      <TableCell key={`${rowIdx}-${v4()}`}>
                        {cell}
                      </TableCell>
                    ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <CSVPreviewTablePaginationControls
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        totalPages={totalPages}
        totalItems={rows.length}
      />
    </>
  );
}

export default CSVPreviewTable;
