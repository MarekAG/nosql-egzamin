var conn = new Mongo();
var db = conn.getDB('nosql');

// rankng: rodzaj broni i ilość ofiar


var match = {
    $match: {
      nkill: {
        $gte: 1
      }
    }
  };

  var group = {
    $group: {
      _id: {
        bron: "$weaptype1_txt"
      },
      zabitych: {
        $sum: {
          $trunc: "$nkill"
        }
      }
    }
  };

  var sort = {
    $sort: {
      zabitych: -1
    }
  };

  var limit =     {
        $limit: 10
      };

  var aggregate5 = db.terrorism.aggregate([match, group, sort, limit], {
    explain: false
  }).pretty();
