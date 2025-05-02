import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';
import CSVPreviewTable from '@/pages/dashboard/data/csv-preview-modal/csv-preview-table';
import { CSV } from '@/utils/file';

type CSVPreviewModalProps = {
  csv: CSV,
  open: boolean,
  setOpen: (open: boolean) => void,
  fileName?: string,
  loading?: boolean,
};

function CSVPreviewModal({
  csv, open, setOpen, fileName, loading,
}: CSVPreviewModalProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[90%] sm:max-h-[90%]">
        <DialogHeader>
          <DialogTitle>Preview</DialogTitle>
          <DialogDescription>{fileName ? `File: ${fileName}` : 'Preview CSV file'}</DialogDescription>
        </DialogHeader>
        { loading
          ? <Spinner className="my-40" />
          : <CSVPreviewTable csv={csv} />}
      </DialogContent>
    </Dialog>
  );
}

export default CSVPreviewModal;
