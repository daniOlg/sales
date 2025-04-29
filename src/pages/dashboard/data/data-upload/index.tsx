'use client';

import * as React from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DataPreviewTable } from './components/data-preview-table';
import { FileUploadSection } from './components/file-upload-section';
import { useCSVImport } from './hooks/use-csv-import';

export interface DataUploadProps {
  onImportComplete?: (data: any[]) => void
  buttonText?: string
  dialogTitle?: string
  // dialogDescription?: string
  onUpload?: (file: File) => Promise<void>
}

function DataUpload({
  onImportComplete,
  onUpload,
  buttonText = 'Import New Data',
  dialogTitle = 'Import New Data',
}: DataUploadProps) {
  const [open, setOpen] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);

  const {
    files, setFiles, step, setStep, parsedData, headers, parsing, handlePreview, resetState,
  } = useCSVImport();

  const handleBack = () => {
    setStep('upload');
  };

  const handleConfirm = async () => {
    if (files.length === 0 || parsedData.length === 0) return;

    try {
      setUploading(true);

      if (onUpload && files[0]) {
        await onUpload(files[0]);
      }

      if (onImportComplete) {
        onImportComplete(parsedData);
      }

      // Close dialog and reset state
      setOpen(false);
      resetState();
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        setOpen(newOpen);
        if (!newOpen) resetState();
      }}
    >
      <DialogTrigger asChild>
        <Button>{buttonText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          {/* TODO: translations */}
          <DialogDescription>
            {step === 'upload'
              ? 'Drag and drop your files here to upload. You can only select files from your computer.'
              : 'Preview your data before importing. Make sure everything looks correct.'}
          </DialogDescription>
        </DialogHeader>

        {step === 'upload' ? (
          <FileUploadSection
            files={files}
            setFiles={setFiles}
            parsing={parsing}
            onPreview={handlePreview}
          />
        ) : (
          <DataPreviewTable
            headers={headers}
            data={parsedData}
            onBack={handleBack}
            onConfirm={handleConfirm}
            uploading={uploading}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default DataUpload;
