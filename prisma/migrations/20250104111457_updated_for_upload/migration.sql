/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Citizen` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Consultant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `VisaType` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "firstName" DROP NOT NULL,
ALTER COLUMN "passportSeries" DROP NOT NULL,
ALTER COLUMN "passportNumber" DROP NOT NULL,
ALTER COLUMN "pinfl" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Citizen_name_key" ON "Citizen"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Consultant_name_key" ON "Consultant"("name");

-- CreateIndex
CREATE UNIQUE INDEX "VisaType_name_key" ON "VisaType"("name");
