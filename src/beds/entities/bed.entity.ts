import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Room } from './room.entity';
import { BedStatus } from '../../common/enums/status.enum';

@Entity('beds')
export class Bed {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  bedNumber: string;

  @Column()
  roomId: string;

  @ManyToOne(() => Room, room => room.beds)
  @JoinColumn({ name: 'roomId' })
  room: Room;

  @Column({ type: 'enum', enum: BedStatus, default: BedStatus.AVAILABLE })
  status: BedStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
