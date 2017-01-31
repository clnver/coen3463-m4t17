var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var auth = require ('./routes/auth');
var update = require ('./routes/update');

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

var app = express();
var db;

var mdbUrl = "mongodb://admin:somethingsweet@ds159978.mlab.com:59978/coen3463-m3t17"

MongoClient.connect(mdbUrl, function(err, database) {
    if (err) {
        console.log(err)
        return;
    }

    console.log("Connected to DB!");

    // set db
    db = database;
    // view engine setup
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');

	// uncomment after placing your favicon in /public
	//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, 'public')));

	app.use('/', index);
    app.use('/update', update);
    app.use('/auth', auth);

    	
	app.get('/companies', function(req, res) {
		var companiesCollection = db.collection('companies');
        companiesCollection.find().toArray(function(err, companies) {
           console.log('companies loaded', companies);
          res.render('companies', {
            companies: companies
          });
        })
    });

  
    app.post('/companies', function(req, res) {
        console.log(req.body);
        var dataToSave = {
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
        };
        db.collection('companies')
          .save(dataToSave, function(err, company) {
            if (err) {
                console.log('Saving Data Failed!');
                return;
            }
            console.log("Saving Data Successful!");
            res.redirect('/companies');
        })
    });

    app.get('/company/:companyId', function(req, res) {
        var companyId = req.params.companyId;
        var companyCollection = db.collection('companies');
        companyCollection.findOne({ _id: new ObjectId(companyId) }, function(err, company) {
            res.render('company', {
                company: company
            });
        });
    });

    app.get('/company/:companyId/update', function(req, res) { 
        var companyId = req.params.companyId;
        var companyCollection = db.collection('companies');
        companyCollection.findOne({ _id: new ObjectId(companyId) }, function(err, company) {
            res.render('update', {
                update: company
            });
        });
    });

    app.post('/company/:companyId/update', function(req, res) {
        var companyId = req.params.companyId;
        var companyCollection = db.collection('companies');
        var dataToSave = {
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
        };
        companyCollection.updateOne({ _id: new ObjectId(companyId)}, {$set: dataToSave}, function(err, company) {
            if(err){
            return console.log(err)
            }
            console.log("Successful Update!");
            res.redirect('/company/'+companyId) 
        });
    });

    app.get('/company/:companyId/delete', function(req, res) {
        var companyId = req.params.companyId;
        var companyCollection = db.collection('companies');
        companyCollection.deleteOne({ _id: new ObjectId(companyId)}, function(err, company) {
            if(err){
            return console.log(err)
            }
            console.log("Deletion Successful!");
            res.redirect('/companies/')   
        });
    });
    // catch 404 and forward to error handler
	app.use(function(req, res, next) {
 	 var err = new Error('Not Found');
 	 err.status = 404;
 	 next(err);
	});

	// error handler
	app.use(function(err, req, res, next) {
  	// set locals, only providing error in development
 	 res.locals.message = err.message;
  	res.locals.error = req.app.get('env') === 'development' ? err : {};

 	 // render the error page
  	res.status(err.status || 500);
 	 res.render('error');
	});
});
module.exports = app;
