-- AlterTable
ALTER TABLE "Consultant" ALTER COLUMN "phoneNumber" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Registration" ALTER COLUMN "registrationSeries" DROP NOT NULL,
ALTER COLUMN "registrationNumber" DROP NOT NULL,
ALTER COLUMN "registrationAddress" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "phoneNumber" DROP NOT NULL,
ALTER COLUMN "lastName" DROP NOT NULL,
ALTER COLUMN "middleName" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Visa" ALTER COLUMN "visaSeries" DROP NOT NULL,
ALTER COLUMN "visaNumber" DROP NOT NULL;
