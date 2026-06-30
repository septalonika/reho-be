import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  integer,
  date,
  pgEnum,
  index,
} from "drizzle-orm/pg-core";
import { profiles } from "./auth";

export const contentStatusEnum = pgEnum("content_status", ["draft", "published"]);

export const devotionals = pgTable(
  "devotionals",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    content: text("content").notNull(),
    bibleVerse: text("bible_verse"),
    excerpt: text("excerpt"),
    coverImageUrl: text("cover_image_url"),
    authorId: uuid("author_id").references(() => profiles.id, { onDelete: "set null" }),
    status: contentStatusEnum("status").notNull().default("draft"),
    devotionalDate: date("devotional_date"),
    publishedAt: timestamp("published_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    index("devotionals_author_id_idx").on(t.authorId),
    index("devotionals_status_idx").on(t.status),
    index("devotionals_devotional_date_idx").on(t.devotionalDate),
  ]
);

export const banners = pgTable("banners", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  imageUrl: text("image_url").notNull(),
  linkUrl: text("link_url"),
  active: boolean("active").notNull().default(true),
  startDate: date("start_date"),
  endDate: date("end_date"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const bulletins = pgTable(
  "bulletins",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    content: text("content").notNull(),
    periodDate: date("period_date").notNull(),
    pdfUrl: text("pdf_url"),
    status: contentStatusEnum("status").notNull().default("draft"),
    publishedAt: timestamp("published_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    index("bulletins_status_idx").on(t.status),
    index("bulletins_period_date_idx").on(t.periodDate),
  ]
);

export const birthdays = pgTable("birthdays", {
  id: uuid("id").primaryKey().defaultRandom(),
  memberName: text("member_name").notNull(),
  birthDate: date("birth_date").notNull(),
  photoUrl: text("photo_url"),
  note: text("note"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const galleryAlbums = pgTable("gallery_albums", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  coverUrl: text("cover_url"),
  eventDate: date("event_date"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const galleryItemTypeEnum = pgEnum("gallery_item_type", ["youtube", "image"]);

export const galleryItems = pgTable(
  "gallery_items",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    albumId: uuid("album_id").references(() => galleryAlbums.id, { onDelete: "cascade" }),
    type: galleryItemTypeEnum("type").notNull(),
    title: text("title"),
    youtubeVideoId: text("youtube_video_id"),
    imageUrl: text("image_url"),
    thumbnailUrl: text("thumbnail_url"),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [
    index("gallery_items_album_id_idx").on(t.albumId),
  ]
);
