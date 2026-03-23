-- Music App DDL Script
-- Tables: ALBUM, TRACK

-- Drop existing tables (TRACK first to respect FK constraint)
DROP TABLE IF EXISTS "tracks" CASCADE;
DROP TABLE IF EXISTS "albums" CASCADE;

-- ALBUM table
CREATE TABLE "albums" (
  "id"          SERIAL        PRIMARY KEY,
  "title"       VARCHAR(100)  NOT NULL,
  "artist"      VARCHAR(100)  NOT NULL,
  "year"        INTEGER       NOT NULL,
  "image"       VARCHAR(300)  DEFAULT NULL,
  "description" VARCHAR(500)  DEFAULT NULL
);

-- TRACK table
CREATE TABLE "tracks" (
  "id"        SERIAL        PRIMARY KEY,
  "album_id"  INTEGER       NOT NULL,
  "title"     VARCHAR(100)  NOT NULL,
  "number"    INTEGER       NOT NULL,
  "video_url" VARCHAR(250)  DEFAULT NULL,
  "lyrics"    VARCHAR(1000) DEFAULT NULL,

  CONSTRAINT "albums_id_FK"
    FOREIGN KEY ("album_id")
    REFERENCES "albums" ("id")
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- Index for FK lookups on tracks
CREATE INDEX IF NOT EXISTS "album_id_FK_idx" ON "tracks" ("album_id");

-- USERS table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- REVIEWS table
CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  track_id INT NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id) ON DELETE SET NULL,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  is_hidden BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reviews_track_id ON reviews(track_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);
