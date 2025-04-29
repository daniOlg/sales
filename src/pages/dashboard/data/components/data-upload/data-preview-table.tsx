'use client';

import { ArrowLeft } from 'lucide-react';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { PaginationControls } from './pagination-controls';

interface DataPreviewTableProps {
  headers: string[]
  data: any[]
  onBack: () => void
  onConfirm: () => void
  uploading?: boolean
}

export function DataPreviewTable({
  headers, data, onBack, onConfirm, uploading,
}: DataPreviewTableProps) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(5);

  const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage));

  const paginatedData = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPage]);

  return (
    <>
      <div className="border rounded-md overflow-auto max-h-[400px]">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header, index) => (
                <TableHead key={index}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {Array.isArray(row) && row.map((cell, cellIndex) => <TableCell key={cellIndex}>{cell}</TableCell>)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <PaginationControls
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        totalPages={totalPages}
        totalItems={data.length}
      />

      <div className="flex justify-between mt-4">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-1">
          <ArrowLeft className="size-4" />
          Back
        </Button>
        <Button onClick={onConfirm} disabled={uploading}>
          {uploading ? 'Uploading...' : 'Import Data'}
        </Button>
      </div>
    </>
  );
}
