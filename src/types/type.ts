export type UrlState = {
  allUrls: allUrls[];
  searchRemain: number;
  history: number;
  isLoading: boolean;
  error: string | null;
};
export type allUrls = {
  id: string;
  message: string;
  userID: string;
  original: string;
  short: string;
  qrCode: string;
  clicks: number;
  createdAt: string;
  isLocked: boolean;
};
export type editValues = {
  id: string;
  original: string;
  isLocked: boolean;
};
