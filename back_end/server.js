const express = require("express");
const app = express();
const mysql = require("mysql");
const PORT = process.env.port || 8000;

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "test",
});


app.get("/", (req, res) => {
  // 데이터베이스에 제대로 들어오는거 확인하면 쿼리문 삭제하세유
  const sqlQuery = "INSERT INTO test.media (m_name, m_name2, m_type) VALUES ('가', '나', '드라마')";
  // ---------------------------------------------------------------------
  db.query(sqlQuery, (err, result) => {
    console.log(err);
    res.send("success!");
  });
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});

