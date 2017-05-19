var conn = new Mongo();
var db = conn.getDB('nosql');

// atak w którym uczestniczyło najwięcej terrorystów

var match = {
  $match: {
    nperps: {
      $ne: ""
    }
  }
};

var sort = {
  $sort: {
    nperps: -1
  }
};

var limit = {
  $limit: 1
};

var aggregate8 = db.terrorism.aggregate([match, sort, limit], {
  explain: false
}).pretty();
