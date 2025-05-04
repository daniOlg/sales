import { v4 as uuidv4 } from 'uuid';
import { DatabaseApi } from '@/api/supabase/database.api';
import { StorageApi } from '@/api/supabase/storage.api';
import { useSession } from '@/features/auth/hooks/use-session';
import {
  calculateFileChecksum,
  deleteFromDatabase,
  getFileData,
  verifyFileNotUploaded,
  withToast,
} from '@/pages/dashboard/data/data-upload/hooks/auxiliar-functions';

export const useFileHandler = () => {
  const { user } = useSession();

  const checkAuth = () => {
    if (!user) {
      throw new Error('User not authenticated');
    }
  };

  const uploadFile = async ({ file } : { file: File }): Promise<string> => {
    if (!file) throw new Error('File is required');

    checkAuth();

    const fileUuid = uuidv4();
    const fileExtension = file.name.split('.').pop();
    const physicalName = `${fileUuid}.${fileExtension}`;
    const bucket = 'csv-uploads';
    const path = `${bucket}/${user!.id}/${physicalName}`;
    const fileSize = file.size;

    const fileChecksum = await calculateFileChecksum(file);
    await verifyFileNotUploaded(user!.id, fileChecksum);

    await StorageApi.uploadFile({ file, bucket, path });

    await DatabaseApi.insertToDatabase({
      table: 'user_csv_uploads',
      data: {
        user_id: user!.id,
        file_name: file.name,
        file_path: path,
        file_size: fileSize,
        file_checksum: fileChecksum,
      },
    });

    return 'File uploaded successfully';
  };

  const deleteFile = async ({ fileId }: { fileId: string }): Promise<string> => {
    checkAuth();

    if (!fileId) throw new Error('File ID is required');

    const fileData = await getFileData(fileId);
    await StorageApi.deleteFile({
      bucket: 'csv-uploads',
      path: fileData.file_path,
    });
    await deleteFromDatabase(fileData.id);

    return 'File deleted successfully';
  };

  const downloadFile = async ({ fileId }: { fileId: string }): Promise<string> => {
    checkAuth();

    if (!fileId) throw new Error('File ID is required');

    const fileData = await getFileData(fileId);
    const file = await StorageApi.downloadFile({
      bucket: 'csv-uploads',
      path: fileData.file_path,
    });

    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileData.file_name || 'download';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    a.remove();
    return `File downloaded successfully: ${fileData.file_name}`;
  };

  return {
    handleFileUpload: withToast<Parameters<typeof uploadFile>[0]>(uploadFile, 'Uploading file...'),
    handleFileDelete: withToast<Parameters<typeof deleteFile>[0]>(deleteFile, 'Deleting file...'),
    handleFileDownload: withToast<Parameters<typeof downloadFile>[0]>(downloadFile, 'Downloading file...'),
  };
};
