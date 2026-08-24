import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';
import { DepartmentsService } from '../departments/departments.service';
import { DoctorsService } from '../doctors/doctors.service';
import { PatientsService } from '../patients/patients.service';
import { Role } from '../common/enums/role.enum';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  console.log('Starting seed...');
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const usersService = app.get(UsersService);
  const departmentsService = app.get(DepartmentsService);
  const doctorsService = app.get(DoctorsService);
  const patientsService = app.get(PatientsService);

  const hashedPassword = await bcrypt.hash('password123', 10);

  // 1. Admin
  let admin = await usersService.findByEmail('admin@clinicare.com');
  if (!admin) {
    admin = await usersService.create({
      name: 'Super Admin',
      email: 'admin@clinicare.com',
      password: hashedPassword,
      role: Role.ADMIN,
      phone: '1234567890',
    });
    console.log('Admin user created');
  }

  // 2. Department
  const existingDepartments = await departmentsService.findAll();
  let cardiologyId = existingDepartments[0]?.id;
  if (!cardiologyId) {
    const dept = await departmentsService.create({
      name: 'Cardiology',
      description: 'Heart and blood vessel diseases'
    } as any);
    cardiologyId = dept.id;
    console.log('Cardiology department created');
  }

  // 3. Doctor (Sarah)
  let doctorUser = await usersService.findByEmail('sarah@clinicare.com');
  if (!doctorUser) {
    doctorUser = await usersService.create({
      name: 'Dr. Sarah Smith',
      email: 'sarah@clinicare.com',
      password: hashedPassword,
      role: Role.DOCTOR,
      phone: '0987654321',
    });
    
    await doctorsService.create({
      userId: doctorUser.id,
      departmentId: cardiologyId,
      specialization: 'Cardiologist',
      experience: 10,
      consultationFee: 150.00
    } as any);
    console.log('Doctor Sarah created');
  }

  // 4. Patient (John)
  let patientUser = await usersService.findByEmail('john@clinicare.com');
  if (!patientUser) {
    patientUser = await usersService.create({
      name: 'John Doe',
      email: 'john@clinicare.com',
      password: hashedPassword,
      role: Role.PATIENT,
      phone: '5551234567',
    });
    
    await patientsService.create({
      userId: patientUser.id,
      patientCode: 'PT-1001',
      bloodGroup: 'O+',
      dateOfBirth: new Date('1990-05-15'),
      gender: 'Male',
    } as any); // Type cast due to dates handling
    console.log('Patient John created');
  }

  await app.close();
  console.log('Seed completed.');
}

bootstrap();
