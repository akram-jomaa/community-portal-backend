CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
INSERT INTO "PrayerType" ("publicId", name) VALUES 
(uuid_generate_v4(), 'Fajr'),
(uuid_generate_v4(), 'Dhur'),
(uuid_generate_v4(), 'Asr'),
(uuid_generate_v4(), 'Maghrib'),
(uuid_generate_v4(), 'Ishaa');