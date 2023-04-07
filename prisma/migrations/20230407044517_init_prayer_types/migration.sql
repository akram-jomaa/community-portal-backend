CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
INSERT INTO "PrayerCall" ("publicId", name) VALUES 
(uuid_generate_v4(), 'Athan'),
(uuid_generate_v4(), 'Iqamah');