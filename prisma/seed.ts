import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  const dataPath = path.join(__dirname, 'data.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  for (const studentData of data) {
    // Generate UUIDs for any missing IDs
    if (!studentData.id) {
      studentData.id = uuidv4();
    }
    if (!studentData.consultant.connect.id) {
      studentData.consultant.connect.id = uuidv4();
    }
    if (!studentData.citizen.connect.id) {
      studentData.citizen.connect.id = uuidv4();
    }
    if (!studentData.visas[0].visaType.connect.id) {
      studentData.visas[0].visaType.connect.id = uuidv4();
    }

    // Create or connect related entities
    await prisma.consultant.upsert({
      where: { id: studentData.consultant.connect.id },
      update: {},
      create: {
        id: studentData.consultant.connect.id,
        name: 'Consultant Name', // You can set a default name or fetch it from another source
        phoneNumber: 'Consultant PhoneNumber', // You can set a default phone number or fetch it from another source
      },
    });

    await prisma.citizen.upsert({
      where: { id: studentData.citizen.connect.id },
      update: {},
      create: {
        id: studentData.citizen.connect.id,
        name: 'Citizen Name', // You can set a default name or fetch it from another source
      },
    });

    await prisma.visaType.upsert({
      where: { id: studentData.visas[0].visaType.connect.id },
      update: {},
      create: {
        id: studentData.visas[0].visaType.connect.id,
        name: 'Visa Type Name', // You can set a default name or fetch it from another source
      },
    });

    // Create the student and related entities
    await prisma.student.create({
      data: {
        id: studentData.id,
        phoneNumber: studentData.phoneNumber,
        firstName: studentData.firstName,
        lastName: studentData.lastName,
        middleName: studentData.middleName,
        passportSeries: studentData.passportSeries,
        passportNumber: studentData.passportNumber,
        passportExpired: new Date(studentData.passportExpired),
        pinfl: studentData.pinfl,
        consultant: {
          connect: { id: studentData.consultant.connect.id },
        },
        citizen: {
          connect: { id: studentData.citizen.connect.id },
        },
        visas: {
          create: studentData.visas.map(visa => ({
            visaSeries: visa.visaSeries,
            visaNumber: visa.visaNumber,
            visaStart: new Date(visa.visaStart),
            visaEnd: new Date(visa.visaEnd),
            visaType: {
              connect: { id: visa.visaType.connect.id },
            },
          })),
        },
        registrations: {
          create: studentData.registrations.map(registration => ({
            registrationSeries: registration.registrationSeries,
            registrationNumber: registration.registrationNumber,
            registrationAddress: registration.registrationAddress,
            registrationStart: new Date(registration.registrationStart),
            registrationEnd: new Date(registration.registrationEnd),
          })),
        },
      },
    });
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
