// types/document.ts
import { BaseModel } from "./common";

export type DocumentType =
  | "image"
  | "pdf"
  | "other";

export type Document = BaseModel & {
  profileId: string;

  title: string;

  category?: string;

  fileUrl: string;

  fileType: DocumentType;
};