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
import DataUpload from '@/pages/dashboard/data/data-upload';
import { useFileHandler } from '@/pages/dashboard/data/data-upload/hooks/use-file-handler';
import { useSession } from '@/services/auth/hooks/use-session';

export type UploadedFile = {
  id: string;
  file_name: string;
  file_path: string;
  file_size: number;
  checksum: string;
  uploaded_at: string;
};

function Data() {
  const { user } = useSession();
  const { handleFileUpload, handleFileDelete, handleFileDownload } = useFileHandler();

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <>
      <div className="flex items-center justify-end">
        <DataUpload onUpload={uploadFile} />
      </div>

      {/* TODO: translations */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              File Name
            </TableHead>
            <TableHead>
              File Size
            </TableHead>
            <TableHead>
              Created At
            </TableHead>
            <TableHead>
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell>
                Loading...
              </TableCell>
            </TableRow>
          ) : (
            uploadedFiles.map((file) => (
              <TableRow key={file.id}>
                <TableCell>
                  {file.file_name}
                </TableCell>
                <TableCell>
                  {Math.round(file.file_size / 1024)}
                  {' '}
                  KB
                </TableCell>
                <TableCell>
                  {new Date(file.uploaded_at).toLocaleDateString()}
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
    </>
  );
}

export default Data;
