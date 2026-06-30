import { randomBytes } from "crypto";

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function uniqueSlug(base: string): string {
  const suffix = randomBytes(3).toString("hex");
  return `${slugify(base)}-${suffix}`;
}
