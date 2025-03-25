export type UrlState = {
  allUrls: allUrls[];
  searchRemain: number;
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
