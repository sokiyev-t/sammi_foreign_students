/*
  Warnings:

  - Changed the type of `visaTime` on the `Settings` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `registrationTime` on the `Settings` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Settings" DROP COLUMN "visaTime",
ADD COLUMN     "visaTime" SMALLINT NOT NULL,
DROP COLUMN "registrationTime",
ADD COLUMN     "registrationTime" SMALLINT NOT NULL;
