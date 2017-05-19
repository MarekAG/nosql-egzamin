var conn = new Mongo();
var db = conn.getDB('nosql');

// atak w którym było najwięcej rannych i zabitych


var match = {
  $match: {
    nkill: {
      $gte: 0
    },
    nwound: {
      $gte: 0
    }
  }
};

var project = {
  $project: {
    "liczba ofiar": {
      $add: ["$nkill", "$nwound"]
    }
  }
};

var sort = {
  $sort: {
    "liczba ofiar": -1
  }
};

var limit = {
  $limit: 1
};

var aggregate7a = db.terrorism.aggregate([match, project, sort, limit], {
  explain: false
})


// wersja ze switchem

var match2 = {
  $match: {
    $or: [{
      nkill: {
        $gte: 0
      }
    }, {
      nwound: {
        $gte: 0
      }
    }]
  }
};

var projectSwitch = {
  $project: {
    "liczba ofiar": {
      $switch: {
        branches: [{
            case: {
              $and: [{
                  $ne: ["$nkill", ""]
                },
                {
                  $ne: ["$nwound", ""]
                }
              ]
            },
            then: {
              $add: ["$nkill", "$nwound"]
            }
          },
          {
            case: {
              $and: [{
                  $ne: ["$nkill", ""]
                },
                {
                  $eq: ["$nwound", ""]
                }
              ]
            },
            then: "$nkill"
          },
          {
            case: {
              $and: [{
                  $eq: ["$nkill", ""]
                },
                {
                  $ne: ["$nwound", ""]
                }
              ]
            },
            then: "$nwound"
          }
        ],
        default: 0
      }
    }
  }
};

var aggregate7b = db.terrorism.aggregate([match2, projectSwitch, sort, limit], {
  explain: false
}).pretty();
