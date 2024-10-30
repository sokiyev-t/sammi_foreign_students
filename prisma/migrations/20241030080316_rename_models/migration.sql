/*
  Warnings:

  - You are about to drop the `Citizen` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Consultant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Registration` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Visa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VisaType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Registration" DROP CONSTRAINT "Registration_studentsId_fkey";

-- DropForeignKey
ALTER TABLE "Students" DROP CONSTRAINT "Students_citizenId_fkey";

-- DropForeignKey
ALTER TABLE "Students" DROP CONSTRAINT "Students_consultantId_fkey";

-- DropForeignKey
ALTER TABLE "Visa" DROP CONSTRAINT "Visa_studentsId_fkey";

-- DropForeignKey
ALTER TABLE "Visa" DROP CONSTRAINT "Visa_visaTypeId_fkey";

-- DropTable
DROP TABLE "Citizen";

-- DropTable
DROP TABLE "Consultant";

-- DropTable
DROP TABLE "Registration";

-- DropTable
DROP TABLE "Visa";

-- DropTable
DROP TABLE "VisaType";

-- CreateTable
CREATE TABLE "Citizens" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "Citizens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VisaTypes" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "VisaTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consultants" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(45) NOT NULL,
    "phoneNumber" VARCHAR(45) NOT NULL,

    CONSTRAINT "Consultants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visas" (
    "id" SERIAL NOT NULL,
    "visaSeries" VARCHAR(45) NOT NULL,
    "visaNumber" VARCHAR(45) NOT NULL,
    "visaStart" TIMESTAMP(3) NOT NULL,
    "visaEnd" TIMESTAMP(3) NOT NULL,
    "visaTypeId" INTEGER NOT NULL,
    "studentsId" INTEGER NOT NULL,

    CONSTRAINT "Visas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Registrations" (
    "id" SERIAL NOT NULL,
    "registrationSeries" VARCHAR(45) NOT NULL,
    "registrationNumber" VARCHAR(45) NOT NULL,
    "registrationAddress" VARCHAR(200) NOT NULL,
    "registrationStart" TIMESTAMP(3) NOT NULL,
    "registrationEnd" TIMESTAMP(3) NOT NULL,
    "studentsId" INTEGER NOT NULL,

    CONSTRAINT "Registrations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Visas" ADD CONSTRAINT "Visas_visaTypeId_fkey" FOREIGN KEY ("visaTypeId") REFERENCES "VisaTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visas" ADD CONSTRAINT "Visas_studentsId_fkey" FOREIGN KEY ("studentsId") REFERENCES "Students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registrations" ADD CONSTRAINT "Registrations_studentsId_fkey" FOREIGN KEY ("studentsId") REFERENCES "Students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_citizenId_fkey" FOREIGN KEY ("citizenId") REFERENCES "Citizens"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_consultantId_fkey" FOREIGN KEY ("consultantId") REFERENCES "Consultants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
