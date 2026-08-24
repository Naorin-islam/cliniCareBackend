import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Prescription } from './prescription.entity';
import { Medicine } from '../../medicines/entities/medicine.entity';

@Entity('prescription_items')
export class PrescriptionItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  prescriptionId: string;

  @ManyToOne(() => Prescription, prescription => prescription.items)
  @JoinColumn({ name: 'prescriptionId' })
  prescription: Prescription;

  @Column()
  medicineId: string;

  @ManyToOne(() => Medicine)
  @JoinColumn({ name: 'medicineId' })
  medicine: Medicine;

  @Column()
  dosage: string;

  @Column()
  frequency: string;

  @Column()
  duration: string;

  @Column({ type: 'text', nullable: true })
  instructions: string;
}
