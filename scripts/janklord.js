const scryfall = require("scryfall-client");

module.exports = async function (robot) {

  robot.hear(/^!jank ([12345])$/, async (res) => {
    const number = res.match[1]
    let results = ["Fake result"]
    for (i = 0; i < number; i++){
      result = {name: "Fake result"}
      while (results.indexOf(result.name) != -1){
        result = await scryfall.get("/cards/random/", {q: "is:commander"})
      }
      res.send(result.name + " - " + result.uri)
      results.push(result.name)
    }
  });
};
