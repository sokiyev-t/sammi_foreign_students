import { PrismaClient } from '@prisma/client';
const fs = require('fs');

const prisma = new PrismaClient();

async function main() {
  // Чтение данных из файла data.json
  const filePath = '/home/doston_user/sammi_foreign_students/prisma/data.json';
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const studentsData = JSON.parse(rawData);

  for (const studentData of studentsData) {
    const visaTypeName = studentData.visas[0].visaType.connect.name;
    const consultantName = studentData.consultant.connect.name;
    const citizenName = studentData.citizen.connect.name;

    if (!visaTypeName || !consultantName || !citizenName) {
      console.error('Missing required fields in data:', studentData);
      continue;
    }

    await prisma.student.create({
      data: {
        passportNumber: studentData.passportNumber,
        phoneNumber: studentData.phoneNumber,
        firstName: studentData.firstName,
        lastName: studentData.lastName,
        middleName: studentData.middleName,
        passportExpired: new Date(studentData.passportExpired),
        passportSeries: studentData.passportSeries,
        pinfl: studentData.pinfl,
        registrations: {
          create: studentData.registrations.map(registration => ({
            registrationEnd: new Date(registration.registrationEnd),
            registrationSeries: registration.registrationSeries,
            registrationNumber: registration.registrationNumber,
            registrationAddress: registration.registrationAddress,
            registrationStart: new Date(registration.registrationStart)
          }))
        },
        visas: {
          create: studentData.visas.map(visa => ({
            visaSeries: visa.visaSeries,
            visaNumber: visa.visaNumber,
            visaStart: new Date(visa.visaStart),
            visaEnd: new Date(visa.visaEnd),
            visaType: {
              connectOrCreate: {
                where: { name: visaTypeName },
                create: { name: visaTypeName }
              }
            }
          }))
        },
        consultant: {
          connectOrCreate: {
            where: { name: consultantName },
            create: { name: consultantName }
          }
        },
        citizen: {
          connectOrCreate: {
            where: { name: citizenName },
            create: { name: citizenName }
          }
        }
      }
    });
  }

  console.log("Seeding completed.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

