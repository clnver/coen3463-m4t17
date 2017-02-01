var express = require('express');
var router = express.Router();
var moment = require('moment');
var Contact = require('../models/companies');


router.use(function(req, res, next) {
  if (!req.user) {
    res.redirect('/auth/login')
  }
  next();
});

router.get('/', function(req, res) {
  Contact.find( function(err, companies, count) {
    res.render('list', {companies: companies});
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

router.get('/add', function(req, res) {
  res.render('add', {company: {}});
});

router.route('/:company_id')
  .all(function(req, res, next) {
    company_id = req.params.company_id;
    company = {};
    Company.findById(company_id, function(err, c) {
      company = c;
      next();
    });
  })

  .get(function(req, res) {
    res.render('edit', {company: company, moment: moment});
  })

  .post(function(req, res) {
    contact.notes.push({
      note: req.body.notes
    });

    contact.save(function(err, contact, count) {
      if(err) {
        res.status(400).send('Error adding note: ' + err);
      } else {
        res.send('Note added!');
      }
    });
  })

  .put(function(req, res) {
    company.company_name: req.body.company_name,
    company.stock_symbol: req.body.stock_symbol,
    company.sector: req.body.sector,
    company.subsector: req.body.subsector,
    company.listing_date: req.body.listing_date,
    company.company_website: req.body.company_website,
    company.current_CEO: req.body.current_CEO,
    company.CompanyLogo_link: req.body.CompanyLogo_link,
    company.create_date: req.body.create_date,
    company.update_date: req.body.update_date

    company.save(function(err, company, count) {
      if(err) {
        res.status(400).send('Error saving company: ' + err);
      } else {
        res.send('Company saved');
      }
    });
  })

  .delete(function(req, res) {
    contact.remove(function(err, contact) {
      if(err) {
        res.status(400).send("Error removing company: " + err);
      } else {
        res.send('Company removed');
      }
    });
  });

module.exports = router;
