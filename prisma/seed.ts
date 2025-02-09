import { $Enums, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
const fs = require("fs");

const prisma = new PrismaClient();

async function main() {
  // Чтение данных из файла data.json
  const filePath = '/home/doossee/sammi_foreign_students/prisma/data.json';
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const studentsData = JSON.parse(rawData);

  const adminUser = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: await bcrypt.hash('admin', 10),
      name: 'Admin',
      role: $Enums.Role.ADMIN,
    },
  });

  console.log({ adminUser });

  const citizens = await prisma.citizen.createManyAndReturn({
    data: [
      {
        "name": "India"
      },
      {
        "name": "Bangladesh"
      },
      {
        "name": "Nepal"
      },
      {
        "name": "Turkey"
      },
      {
        "name": "Fillipin"
      },
      {
        "name": "Pakistan"
      },
      {
        "name": "Korea"
      }
    ]
  });

  const consultants = await prisma.consultant.createManyAndReturn({
    data: [
      {
        "name": "AXIS"
      },
      {
        "name": "Grand Alsion"
      },
      {
        "name": "MDHouse"
      },
      {
        "name": "Mughal"
      },
      {
        "name": "Usmanov Samad"
      },
      {
        "name": "Cosmos Moxsin"
      },
      {
        "name": "Arsal"
      },
      {
        "name": "Directly SamSMU"
      }
    ]
  });

  const visaTypes = await prisma.visaType.createManyAndReturn({
    data: [
      {
        "name": "tourist_visa"
      },
      {
        "name": "student_visa"
      },
      {
        "name": "business_visa"
      }
    ]
  })

  const visaTypeMap = Object.fromEntries(visaTypes.map((v) => [v.name, v.id]));
  const consultantMap = Object.fromEntries(consultants.map((c) => [c.name, c.id]));
  const citizenMap = Object.fromEntries(citizens.map((ci) => [ci.name, ci.id]));

  // Step 4: Create Student records
  for (const student of studentsData) {
    try {
      await prisma.student.create({
        data: {
          passportNumber: student.passportNumber,
          phoneNumber: student.phoneNumber,
          firstName: student.firstName,
          lastName: student.lastName,
          middleName: student.middleName,
          passportExpired: new Date(student.passportExpired),
          passportSeries: student.passportSeries,
          pinfl: student.pinfl,
          registrations: {
            create: student.registrations.map((registration) => ({
              registrationEnd: new Date(registration.registrationEnd),
              registrationSeries: registration.registrationSeries,
              registrationNumber: registration.registrationNumber,
              registrationAddress: registration.registrationAddress,
              registrationStart: new Date(registration.registrationStart),
            })),
          },
          visas: {
            create: student.visas.map((visa) => ({
              visaSeries: visa.visaSeries,
              visaNumber: visa.visaNumber,
              visaStart: new Date(visa.visaStart),
              visaEnd: new Date(visa.visaEnd),
              visaType: {
                connect: { id: visaTypeMap[visa.visaType.connect.name] },
              },
            })),
          },
          consultant: {
            connect: { id: consultantMap[student.consultant.connect.name] },
          },
          citizen: {
            connect: { id: citizenMap[student.citizen.connect.name] },
          },
        },
      });
    } catch (error) {
      console.error('Error creating student:', student);
      console.error(error);
    }
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

