#Agregacje

### 1. Regiony świata, w których najczęściej dochodzi do zamachów (w ostatniej dekadzie)


Usuwamy "nieznane" regiony:
```
var match = {
  $match: {
    region: {
      $ne: "Unknown"
    }
  }
};
```

Grupujemy po id regionu i zapamiętujemy jego nazwę, oraz zliczamy zamachy:
```
var group = {
  $group: {
    _id: "$region",
    region: {
      $first: "$region_txt"
    },
    count: {
      $sum: 1
    }
  }
};
```

Sortujemy po ilości zamachów:
```
var sort = {
  $sort: {
    count: -1
  }
};
```

Usuwamy z wyniku niepotrzebne nam pole "_id":
```
var project = {
  $project: {
    _id: 0
  }
};
```

Składamy zapytanie w całość:
```
var aggregate1a = db.terrorism.aggregate([match, group, sort, project]);

```

Otrzymaliśmy ranking regionów świata najbardziej dotkniętych zamachami terrorystycznymi od roku 1970. Aby otrzymać dane z ostatniej dekady musimy zrobić małą zmianę (zaznaczam, że dane sięgają początku roku 2016):
```
var match2 = {
  $match: {
    region: {
      $ne: "Unknown"
    },
    iyear: {
      $gte: 2005
    }
  }
};


var aggregate1b = db.terrorism.aggregate([match2, group, sort, project], {
  explain: false
}).pretty();
```

Wynik pierwszego zapytania:



