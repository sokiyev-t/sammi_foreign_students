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
// import { StudentModule } from './student/student.module';


@Module({
  imports: [UserModule, AuthModule, CitizenModule, VisaTypeModule, VisaModule, ConsultantModule, RegistrationModule, SettingsModule, StudentModule],
  controllers: [],
  providers: [],
})
export class AppModule { }