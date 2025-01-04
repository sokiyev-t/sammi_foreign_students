/*
  Warnings:

  - You are about to alter the column `username` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(46)` to `VarChar(45)`.

*/
-- AlterTable
ALTER TABLE "Consultant" ALTER COLUMN "name" SET DATA TYPE VARCHAR(65),
ALTER COLUMN "phoneNumber" SET DATA TYPE VARCHAR(65);

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "phoneNumber" SET DATA TYPE VARCHAR(90),
ALTER COLUMN "firstName" SET DATA TYPE VARCHAR(90),
ALTER COLUMN "lastName" SET DATA TYPE VARCHAR(90),
ALTER COLUMN "middleName" SET DATA TYPE VARCHAR(90),
ALTER COLUMN "passportSeries" SET DATA TYPE VARCHAR(40),
ALTER COLUMN "passportNumber" SET DATA TYPE VARCHAR(40),
ALTER COLUMN "pinfl" SET DATA TYPE VARCHAR(40);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "username" SET DATA TYPE VARCHAR(45);

-- AlterTable
ALTER TABLE "Visa" ALTER COLUMN "visaSeries" SET DATA TYPE VARCHAR(65),
ALTER COLUMN "visaNumber" SET DATA TYPE VARCHAR(65);
