import { toast } from 'sonner';
import { supabase } from '@/clients/supabase';

export type DbFile = {
  id: string;
  file_name: string;
  file_path: string;
  file_size: number;
  checksum: string;
  uploaded_at: string;
};

export const withToast = <T>(
  fn: (args: T) => Promise<string>,
  loadingMessage: string,
) => async (args: T): Promise<string> => {
    const t = toast.loading(loadingMessage);
    try {
      const result = await fn(args);
      toast.success(result, { id: t });
      return result;
    } catch (error) {
      toast.error((error as Error).message, { id: t });
      throw error;
    }
  };

export async function calculateFileChecksum(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const hash = await crypto.subtle.digest('SHA-1', arrayBuffer);
      const checksum = new Uint8Array(hash);
      resolve(Array.from(checksum).map((b) => b.toString(16).padStart(2, '0')).join(''));
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

export async function verifyFileNotUploaded(userId: string, checksum: string) {
  const { data: existingFiles } = await supabase
    .from('user_csv_uploads')
    .select('id, file_name')
    .eq('user_id', userId)
    .eq('checksum', checksum);

  if (existingFiles?.length) {
    throw new Error(`This file has already been uploaded: ${existingFiles[0].file_name}`);
  }
}

export async function getFileData(fileId: string) {
  const { data: dbFile, error: fileError } = await supabase
    .from('user_csv_uploads')
    .select('id, file_name, file_path, file_size, checksum, uploaded_at')
    .eq('id', fileId)
    .single();

  if (fileError || !dbFile?.file_path) {
    throw new Error('Error fetching file data');
  }

  return dbFile as DbFile;
}

export async function downloadFromStorage(filePath: string) {
  const { data, error: downloadError } = await supabase.storage
    .from('csv-uploads')
    .download(filePath);

  if (downloadError || !data) {
    throw new Error('Error downloading file');
  }

  return data;
}

export async function deleteFromStorage(filePath: string) {
  const { error: deleteError } = await supabase.storage
    .from('csv-uploads')
    .remove([filePath]);

  if (deleteError) {
    throw new Error('Error deleting file from storage');
  }
}

export async function deleteFromDatabase(fileId: string) {
  const { error: dbDeleteError } = await supabase
    .from('user_csv_uploads')
    .delete()
    .eq('id', fileId);

  if (dbDeleteError) {
    throw new Error('Error deleting file from database');
  }
}

export async function uploadToStorage(file: File, filePath: string) {
  const { error: storageError } = await supabase.storage
    .from('csv-uploads')
    .upload(filePath, file);

  if (storageError) {
    throw new Error('Error uploading file to storage');
  }
}

export async function uploadToDatabase({
  userId, fileName, filePath, fileSize, fileChecksum,
}: {
  userId: string, fileName: string, filePath: string, fileSize: number, fileChecksum: string;
}) {
  const { error: dbError } = await supabase
    .from('user_csv_uploads')
    .insert([{
      user_id: userId,
      file_name: fileName,
      file_path: filePath,
      file_size: fileSize,
      checksum: fileChecksum,
    }]);

  if (dbError) {
    throw new Error('Error uploading file to database');
  }
}
