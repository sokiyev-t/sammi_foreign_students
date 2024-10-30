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
CREATE TABLE "Students" (
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

    CONSTRAINT "Students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "visaTime" TIMESTAMP(3) NOT NULL,
    "registrationTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Students_lastName_key" ON "Students"("lastName");

-- CreateIndex
CREATE UNIQUE INDEX "Students_middleName_key" ON "Students"("middleName");

-- CreateIndex
CREATE UNIQUE INDEX "Students_passportSeries_key" ON "Students"("passportSeries");

-- CreateIndex
CREATE UNIQUE INDEX "Students_passportNumber_key" ON "Students"("passportNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Students_pinfl_key" ON "Students"("pinfl");

-- AddForeignKey
ALTER TABLE "Visa" ADD CONSTRAINT "Visa_visaTypeId_fkey" FOREIGN KEY ("visaTypeId") REFERENCES "VisaType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visa" ADD CONSTRAINT "Visa_studentsId_fkey" FOREIGN KEY ("studentsId") REFERENCES "Students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_studentsId_fkey" FOREIGN KEY ("studentsId") REFERENCES "Students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_citizenId_fkey" FOREIGN KEY ("citizenId") REFERENCES "Citizen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_consultantId_fkey" FOREIGN KEY ("consultantId") REFERENCES "Consultant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
