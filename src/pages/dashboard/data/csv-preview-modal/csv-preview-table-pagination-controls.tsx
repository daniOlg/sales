'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';

interface PaginationControlsProps {
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  itemsPerPage: number
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>
  totalPages: number
  totalItems: number
}

function CSVPreviewTablePaginationControls({
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
  totalPages,
  totalItems,
}: PaginationControlsProps) {
  const handlePageChange = (newPage: number) => {
    setCurrentPage(Math.max(1, Math.min(newPage, totalPages)));
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <div>
          {/* TODO: translations */}
          Showing page
          {' '}
          {currentPage}
          {' '}
          of
          {' '}
          {totalPages}
          {' '}
          (
          {totalItems}
          {' '}
          items)
        </div>
        <div className="flex items-center gap-1">
          <Select value={String(itemsPerPage)} onValueChange={handleItemsPerPageChange}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Rows" />
            </SelectTrigger>
            <SelectContent>
              {/* TODO: translations */}
              <SelectItem value="5">5 rows</SelectItem>
              <SelectItem value="10">10 rows</SelectItem>
              <SelectItem value="25">25 rows</SelectItem>
              <SelectItem value="50">50 rows</SelectItem>
              <SelectItem value="100">100 rows</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {/* TODO: translations */}
          Previous
        </Button>
        <Input
          type="number"
          value={Number(currentPage)}
          onChange={(e) => handlePageChange(Number(e.target.value))}
          className="w-20"
          min={1}
          max={totalPages}
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {/* TODO: translations */}
          Next
        </Button>
      </div>
    </div>
  );
}

export default CSVPreviewTablePaginationControls;
