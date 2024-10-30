/*
  Warnings:

  - The primary key for the `Citizen` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Consultant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Registration` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Settings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Visa` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `VisaType` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Registration" DROP CONSTRAINT "Registration_studentsId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_citizenId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_consultantId_fkey";

-- DropForeignKey
ALTER TABLE "Visa" DROP CONSTRAINT "Visa_studentsId_fkey";

-- DropForeignKey
ALTER TABLE "Visa" DROP CONSTRAINT "Visa_visaTypeId_fkey";

-- AlterTable
ALTER TABLE "Citizen" DROP CONSTRAINT "Citizen_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Citizen_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Citizen_id_seq";

-- AlterTable
ALTER TABLE "Consultant" DROP CONSTRAINT "Consultant_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Consultant_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Consultant_id_seq";

-- AlterTable
ALTER TABLE "Registration" DROP CONSTRAINT "Registration_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "studentsId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Registration_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Registration_id_seq";

-- AlterTable
ALTER TABLE "Settings" DROP CONSTRAINT "Settings_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Settings_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Student" DROP CONSTRAINT "Student_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "citizenId" SET DATA TYPE TEXT,
ALTER COLUMN "consultantId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Student_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Student_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "Visa" DROP CONSTRAINT "Visa_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "visaTypeId" SET DATA TYPE TEXT,
ALTER COLUMN "studentsId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Visa_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Visa_id_seq";

-- AlterTable
ALTER TABLE "VisaType" DROP CONSTRAINT "VisaType_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "VisaType_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "VisaType_id_seq";

-- AddForeignKey
ALTER TABLE "Visa" ADD CONSTRAINT "Visa_visaTypeId_fkey" FOREIGN KEY ("visaTypeId") REFERENCES "VisaType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visa" ADD CONSTRAINT "Visa_studentsId_fkey" FOREIGN KEY ("studentsId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_studentsId_fkey" FOREIGN KEY ("studentsId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_citizenId_fkey" FOREIGN KEY ("citizenId") REFERENCES "Citizen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_consultantId_fkey" FOREIGN KEY ("consultantId") REFERENCES "Consultant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
