var conn = new Mongo();
var db = conn.getDB('nosql');

//ile zamachów w Polsce /ile ofiar / ile udanych


var match = {
  $match: {
    country: {
      $eq: 161
    }
  }
};

var group = {
  $group: {
    _id: "$country",
    "liczba zamachow": {
      $sum: 1
    },
    "udanych": {
      $sum: "$success"
    },
    "liczba ofiar smiertelnych": {
      $sum: "$nkill"
    },
    "liczba rannych": {
      $sum: "$nwound"
    }
  }
};

var aggregate3 = db.terrorism.aggregate([match, group], {
  explain: false
}).pretty();
