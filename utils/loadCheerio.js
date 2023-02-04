const cheerio = require("cheerio");
const got = require("got");

function loadCheerio(link, callBack) {
  got(link)
    .then((result) => {
      const $ = cheerio.load(result.body);
      callBack($);
    })
    .catch((err) => {
      console.log(err + link);
    });
}
module.exports = { loadCheerio };
