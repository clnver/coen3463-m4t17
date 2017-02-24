var express = require('express');
var router = express.Router();
var moment = require('moment');
var Company = require('../models/companies');


router.use(function(req, res, next) {
  if (!req.user) {
    res.redirect('/auth/login')
  }
  next();
});

router.get('/', function(req, res) {
  Company.find( function(err, company, count) {
    res.render('companies', {companies: company});
  })
});

router.post('/', function(req, res) {
    new Company({
      company_name: req.body.company_name,
      stock_symbol: req.body.stock_symbol,
      sector: req.body.sector,
      subsector: req.body.subsector,
      listing_date: req.body.listing_date,
      company_website: req.body.company_website,
      current_CEO: req.body.current_CEO,
      CompanyLogo_link: req.body.CompanyLogo_link,
      create_date: req.body.create_date,
      update_date: req.body.update_date
    }).save(function(err, company, count) {
      if(err) {
        res.status(400).send('Error saving new company: ' + err);
      } else {
        res.send("New company created");
      }
    })
});

router.get('/addCompany', function(req, res) {
  res.render('addCompanies', {company: {}});
});


router.route('/:companyId')
  .all(function(req, res, next) {
    companyId = req.params.companyId;
    company = {};
    Company.findById(companyId, function(err, c) {
      company = c;
      next();
    });
  })

  .get(function(req, res) {
    res.render('company', {company: company, moment: moment});
  })

router.route('/:companyId/update')
  .all(function(req, res, next) {
    companyId = req.params.companyId;
    company = {};
    Company.findById(companyId, function(err, c) {
      company = c;
      next();
    });
  })
  .get(function(req, res) {
    res.render('update', {update: company});
  })
  .post(function(req, res) {
    company.company_name = req.body.company_name,
    company.stock_symbol = req.body.stock_symbol,
    company.sector = req.body.sector,
    company.subsector = req.body.subsector,
    company.listing_date = req.body.listing_date,
    company.company_website = req.body.company_website,
    company.current_CEO = req.body.current_CEO,
    company.CompanyLogo_link = req.body.CompanyLogo_link,
    company.create_date = req.body.create_date,
    company.update_date = req.body.update_date,
    company.save(function(err, company, count) {
      if(err) {
        res.status(400).send('Error saving company: ' + err);
      } else {
        res.redirect('/companies/'+companyId);
      }
    });
  })
    

router.route('/:companyId/delete')
  .all(function(req, res, next) {
    companyId = req.params.companyId;
    company = {};
    Company.findById(companyId, function(err, c) {
      company = c;
      next();
    });
  })
  .get(function(req, res) {
    company.remove(function(err, company) {
      if(err) {
        res.status(400).send("Error removing company: " + err);
      } else {
         res.send('Company removed');
        res.redirect('/companies');
      }
    });
  });
module.exports = router;
