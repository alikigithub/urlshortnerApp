import { nanoid } from "nanoid";

export function generateShortURL() {
  return `https://url-ten-psi.vercel.app/${nanoid(7)}`;
}
