'use client';

import * as Papa from 'papaparse';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

type ImportStep = 'upload' | 'preview';

interface UseCSVImportOptions {
  onParseComplete?: (headers: string[], data: any[]) => void
  onParseError?: (error: Error) => void
}

export function useCSVImport(options?: UseCSVImportOptions) {
  const [files, setFiles] = useState<File[]>([]);
  const [step, setStep] = useState<ImportStep>('upload');
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [parsing, setParsing] = useState(false);

  const resetState = () => {
    setFiles([]);
    setStep('upload');
    setParsedData([]);
    setHeaders([]);
    setParsing(false);
  };

  const handlePreview = useCallback(() => {
    if (!files.length) return;

    setParsing(true);

    Papa.parse(files[0], {
      header: false,
      complete: (results) => {
        if (results.data && Array.isArray(results.data) && results.data.length > 0) {
          const headerRow = results.data[0] as string[];
          setHeaders(headerRow);

          const dataRows = results.data.slice(1) as any[];

          const filteredRows = dataRows.filter((row) => {
            if (!Array.isArray(row)) return false;
            return row.some((cell) => cell !== null && cell !== undefined && cell !== '');
          });

          setParsedData(filteredRows);

          if (options?.onParseComplete) {
            options.onParseComplete(headerRow, filteredRows);
          }

          setStep('preview');
        } else {
          // TODO: translations
          toast.error('Failed to parse CSV file or file is empty');
          if (options?.onParseError) {
            options.onParseError(new Error('Failed to parse CSV file or file is empty'));
          }
        }

        setParsing(false);
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
        toast.error('Error parsing CSV file');
        setParsing(false);

        if (options?.onParseError) {
          options.onParseError(new Error(error.message));
        }
      },
    });
  }, [files, options]);

  return {
    files,
    setFiles,
    step,
    setStep,
    parsedData,
    headers,
    parsing,
    handlePreview,
    resetState,
  };
}
