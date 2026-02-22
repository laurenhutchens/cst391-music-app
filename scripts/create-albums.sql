-- Run this in pgAdmin on the Vercel music database:
-- Right-click "music" → Query Tool → paste and Execute

CREATE TABLE IF NOT EXISTS albums (
  id    SERIAL PRIMARY KEY,
  artist TEXT NOT NULL,
  title  TEXT
);

INSERT INTO albums (artist, title) VALUES ('Sample Artist', 'Sample Album');
