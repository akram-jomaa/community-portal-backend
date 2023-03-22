/*
  Warnings:

  - A unique constraint covering the columns `[publicId]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[publicId]` on the table `PrayerCall` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[publicId]` on the table `PrayerTime` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[publicId]` on the table `PrayerType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[publicId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[publicId]` on the table `UserType` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Organization_publicId_key" ON "Organization"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "PrayerCall_publicId_key" ON "PrayerCall"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "PrayerTime_publicId_key" ON "PrayerTime"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "PrayerType_publicId_key" ON "PrayerType"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "User_publicId_key" ON "User"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "UserType_publicId_key" ON "UserType"("publicId");
