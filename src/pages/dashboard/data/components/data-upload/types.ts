export interface CSVData {
  headers: string[]
  rows: any[][]
}

export interface FileUploadProgress {
  file: File
  progress: number
}

export interface ImportResult {
  success: boolean
  data?: any[]
  error?: string
}
