var conn = new Mongo();
var db = conn.getDB('nosql');

// jakiego typu ataków było najwięcej w danym regionie świata

var group = {
  $group: {
    "_id": {
      "region": "$region_txt",
      "typ": "$attacktype1_txt"
    },
    "countTypes": {
      "$sum": 1
    }
  }
};

var sort = {
  $sort: {
    "countTypes": -1
  }
};

var secondGroup = {
  $group: {
    "_id": "$_id.region",
    "typy": {
      "$push": {
        "typ": "$_id.typ",
        "liczba": "$countTypes"
      }
    },
    "liczba": {
      "$sum": "$countTypes"
    }
  }
};

var secondSort = {
  $sort: {
    "liczba": -1
  }
};

var project = {
  $project: {
    "typy": {
      $slice: ["$typy", 1]
    },
    "liczba": 1
  }
};

var aggregate6 = db.terrorism.aggregate([group, sort, secondGroup, secondSort, project], {
  explain: false
}).pretty();
