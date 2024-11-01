-- DropForeignKey
ALTER TABLE "Registration" DROP CONSTRAINT "Registration_studentsId_fkey";

-- DropForeignKey
ALTER TABLE "Visa" DROP CONSTRAINT "Visa_studentsId_fkey";

-- AddForeignKey
ALTER TABLE "Visa" ADD CONSTRAINT "Visa_studentsId_fkey" FOREIGN KEY ("studentsId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_studentsId_fkey" FOREIGN KEY ("studentsId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
