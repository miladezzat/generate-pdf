import { Controller, Get, Param, Query } from '@nestjs/common';
import { GetOnePdfDto } from './dto/get-one-pdf.dto';
import { PdfService } from './pdf.service';

@Controller('pdfs')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Get(':id')
  findOne(@Param('id') id: number, @Query() query: GetOnePdfDto) {
    return this.pdfService.findOne(id, query);
  }
}
