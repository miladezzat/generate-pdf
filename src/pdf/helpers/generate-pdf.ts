import * as pupp from 'puppeteer';
import * as fs from 'fs-extra';
import hbs from 'handlebars';
import * as path from 'path';
import * as moment from 'moment';

const compile = async function (templateName, data, styleFileName) {
  const filePath = path.join(
    process.cwd(),
    './src/pdf/templates',
    `${templateName}.hbs`,
  );

  const stylesPath = path.join(
    process.cwd(),
    './src/pdf/templates',
    `${styleFileName}.txt`,
  );

  const html = await fs.readFile(filePath, 'utf-8');
  const styles = await fs.readFile(stylesPath, 'utf-8');

  return hbs.compile(styles + html)(data);
};

hbs.registerHelper('dataFormat', function (value, format) {
  return moment(value).format(format);
});

export const generatePDF = async ({
  data,
  intern,
  force,
}: {
  data: any;
  intern?: boolean;
  force?: boolean;
}) => {
  const browser = await pupp.launch();
  const page = await browser.newPage();

  const content = await compile('pdf', data, 'styles');

  await page.setContent(content);
  await page.emulateMediaType('screen');
  const filePath = path.join(process.cwd(), './src/pdf/pdfs', ``);

  if (intern || force) {
    // here we assume that: adding the file on file storage like ASW storage or gcp storage
    await page.pdf({
      path: `${filePath}/${data.customerPolicy.id}.pdf`,
      format: 'A4',
      printBackground: true,
    });
  }

  console.log('PDF Generated ');

  await browser.close();

  return `${filePath}/${data.customerPolicy.id}.pdf`;
};
