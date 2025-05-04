import { toast } from 'sonner';
import { client } from '@/api/supabase/client';

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
  const { data: existingFiles } = await client
    .from('user_csv_uploads')
    .select('id, file_name')
    .eq('user_id', userId)
    .eq('checksum', checksum);

  if (existingFiles?.length) {
    throw new Error(`This file has already been uploaded: ${existingFiles[0].file_name}`);
  }
}

export async function getFileData(fileId: string) {
  const { data: dbFile, error: fileError } = await client
    .from('user_csv_uploads')
    .select('id, file_name, file_path, file_size, checksum, uploaded_at')
    .eq('id', fileId)
    .single();

  if (fileError || !dbFile?.file_path) {
    throw new Error('Error fetching file data');
  }

  return dbFile as DbFile;
}

export async function deleteFromDatabase(fileId: string) {
  const { error: dbDeleteError } = await client
    .from('user_csv_uploads')
    .delete()
    .eq('id', fileId);

  if (dbDeleteError) {
    throw new Error('Error deleting file from database');
  }
}
