-- CreateTable
CREATE TABLE "Organization" (
    "id" SERIAL NOT NULL,
    "public_id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserType" (
    "id" SERIAL NOT NULL,
    "public_id" UUID NOT NULL,
    "name" VARCHAR(127) NOT NULL,

    CONSTRAINT "UserType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "public_id" UUID NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" VARCHAR(16) NOT NULL,
    "userTypeId" INTEGER NOT NULL,
    "organizationId" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrayerType" (
    "id" SERIAL NOT NULL,
    "public_id" UUID NOT NULL,
    "name" VARCHAR(127) NOT NULL,

    CONSTRAINT "PrayerType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrayerCall" (
    "id" SERIAL NOT NULL,
    "public_id" UUID NOT NULL,
    "name" VARCHAR(127) NOT NULL,

    CONSTRAINT "PrayerCall_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrayerTime" (
    "id" SERIAL NOT NULL,
    "public_id" UUID NOT NULL,
    "prayerTypeId" INTEGER NOT NULL,
    "prayerCallId" INTEGER NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "time" TIMESTAMP NOT NULL,

    CONSTRAINT "PrayerTime_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userTypeId_fkey" FOREIGN KEY ("userTypeId") REFERENCES "UserType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrayerTime" ADD CONSTRAINT "PrayerTime_prayerTypeId_fkey" FOREIGN KEY ("prayerTypeId") REFERENCES "PrayerType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrayerTime" ADD CONSTRAINT "PrayerTime_prayerCallId_fkey" FOREIGN KEY ("prayerCallId") REFERENCES "PrayerCall"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrayerTime" ADD CONSTRAINT "PrayerTime_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
