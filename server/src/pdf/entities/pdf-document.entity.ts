import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn } from 'typeorm';
import { PDFField, WorkflowStep } from '../../../src/types/pdf';

@Entity()
export class PDFDocument {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('jsonb')
  fields: PDFField[];

  @Column('jsonb')
  workflow: WorkflowStep[];

  @Column()
  fileUrl: string;

  @VersionColumn()
  version: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}