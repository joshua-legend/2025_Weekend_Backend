const express = require("express");
const cors = require("cors");
const xlsx = require("xlsx");

const app = express();
app.use(cors()); // 다른 url이 들어도록 허용!
app.use(express.json()); // JSON 요청 본문을 허용!

const coffeeXlsx = xlsx.readFile("coffee.xlsx"); // coffee 엑셀 파일
const sheet = coffeeXlsx.Sheets["Sheet2"]; // 시트 이름으로 첫 번째 시트 가져오기
const cakeJson = xlsx.utils.sheet_to_json(sheet); // 시트를 JSON으로 변환

app.get("/", (req, res) => {
  res.send("익스프레스 맛보기!");
});

app.get("/cake", (req, res) => {
  res.json(cakeJson);
});

app.post("/cake", (req, res) => {
  const newCake = req.body;
  cakeJson.push(newCake);
  const newSheet = xlsx.utils.json_to_sheet(cakeJson);
  coffeeXlsx.Sheets["Sheet2"] = newSheet; // 새 시트를 갱신
  xlsx.writeFile(coffeeXlsx, "coffee.xlsx");
  res.json({ message: "데이터 갱신 성공!" });
});

app.listen(3000, () => {
  console.log("서버 실행!");
});
