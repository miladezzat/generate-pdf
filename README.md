## Instruction

1. Clone the repo: `git clone git@github.com:miladezzat/generate-pdf.git`
2. `cd generate-pdf`
3. Install dependencies: `yarn install`
4. Run the internal service to generate pdf: `npm run gen:pdf <USER_ID>`
5. Start server: `yarn start:dev`, and you can access it on `http://localhost:3000`
6. API for getting PDF: `http://localhost:3000/pdf/:PLOIC_ID`


## Notes
- I assumption that:
  1. Theres is a database that have the three entities, customer, polices and policesHolders
  2. Generate static data on the file `database.json`
  3. Upload the PDFs on cloud storage like aws storage or gcp storage
   
- The packages that used for generate PDF
  1. hbs (handlebarsjs) for compile html
  2. puppeteer for generate PDF
