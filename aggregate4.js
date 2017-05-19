var conn = new Mongo();
var db = conn.getDB('nosql');


//miasta w których najwięcej zamachów i jaka broń

var match = {
  $match: {
    city: {
      $ne: "Unknown"
    }
  }
};

var group = {
  "$group": {
    _id: "$city",
    count: {
      $sum: 1
    }
  }
};

var sort = {
  $sort: {
    count: -1
  }
};

var limit = {
  $limit: 10
};

var aggregate4a = db.terrorism.aggregate([match, group, sort, limit], {
  explain: false
}).pretty();

// mongo 3.4

var sortByCount = {
  $sortByCount: "$city"
};

var aggregate4b = db.terrorism.aggregate([match, sortByCount, limit], {
  explain: false
}).pretty();


var groupWithWeapons = {
  "$group": {
    _id: {
      city: "$city",
      weapon: "$weaptype1_txt"
    }
  }
};

var aggregate4c = db.terrorism.aggregate([match, groupWithWeapons, count, sort, limit], {
  explain: false
}).pretty();
