const { loadCheerio } = require("./utils/loadCheerio");
const fs = require("fs");

const URL = "https://www.nature.com/articles/s41598-023-28880-x";
loadCheerio(URL, ($) => {
  const title = $(".c-article-title").text().toString();
  let abstract = $("#Abs1-content").text().toString();
  const abstractCount = abstract.split(" ").length; //Total words in the Abstract
  const bodyContent = $(".main-content").text().toString();
  const noOfWords = bodyContent.split(" ").length;
  const noOfPics = $(".main-content").find("img").length;
  const refCont = $(".c-article-references__text"); //All the refrences with the text and the links
  const refText = [],
    refLink = [];

  refCont.each((i, el) => {
    refText.push($(el).text());
    const link = $(el).find("a").text() || " "; //Passes Empty String if no Link is Available
    refLink.push(link);
  });

  const paperStatsCSVData = [
    ["Title", "No Of Words in Abstract", "No of Words in Body", "Total Images"],
    [title, abstractCount, noOfWords, noOfPics],
  ];

  const referencesCSVData = [["Text", "Link"]];

  refText.forEach((el, i) => {
    referencesCSVData.push([el, refLink[i]]);
  });

  const paperStatscsvString = paperStatsCSVData
    .map((row) => `"${row.join('","')}"`)
    .join("\n"); //Formatting For CSV File

  const referencescsvString = referencesCSVData
    .map((row) => `"${row.join('","')}"`)
    .join("\n");

  fs.writeFileSync("paper_stats.csv", paperStatscsvString);
  fs.writeFileSync("references.csv", referencescsvString);
});
