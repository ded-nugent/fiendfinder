var fiends = require("../data/fiends");

module.exports = function(app) {

  app.get("/api/fiends", function(req, res) {
    res.json(fiends);
  });

  app.post("/api/fiends", function(req, res) {
    

    var user = req.body;

    for(var i = 0; i < user.scores.length; i++) {
      user.scores[i] = parseInt(user.scores[i]);
    }

    var bestFiend = 0;
    var tempDifference = 40;

    for(var i = 0; i < fiends.length; i++) {
      var totalDifference = 0;
      for(var j = 0; j < fiends[i].scores.length; j++) {
        var difference = Math.abs(user.scores[j] - fiends[i].scores[j]);
        totalDifference += difference;
      }

      if(totalDifference < tempDifference) {
        bestFiend = i;
        tempDifference = totalDifference;
      }
    }

    fiends.push(user);

    res.json(fiends[bestFiend]);
  });
};