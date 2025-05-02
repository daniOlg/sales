import * as Papa from 'papaparse';

export function roundFileSize(bytes: number) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${Math.round(bytes / 1024 ** i)} ${sizes[i]}`;
}

export type CSV = {
  headers: string[];
  rows: string[][];
};

export async function parseCsvFile(file: Blob): Promise<CSV> {
  const text = await file.text();

  const results = await new Promise((resolve) => {
    Papa.parse(text, {
      header: false,
      skipEmptyLines: true,
      complete: (res) => resolve(res),
    });
  });

  const { data } = (results as Papa.ParseResult<string[]>);

  return {
    headers: data[0],
    rows: data.slice(1),
  };
}
