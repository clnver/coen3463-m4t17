var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var companySchema = new Schema({
  /* id is created automatically
  name: String,
  job: String,
  nickname: String,
  email: String,
  notes: [{
    postedDate: {
      type: Date,
      'default': Date.now
    },
    note: String*/

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
  }, { collection: 'module_4' });
};


module.exports = mongoose.model('Company', companySchema);