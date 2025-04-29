'use client';

import { Upload, X } from 'lucide-react';
import * as React from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from '@/components/ui/file-upload';

interface FileUploadSectionProps {
  files: File[]
  setFiles: React.Dispatch<React.SetStateAction<File[]>>
  parsing: boolean
  onPreview: () => void
}

export function FileUploadSection({
  files, setFiles, parsing, onPreview,
}: FileUploadSectionProps) {
  const onFileReject = React.useCallback(
    (file: File, message: string) => {
      const MAX_FILES = 1;
      const MAX_SIZE = 5 * 1024 * 1024; // 5MB

      if (files.length >= MAX_FILES) {
        toast.error(`You can only upload ${MAX_FILES} file(s)`);
      } else if (file.size > MAX_SIZE) {
        toast.error(`File size exceeds ${MAX_SIZE / 1024 / 1024}MB`);
      } else if (!file.name.endsWith('.csv')) {
        toast.error('Only .csv files are allowed');
      } else {
        toast.error(message, {
          description: `"${file.name}" has been rejected, please check the file size and type.`,
        });
      }
    },
    [files.length],
  );

  return (
    <>
      <FileUpload
        accept=".csv"
        maxFiles={1}
        maxSize={5 * 1024 * 1024}
        className="w-full"
        onAccept={(files) => setFiles(files)}
        onFileReject={onFileReject}
      >
        <FileUploadDropzone>
          <div className="flex flex-col items-center gap-1 text-center">
            <div className="flex items-center justify-center rounded-full border p-2.5">
              <Upload className="size-6 text-muted-foreground" />
            </div>
            <p className="font-medium text-sm">Drag & drop your files here</p>
            <p className="text-muted-foreground text-xs">Or click to browse (max 1 file, up to 5MB, only .csv)</p>
          </div>
          <FileUploadTrigger asChild>
            <Button variant="outline" size="sm" className="mt-2 w-fit">
              Browse files
            </Button>
          </FileUploadTrigger>
        </FileUploadDropzone>
        <FileUploadList>
          {files.map((file, index) => (
            <FileUploadItem key={index} value={file}>
              <div className="flex w-full items-center gap-2">
                <FileUploadItemPreview />
                <FileUploadItemMetadata />
                <FileUploadItemDelete asChild>
                  <Button variant="ghost" size="icon" className="size-7">
                    <X />
                  </Button>
                </FileUploadItemDelete>
              </div>
            </FileUploadItem>
          ))}
        </FileUploadList>
      </FileUpload>
      <div className="flex justify-end">
        <Button disabled={!files.length || parsing} onClick={onPreview}>
          {parsing ? 'Parsing...' : 'Preview Data'}
        </Button>
      </div>
    </>
  );
}
