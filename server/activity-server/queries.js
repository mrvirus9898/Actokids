// create promise option
// bluebird has many features and faster than ES6 Promises
var promise = require('bluebird');

var options = {
    // initialize pg-promise option
    promiseLib: promise
}

// set up and connect to database
var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/actokids';
var db = pgp(connectionString);

module.exports = {
  getAllActivities: getAllActivities,
  createNewActivity: createNewActivity,
  findFilteredActivities:findFilteredActivities
  // add more functions here
};

const settings = {
    activity_test_database : 'activity_test',
    activity_prod_database : 'activity_prod'    
}

// gets all activities
function getAllActivities(req, res, next) {
  db.any('select * from ' + settings.activity_test_database)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Getting all activities.'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

// (${activity_name} comes as string
// ${date} comes as string representation of data. e.g '2019-02-15':
// ${time_of_day} comes as string representation of time_of_day. e.g '(11.0, 15.25)' meaing from 11:00am  until 3:15pm
// ${cost} comes as string representation of cost. e.g 16.35 meaing 16 dollars and 35 cents
// ${street_name} comes as string
// ${city} comes as string
// ${state} comes as string
// ${country} comes as string
// ${zip_code} comes as string
// ${descriptions} comes as string
// ${wheelchair_accessible} coms as string. Either 'true' or 'false'
// ${activity_type} comes as string. Must be one of activity_options enum
// ${disability_type} comes as string. Must be one of disability_options enum
// ${age_range} comes as string representation of age_range. e.g (5, 10) meaing age from 6 to 9. () exclusive [] inclusive
// ${parent_participation_required} coms as string. Either 'true' or 'false'
// ${assistant_provided}' coms as string. Either 'true' or 'false'
// ${disability_restrooms_available} coms as string. Either 'true' or 'false'
// ${equipment_provided} comes as string. e.g "['a','b','c']"
// ${sibling_participation}' coms as string. Either 'true' or 'false'
// ${kids_to_staff_ratio} comes as string.
// ${asl_interpreter_available} coms as string. Either 'true' or 'false'
// ${closed_circuit_heering_loop_available} coms as string. Either 'true' or 'false'
// ${additional_charge} coms as string. Either 'true' or 'false'
// ${accommodate_service_animals} coms as string. Either 'true' or 'false'
// ${onsite_childcare} coms as string. Either 'true' or 'false'
//
// create a new activity
function createNewActivity(req, res, next) {
  // console.log(req.body);
  var json = req.body;
  var a = json.a;
  var b = json.b;
  var c = json.c;
  var d = json.d;
  var e = json.e;
  var f = json.f;
  var g = json.g;
  var h = json.h;
  var i = json.i; // zipcode
  var j = json.j;
  var k = json.k;
  var l = json.l;
  var m = json.m;
  var n = json.n;
  var o = json.o;
  var p = json.p;
  var q = json.q;
  var r = json.r; // equipment_provided
  var s = json.s; // sibling_participation
  var t = json.t; // kids to staff ratio
  var u = json.u; // asl_interpreter_available
  var v = json.v; // cchl available
  var w = json.w; // additional_charge
  var x = json.x; // accommodate_service_animals
  var y = json.y; // onsite_childcare
  var z = json.z;

  if(i == '') {
    i = '-1';
  }
  if(t == '') {
    t = '-1'
  }

  var str = 'INSERT INTO '+ settings.activity_test_database
  + '(activity_name, dates, time_of_day, cost, street_name, city, state, country, zip_code, phone_number,'
  + 'descriptions, wheelchair_accessible, activity_type, disability_type, age_range,'
  + 'parent_participation_required, assistant_provided, disability_restrooms_available,'
  + 'equipment_provided, sibling_participation, kids_to_staff_ratio, asl_interpreter_available,'
  + 'closed_circuit_hearing_loop_available, additional_charge, accommodate_service_animals,'
  + 'onsite_childcare)'
  + " values('" + a + "', '(" + b + ")'::date, numrange('" + c + "'), money('" + d + "'), '" + e + "', '" + f + "', '" + g + "'"
  + ", '" + h + "', '" + i + "'::integer, '" + z + "', '" + j + "', '" + k + "'::bool, '" + l + "'::activity_options"
  + ", '" + m + "'::disability_options, '" + n + "'::int4range, '" + o + "'::bool, '" + p + "'::bool"
  + ", '" + q + "'::bool, '" + r + "',";

  if(s == null) {
    str += "null::bool,";
  } else {
    str += "'" + s + "'::bool,";
  }

  str += "'" + t + "'::real,";

  
  if(u == null) {
    str += 'null::bool,';
  } else {
    str += "'" + u + "'::bool,";
  }

  if(v == null) {
    str += 'null::bool,';
  } else {
    str += "'" + v + "'::bool,";
  }
  
  if(w == null) {
    str += 'null::bool,';
  } else {
    str += "'" + w + "'::bool,";
  }

  if(x == null) {
    str += 'null::bool,';
  } else {
    str += "'" + x + "'::bool,";
  }

  if(y == null) {
    str += 'null::bool);';
  } else {
    str += "'" + y + "'::bool);";
  }

  console.log(str);

  db.none(str, req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserting a new activity.'
        });
    })
    .catch(function (err) {
      // console.log(req.body);
      // console.log(res);
      return next(err);
    });
}

//Filter activities
function findFilteredActivities(req, res, next) {
  // console.log(req.body);
  var json = req.body;

  var str = 'SELECT * from ' + settings.activity_test_database;
  if (json.activity_type !== undefined || json.disability_type !== undefined || json.date !== undefined || json.cost !== undefined || json.wheelchair_accessible !== undefined) {
    str += ' WHERE';
  }

  if (json.activity_type !== undefined) {
    str += ' activity_type = ' + "'" + json.activity_type + "'::activity_options AND ";
  } 
  if (json.disability_type !== undefined) {
    str += ' disability_type = ' + "'" + json.disability_type + "'::disability_options AND ";
  } 
  if (json.date !== undefined) {
    str += ' dates = ' + "('" + json.date + "')::date AND ";
  } 
  if (json.cost !== undefined) {
    str += ' cost <= ' + "money('" + json.cost + "') AND ";
  } 
  if (json.wheelchair_accessible !== undefined) {
    str += ' wheelchair_accessible = ' + "'" + json.wheelchair_accessible + "'::bool AND ";
  } 

  var pos = str.lastIndexOf(' AND ');
  if(pos != -1) {
    str = str.substring(0,pos)
  }
  str += ';';

  // console.log(str);

 db.any(str, req.body)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Getting matching activities.'
        });
    })
    .catch(function (err) {
      return next(err);
    });

}

