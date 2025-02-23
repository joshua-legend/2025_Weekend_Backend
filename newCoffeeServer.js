const express = require("express");
const cors = require("cors");
const xlsx = require("xlsx");

const app = express();
app.use(cors()); // 다른 url이 들어도록 허용!
app.use(express.json()); // JSON 요청 본문을 허용!

const coffeeXlsx = xlsx.readFile("coffee.xlsx"); // coffee 엑셀 파일
const sheet = coffeeXlsx.Sheets["Sheet1"]; // 시트 이름으로 첫 번째 시트 가져오기
const coffeeJson = xlsx.utils.sheet_to_json(sheet); // 시트를 JSON으로 변환

app.get("/", (req, res) => {
  res.send("익스프레스 맛보기!");
});

app.get("/coffee", (req, res) => {
  res.json(coffeeJson);
});

app.post("/coffee", (req, res) => {
  const newCoffee = req.body; // body로 커피데이터 받기

  coffeeJson.push(newCoffee); // 커피Json에 배열로 추가하기

  const newSheet = xlsx.utils.json_to_sheet(coffeeJson); // json을 새시트 바꾸기

  coffeeXlsx.Sheets["Sheet1"] = newSheet; // 새 시트를 갱신

  xlsx.writeFile(coffeeXlsx, "coffee.xlsx"); // 새 엑셀을 coffee.xlsx 갈아끼우기

  res.json({ message: "새로운 데이터 갱신" });
});

app.listen(3000, () => {
  console.log("서버 실행!");
});
