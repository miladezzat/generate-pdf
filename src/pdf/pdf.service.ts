/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as path from 'path';
import { GetOnePdfDto } from './dto/get-one-pdf.dto';
import { generatePDF } from './helpers/generate-pdf';

@Injectable()
export class PdfService {
  async findOne(id: number, query: GetOnePdfDto) {
    const { force, cancelReason, petCare, rentalCarCare } = query;

    const dirPath = path.join(process.cwd(), './src/pdf/pdfs', ``);
    const files = await fs.readdirSync(dirPath);

    const filesNames = files.map((file) =>
      path.basename(file, path.extname(file)),
    );

    if (force || !filesNames.includes[id]) {
      // I assume this is the database,
      // in real example we will find the customer and his related data from database
      const db = require('../../database.json');

      const customerPolicy = db.policies.find((value) => value.id === +id);

      const customer = db.customers.find(
        (customer) => customer.id === customerPolicy.customerId,
      );

      const policyHolder = db.policiesHolders.find(
        (value) => value.policyId === customerPolicy.id,
      );

      await generatePDF({
        data: {
          customer,
          customerPolicy,
          policyHolder,
          cancelReason,
          petCare,
          rentalCarCare,
        },
        force: true,
      });
    }

    // we assume that: the pdf on some online storage and we can read it by url
    return { url: `${dirPath}/${id}.pdf` };
  }
}
