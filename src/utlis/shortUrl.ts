import { nanoid } from "nanoid";

export function generateShortURL() {
  return `http://localhost:3000/${nanoid(7)}`;
}
