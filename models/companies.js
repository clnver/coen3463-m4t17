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

  company_name: String,
  stock_symbol: String,
  sector: String,
  subsector: String,
  listing_date: String,
  company_website: String,
  current_CEO: String,
  CompanyLogo_link: String,
  create_date: String,
  update_date: String
  }]
});


module.exports = mongoose.model('Company', companySchema);