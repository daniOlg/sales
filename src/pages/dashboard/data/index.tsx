import { MoreVerticalIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/clients/supabase';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import CSVPreviewModal from '@/pages/dashboard/data/csv-preview-modal';
import DataUpload from '@/pages/dashboard/data/data-upload';
import { downloadFromStorage, getFileData } from '@/pages/dashboard/data/data-upload/hooks/auxiliar-functions';
import { useFileHandler } from '@/pages/dashboard/data/data-upload/hooks/use-file-handler';
import { UploadedFile } from '@/pages/dashboard/data/data-upload/types';
import LoadingSkeleton from '@/pages/dashboard/data/loading-skeleton';
import { useSession } from '@/services/auth/hooks/use-session';
import { formatDate } from '@/utils/date';
import { CSV, parseCsvFile, roundFileSize } from '@/utils/file';

function Data() {
  const { user } = useSession();
  const { handleFileUpload, handleFileDelete, handleFileDownload } = useFileHandler();

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [csv, setCsv] = useState<CSV>();
  const [fileName, setFileName] = useState<string>();
  const [loadingCsv, setLoadingCsv] = useState(false);

  const reloadFiles = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from('user_csv_uploads')
        .select('id, file_name, file_path, file_size, checksum, uploaded_at')
        .eq('user_id', user?.id)
        .order('uploaded_at', { ascending: false });

      if (data) setUploadedFiles(data);
    } catch (error) {
      toast.error('Error fetching files');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reloadFiles();
  }, []);

  const deleteFile = async (fileId: string) => {
    await handleFileDelete({ fileId });
    await reloadFiles();
  };

  const uploadFile = async (file: File) => {
    await handleFileUpload({ file });
    await reloadFiles();
  };

  const downloadFile = async (fileId: string) => {
    await handleFileDownload({ fileId });
  };

  const previewFile = async (fileId: string) => {
    setOpen(true);
    setLoadingCsv(true);
    const fileData = await getFileData(fileId);
    const file = await downloadFromStorage(fileData.file_path);

    if (!file) throw new Error('File not found');

    const csvData = await parseCsvFile(file);
    setFileName(fileData.file_name);
    setCsv(csvData);
    setLoadingCsv(false);
    setOpen(true);
  };

  return (
    <>
      <div className="flex items-center justify-end">
        <DataUpload onUpload={uploadFile} />
      </div>

      {/* TODO: translations */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              ID
            </TableHead>
            <TableHead>
              File Name
            </TableHead>
            <TableHead className="w-[100px]">
              File Size
            </TableHead>
            <TableHead className="w-[200px]">
              Uploaded At
            </TableHead>
            <TableHead className="w-[100px]">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading
            ? <LoadingSkeleton />
            : (
              uploadedFiles.map((file) => (
                <TableRow key={file.id}>
                  <TableCell>
                    {file.id}
                  </TableCell>
                  <TableCell>
                    {file.file_name}
                  </TableCell>
                  <TableCell>
                    {roundFileSize(file.file_size)}
                  </TableCell>
                  <TableCell>
                    {formatDate(file.uploaded_at)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
                          size="icon"
                        >
                          <MoreVerticalIcon />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-32">
                        <DropdownMenuItem
                          onClick={() => previewFile(file.id)}
                        >
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => downloadFile(file.id)}
                        >
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => deleteFile(file.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
        </TableBody>
      </Table>

      {open && (
        <CSVPreviewModal
          csv={csv!}
          open={open}
          setOpen={setOpen}
          fileName={fileName}
          loading={loadingCsv}
        />
      )}
    </>
  );
}

export default Data;
