import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  const filePath = '/home/doston_user/sammi_foreign_students/prisma/data.json';
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const studentsData = JSON.parse(rawData);

  for (const studentData of studentsData) {
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
                where: { name: visa.visaType.connect.name },
                create: { name: visa.visaType.connect.name }
              }
            }
          }))
        },
        consultant: {
          connectOrCreate: {
            where: { name: studentData.consultant.connect.name },
            create: { name: studentData.consultant.connect.name }
          }
        },
        citizen: {
          connectOrCreate: {
            where: { name: studentData.citizen.connect.name },
            create: { name: studentData.citizen.connect.name }
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

