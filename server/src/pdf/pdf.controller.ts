import { Controller, Post, Get, Put, Param, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PDFService } from './pdf.service';
import { PDFField, WorkflowStep } from '../../src/types/pdf';

@Controller('pdf')
export class PDFController {
  constructor(private readonly pdfService: PDFService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPDF(@UploadedFile() file: Express.Multer.File, @Body('name') name: string) {
    return this.pdfService.create(file, name);
  }

  @Put(':id')
  async updatePDF(
    @Param('id') id: string,
    @Body('fields') fields: PDFField[],
    @Body('workflow') workflow: WorkflowStep[],
  ) {
    return this.pdfService.update(id, fields, workflow);
  }

  @Get(':id')
  async getPDF(@Param('id') id: string) {
    return this.pdfService.findOne(id);
  }

  @Get(':id/versions')
  async getVersions(@Param('id') id: string) {
    return this.pdfService.getVersions(id);
  }
}