import * as fs from 'fs-extra';
import * as path from 'path';
import { generatePDF } from './generate-pdf';

const data = {
  customers: {
    id: 2,
    name: 'test',
    email: 'test@test.com',
    address: 'test address',
  },
  customerPolicy: {
    id: 2,
    startDate: '10-08-2021',
    endDate: '15-08-2021',
    effectiveDate: '14-08-2021',
    location: ['testing', 'testing'],
    tripCost: 100,
    car: true,
    medical: '1a',
    pet: true,
    cancel: false,
    customerId: 2,
  },
  policyHolder: {
    id: 2,
    name: 'policy Test',
    policyId: 2,
  },
  cancelReason: true,
  petCare: false,
  rentalCarCare: true,
};

describe('generatePDF', () => {
  it('should be generate pdf file', async () => {
    const fileUrl = await generatePDF({
      data,
      intern: true,
    });

    const dirPath = path.join(process.cwd(), './src/pdf/pdfs', ``);
    const files = await fs.readdirSync(dirPath);

    const filesNames = files.map((file) =>
      path.basename(file, path.extname(file)),
    );

    expect(fileUrl).toBeDefined();
    expect(filesNames.includes(`${data.customerPolicy.id}`)).toBe(true);
  });
});
