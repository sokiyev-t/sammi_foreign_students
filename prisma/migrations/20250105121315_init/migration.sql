-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'EDITOR', 'VIEWER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "username" VARCHAR(45) NOT NULL,
    "email" VARCHAR(45) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'VIEWER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Citizen" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "Citizen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VisaType" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "VisaType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consultant" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(65) NOT NULL,
    "phoneNumber" VARCHAR(65),

    CONSTRAINT "Consultant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visa" (
    "id" TEXT NOT NULL,
    "visaSeries" VARCHAR(65),
    "visaNumber" VARCHAR(65),
    "visaStart" TIMESTAMP(3),
    "visaEnd" TIMESTAMP(3),
    "visaTypeId" TEXT NOT NULL,
    "studentsId" TEXT NOT NULL,

    CONSTRAINT "Visa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Registration" (
    "id" TEXT NOT NULL,
    "registrationSeries" VARCHAR(45),
    "registrationNumber" VARCHAR(45),
    "registrationAddress" VARCHAR(200),
    "registrationStart" TIMESTAMP(3),
    "registrationEnd" TIMESTAMP(3),
    "studentsId" TEXT NOT NULL,

    CONSTRAINT "Registration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "phoneNumber" VARCHAR(90),
    "firstName" VARCHAR(90),
    "lastName" VARCHAR(90),
    "middleName" VARCHAR(90),
    "passportSeries" VARCHAR(40),
    "passportNumber" VARCHAR(40),
    "passportExpired" TIMESTAMP(3),
    "pinfl" VARCHAR(40),
    "consultantId" TEXT NOT NULL,
    "citizenId" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL,
    "visaTime" TIMESTAMP(3) NOT NULL,
    "registrationTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Citizen_name_key" ON "Citizen"("name");

-- CreateIndex
CREATE UNIQUE INDEX "VisaType_name_key" ON "VisaType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Consultant_name_key" ON "Consultant"("name");

-- AddForeignKey
ALTER TABLE "Visa" ADD CONSTRAINT "Visa_visaTypeId_fkey" FOREIGN KEY ("visaTypeId") REFERENCES "VisaType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visa" ADD CONSTRAINT "Visa_studentsId_fkey" FOREIGN KEY ("studentsId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_studentsId_fkey" FOREIGN KEY ("studentsId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_consultantId_fkey" FOREIGN KEY ("consultantId") REFERENCES "Consultant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_citizenId_fkey" FOREIGN KEY ("citizenId") REFERENCES "Citizen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
