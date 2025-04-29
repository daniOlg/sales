import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/clients/supabase';
import { useSession } from '@/services/auth/hooks/use-session';

export const useFileHandler = () => {
  const { user } = useSession();

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    try {
      if (!user) {
        toast.error('User not authenticated');
        return;
      }

      const fileUuid = uuidv4();
      const fileExtension = file.name.split('.').pop();
      const physicalName = `${fileUuid}.${fileExtension}`;
      const filePath = `csv-uploads/${user.id}/${physicalName}`;
      const fileSize = file.size;

      const fileChecksum = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async () => {
          const arrayBuffer = reader.result as ArrayBuffer;
          const hash = await crypto.subtle.digest('SHA-1', arrayBuffer);
          const checksum = new Uint8Array(hash);
          const checksumString = Array.from(checksum)
            .map((byte) => byte.toString(16).padStart(2, '0'))
            .join('');

          resolve(checksumString);
        };
        reader.onerror = (error) => reject(error);
        reader.readAsArrayBuffer(file);
      });

      const { data: existingFiles } = await supabase
        .from('user_csv_uploads')
        .select('id, file_name')
        .eq('user_id', user.id)
        .eq('checksum', fileChecksum);

      if (existingFiles && existingFiles.length > 0) {
        // TODO: translations
        toast.error(`This file has already been uploaded: ${existingFiles[0].file_name}`);
        return;
      }

      const { error: storageError } = await supabase.storage
        .from('csv-uploads')
        .upload(filePath, file);

      if (storageError) {
        toast.error('Error uploading file to storage');
        return;
      }

      const { data: dbData, error: dbError } = await supabase
        .from('user_csv_uploads')
        .insert([{
          user_id: user.id,
          file_name: file.name,
          file_path: filePath,
          file_size: fileSize,
          checksum: fileChecksum,
        }]);

      if (dbData) console.log('dbData', dbData);

      if (dbError) {
        toast.error('Error uploading file to database');
        return;
      }

      toast.success('File uploaded successfully!');
    } catch (error) {
      toast.error('An error occurred while uploading the file');
    }
  };

  const handleFileDelete = async (fileId: string) => {
    if (!fileId) return;

    try {
      if (!user) {
        toast.error('User not authenticated');
        return;
      }

      const { data: fileData, error: fileError } = await supabase
        .from('user_csv_uploads')
        .select('file_path')
        .eq('id', fileId)
        .single();

      if (fileError || !fileData) {
        toast.error('Error fetching file data');
        return;
      }

      const { error: deleteError } = await supabase.storage
        .from('csv-uploads')
        .remove([fileData.file_path as string]);

      if (deleteError) {
        toast.error('Error deleting file from storage');
        return;
      }

      const { error: dbDeleteError } = await supabase
        .from('user_csv_uploads')
        .delete()
        .eq('id', fileId);

      if (dbDeleteError) {
        toast.error('Error deleting file from database');
        return;
      }

      toast.success('File deleted successfully!');
    } catch (error) {
      toast.error('An error occurred while deleting the file');
    }
  };

  return {
    handleFileUpload,
    handleFileDelete,
  };
};
