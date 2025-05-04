import { client } from '@/api/supabase/client';

type UploadFileParams = {
  userId: string;
  file: File;
  bucket: string;
  path: string;
};

type DownloadFileParams = {
  path: string;
  bucket: string;
};

export const StorageApi = {
  async uploadFile({
    file, bucket, path,
  }: UploadFileParams) {
    const { error } = await client.storage
      .from(bucket)
      .upload(path, file);

    if (error) {
      throw new Error('Error uploading file to storage');
    }
  },
  async downloadFile({
    path,
    bucket,
  }: DownloadFileParams) {
    const { data, error } = await client.storage
      .from(bucket)
      .download(path);

    if (error) {
      throw new Error('Error downloading file from storage');
    }

    return data;
  },
  async deleteFile({
    path,
    bucket,
  }: DownloadFileParams) {
    const { error } = await client.storage
      .from(bucket)
      .remove([path]);

    if (error) {
      throw new Error('Error deleting file from storage');
    }
  },
};
