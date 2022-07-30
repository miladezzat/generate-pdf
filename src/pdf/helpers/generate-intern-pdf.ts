/* eslint-disable @typescript-eslint/no-var-requires */
import { generatePDF } from './generate-pdf';

// I assume this is the database,
// in real example we will find the customer and his related data from database
const db = require('../../../database.json');

export default (async function generatePDFIntern() {
  // we can create function to get user data from db by his id instead of using static data
  const customerId = process.argv[2];
  const customer = db.customers.find((customer) => customer.id === +customerId);

  const customerPolicy = db.policies.find(
    (value) => value.customerId === +customerId,
  );

  const policyHolder = db.policiesHolders.find(
    (value) => value.policyId === customerPolicy.id,
  );

  await generatePDF({
    data: {
      customer,
      customerPolicy,
      policyHolder,
      //we can make these value as args from command line like user id
      cancelReason: true,
      petCare: false,
      rentalCarCare: true,
    },

    intern: true,
  });

  process.exit(0);
})();
