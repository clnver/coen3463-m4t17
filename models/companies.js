var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var companySchema = new Schema({
  company_name: {
    type: String,
    required: [true, 'Company Name is required.']
    },
  stock_symbol: {
    type: String,
    required: [true, 'Stock Symbol is required.']
    },
  sector: {
    type: String,
    required: [true, 'Sector is required.']
    },
  subsector: String,
  listing_date: String,
  company_website: String,
  current_CEO: String,
  CompanyLogo_link: String,
  create_date: String,
  update_date: String
});
module.exports = mongoose.model('Company', companySchema);