const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const menu = {
  icecream: [
    { name: "허니 크런치", kcal: 264, price: 3000 },
    { name: "민트 초콜릿 칩", kcal: 256, price: 2500 },
    { name: "요거트", kcal: 198, price: 3500 },
    { name: "그린티", kcal: 245, price: 4000 },
  ],
  cake: [
    { name: "잔망루피", kcal: 1380, price: 30000 },
    { name: "골라먹는 큐브", kcal: 1640, price: 29000 },
    { name: "구름이 퐁당퐁당", kcal: 1260, price: 26000 },
  ],
  coffee: [
    { name: "아메리카노", kcal: 5, price: 3000 },
    { name: "카페라떼", kcal: 120, price: 3500 },
    { name: "카페모카", kcal: 240, price: 4000 },
  ],
};

app.get("/", (req, res) => {
  res.send("익스프레스 맛보기!");
});

app.get("/icecream", (req, res) => {
  // /icecream?minPrice=2000&maxPrice=3000
  const { minPrice, maxPrice } = req.query;
  if (!minPrice && !maxPrice) res.json(menu.icecream);
  else if (!maxPrice) {
    res.json(menu.icecream.filter((v) => minPrice <= v.price));
  } else if (!minPrice) {
    res.json(menu.icecream.filter((v) => maxPrice >= v.price));
  } else {
    res.json(
      menu.icecream.filter((v) => minPrice <= v.price && v.price <= maxPrice)
    );
  }
});

app.get("/cake", (req, res) => {
  // /cake?name={}
  const { name } = req.query;
  res.json(menu.cake.filter((v) => v.name.includes(name)));
});

app.get("/coffee", (req, res) => {
  res.json(menu.coffee);
});

app.listen(3000, () => {
  console.log("서버 실행!");
});
