import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './authentication/auth.module';
import { CitizenModule } from './citizen/citizen.module';
import { VisaTypeModule } from './visa-type/visa-type.module';
import { VisaModule } from './visa/visa.module';
import { ConsultantModule } from './consultant/consultant.module';
import { RegistrationModule } from './registration/registration.module';
import { SettingsModule } from './settings/settings.module';
import { StudentModule } from './student/student.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
     JwtModule.register({
      global: true,
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: process.env.JWT_ACCESS_EXPIRE },
    }),
    UserModule,
    AuthModule,
    CitizenModule,
    VisaTypeModule,
    VisaModule,
    RegistrationModule,
    SettingsModule,
    StudentModule,
    ConsultantModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
