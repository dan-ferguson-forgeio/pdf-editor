import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PDFDocument } from './entities/pdf-document.entity';
import { PDFField, WorkflowStep } from '../../src/types/pdf';

@Injectable()
export class PDFService {
  constructor(
    @InjectRepository(PDFDocument)
    private pdfRepository: Repository<PDFDocument>,
  ) {}

  async create(file: Express.Multer.File, name: string) {
    const document = this.pdfRepository.create({
      name,
      fields: [],
      workflow: [],
      fileUrl: file.path,
    });
    return this.pdfRepository.save(document);
  }

  async update(id: string, fields: PDFField[], workflow: WorkflowStep[]) {
    return this.pdfRepository.update(id, { fields, workflow });
  }

  async findOne(id: string) {
    return this.pdfRepository.findOneBy({ id });
  }

  async getVersions(id: string) {
    return this.pdfRepository
      .createQueryBuilder('pdf')
      .where('pdf.id = :id', { id })
      .orderBy('pdf.version', 'DESC')
      .getMany();
  }
}