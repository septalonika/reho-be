import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";
import { extname } from "path";
import { s3 } from "../../config/s3";
import { env } from "../../config/env";
import type { PresignInput } from "./uploads.schema";

export async function generatePresignedUrl(input: PresignInput) {
  const ext = extname(input.filename) || ".jpg";
  const key = `${input.folder}/${randomUUID()}${ext}`;

  const command = new PutObjectCommand({
    Bucket: env.S3_BUCKET,
    Key: key,
    ContentType: input.contentType,
  });

  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 });
  const publicUrl = `${env.S3_PUBLIC_URL}/${key}`;

  return { uploadUrl, key, publicUrl };
}
