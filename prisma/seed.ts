import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';

const prisma = new PrismaClient();

// Функция для конвертации даты в ISO-формат
const parseDate = (dateStr: string): Date | null => {
  if (!dateStr || dateStr === "") return null;
  const [day, month, year] = dateStr.split("/").map(Number);
  if (!day || !month || !year) return null;
  return new Date(`${year}-${month}-${day}`);
};

async function main() {
  const dataPath = '/home/doston_user/sammi_foreign_students/prisma/data.json'; // Укажите правильный путь

  if (!fs.existsSync(dataPath)) {
    console.error('File not found:', dataPath);
    process.exit(1);
  }

  let data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  for (const studentData of data) {
    try {
      // Заменяем отсутствующие значения на null или задаем значение по умолчанию
      const studentId = uuidv4();
      const phoneNumber = studentData.phoneNumber || null;
      const firstName = studentData.firstName || "Unknown";
      const lastName = studentData.lastName || "Unknown;
      const middleName = studentData.middleName || null;
      const passportSeries = studentData.passportSeries || "";
      const passportNumber = studentData.passportNumber || "";
      const passportExpired = parseDate(studentData.passportExpired);
      const pinfl = studentData.pinfl || uuidv4();

      const consultantId = studentData.consultant?.connect?.id || uuidv4();
      const citizenId = studentData.citizen?.connect?.id || uuidv4();

      const visas = studentData.visas?.map(visa => ({
        id: uuidv4(),
        visaSeries: visa.visaSeries || null,
        visaNumber: visa.visaNumber || null,
        visaStart: parseDate(visa.visaStart),
        visaEnd: parseDate(visa.visaEnd),
        visaType: {
          connect: { id: visa.visaType?.connect?.id || uuidv4() },
        },
      })) || [];

      const registrations = studentData.registrations?.map(reg => ({
        id: uuidv4(),
        registrationSeries: reg.registrationSeries || null,
        registrationNumber: reg.registrationNumber || null,
        registrationAddress: reg.registrationAddress || null,
        registrationStart: parseDate(reg.registrationStart),
        registrationEnd: parseDate(reg.registrationEnd),
      })) || [];

      // Убедимся, что связанные данные созданы или существуют
      await prisma.consultant.upsert({
        where: { id: consultantId },
        update: {},
        create: {
          id: consultantId,
          name: "Default Consultant",
          phoneNumber: null,
        },
      });

      await prisma.citizen.upsert({
        where: { id: citizenId },
        update: {},
        create: {
          id: citizenId,
          name: "Default Citizen",
        },
      });

      for (const visa of visas) {
        await prisma.visaType.upsert({
          where: { id: visa.visaType.connect.id },
          update: {},
          create: {
            id: visa.visaType.connect.id,
            name: "Default Visa Type",
          },
        });
      }

      // Создаем данные студента
      await prisma.student.create({
        data: {
          id: studentId,
          phoneNumber,
          firstName,
          lastName,
          middleName,
          passportSeries,
          passportNumber,
          passportExpired,
          pinfl,
          consultant: {
            connect: { id: consultantId },
          },
          citizen: {
            connect: { id: citizenId },
          },
          visas: {
            create: visas,
          },
          registrations: {
            create: registrations,
          },
        },
      });
    } catch (error) {
      console.error(`Error processing student ${studentData.firstName || "Unknown"}:`, error);
    }
  }
}

main()
  .catch(err => console.error(err))
  .finally(() => prisma.$disconnect());

