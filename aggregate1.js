var conn = new Mongo();
var db = conn.getDB('nosql');

//regiony świata w których najczęściej dochodzi zamachów w ostatniej dekadzie


var match = {
  $match: {
    region: {
      $ne: "Unknown"
    }
  }
};

var group = {
  "$group": {
    _id: "$region",
    region: {
      $first: "$region_txt"
    },
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

var project = {
  $project: {
    _id: 0
  }
};

var aggregate1a = db.terrorism.aggregate([match, group, sort, project]);

// w ostatniej dekadzie

var match2 = $match: {
  region: {
    $ne: "Unknown"
  },
  iyear: {
    $gte: 2015
  }
}
};

var aggregate1b = db.terrorism.aggregate([match2, group, sort, project], {
  explain: false
}).pretty();
