-- AlterTable
ALTER TABLE "Registration" ALTER COLUMN "registrationStart" DROP NOT NULL,
ALTER COLUMN "registrationEnd" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "passportExpired" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Visa" ALTER COLUMN "visaStart" DROP NOT NULL,
ALTER COLUMN "visaEnd" DROP NOT NULL;
