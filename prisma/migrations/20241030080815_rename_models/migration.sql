/*
  Warnings:

  - You are about to drop the `Citizens` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Consultants` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Registrations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Students` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VisaTypes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Visas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Registrations" DROP CONSTRAINT "Registrations_studentsId_fkey";

-- DropForeignKey
ALTER TABLE "Students" DROP CONSTRAINT "Students_citizenId_fkey";

-- DropForeignKey
ALTER TABLE "Students" DROP CONSTRAINT "Students_consultantId_fkey";

-- DropForeignKey
ALTER TABLE "Visas" DROP CONSTRAINT "Visas_studentsId_fkey";

-- DropForeignKey
ALTER TABLE "Visas" DROP CONSTRAINT "Visas_visaTypeId_fkey";

-- DropTable
DROP TABLE "Citizens";

-- DropTable
DROP TABLE "Consultants";

-- DropTable
DROP TABLE "Registrations";

-- DropTable
DROP TABLE "Students";

-- DropTable
DROP TABLE "Users";

-- DropTable
DROP TABLE "VisaTypes";

-- DropTable
DROP TABLE "Visas";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "username" VARCHAR(45) NOT NULL,
    "email" VARCHAR(45) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Citizen" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "Citizen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VisaType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "VisaType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consultant" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(45) NOT NULL,
    "phoneNumber" VARCHAR(45) NOT NULL,

    CONSTRAINT "Consultant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visa" (
    "id" SERIAL NOT NULL,
    "visaSeries" VARCHAR(45) NOT NULL,
    "visaNumber" VARCHAR(45) NOT NULL,
    "visaStart" TIMESTAMP(3) NOT NULL,
    "visaEnd" TIMESTAMP(3) NOT NULL,
    "visaTypeId" INTEGER NOT NULL,
    "studentsId" INTEGER NOT NULL,

    CONSTRAINT "Visa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Registration" (
    "id" SERIAL NOT NULL,
    "registrationSeries" VARCHAR(45) NOT NULL,
    "registrationNumber" VARCHAR(45) NOT NULL,
    "registrationAddress" VARCHAR(200) NOT NULL,
    "registrationStart" TIMESTAMP(3) NOT NULL,
    "registrationEnd" TIMESTAMP(3) NOT NULL,
    "studentsId" INTEGER NOT NULL,

    CONSTRAINT "Registration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "phoneNumber" VARCHAR(45) NOT NULL,
    "firstName" VARCHAR(45) NOT NULL,
    "lastName" VARCHAR(45) NOT NULL,
    "middleName" VARCHAR(45) NOT NULL,
    "citizenId" INTEGER NOT NULL,
    "consultantId" INTEGER NOT NULL,
    "passportSeries" VARCHAR(20) NOT NULL,
    "passportNumber" VARCHAR(20) NOT NULL,
    "passportExpired" TIMESTAMP(3) NOT NULL,
    "pinfl" VARCHAR(20) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_lastName_key" ON "Student"("lastName");

-- CreateIndex
CREATE UNIQUE INDEX "Student_middleName_key" ON "Student"("middleName");

-- CreateIndex
CREATE UNIQUE INDEX "Student_passportSeries_key" ON "Student"("passportSeries");

-- CreateIndex
CREATE UNIQUE INDEX "Student_passportNumber_key" ON "Student"("passportNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Student_pinfl_key" ON "Student"("pinfl");

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
