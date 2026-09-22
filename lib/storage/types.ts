export type UploadInput = {
  buffer: Buffer;
  mimetype: string;
  extension: string;
};

export type StoredFile = {
  url: string;
  key: string;
};

export interface StorageAdapter {
  uploadFile(file: UploadInput): Promise<StoredFile>;
  deleteFile(key: string): Promise<void>;
}
