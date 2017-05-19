var conn = new Mongo();
var db = conn.getDB('nosql');

//średnia długosć przetrzymywania zakładników


var match = { $match: {
  ishostkid: {
    $eq: 1
  },
  ndays: {
    $gte: 0
  }
}
};
var group = {
  $group: {
    _id: null,
    avg: {
      $avg: "$ndays"
    }
  }
};

var project = {
  $project: {
    _id: 0
  }
};

var aggregate2 = db.terrorism.aggregate([match, group, project], {
  explain: false
}).pretty();
