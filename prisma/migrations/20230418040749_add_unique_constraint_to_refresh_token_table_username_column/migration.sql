/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `RefreshToken` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_username_key" ON "RefreshToken"("username");
