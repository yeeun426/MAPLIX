const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const PORT = process.env.port || 8000;

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "test",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  // 데이터베이스에 제대로 들어오는거 확인하면 쿼리문 삭제하세유
  // const sqlQuery = "INSERT INTO test.media (m_name, m_name2, m_type) VALUES ('가', '나', '드라마')";
  // ---------------------------------------------------------------------
  db.query(sqlQuery, (err, result) => {
    console.log(err);
    res.send("success!");
  });
});

app.get("/community", (req, res) => {
  const sqlQuery = "SELECT * FROM test.community;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

app.post("/community/writepost", (req, res) =>{
  const cm_title = req.body.cm_title; 
  const cm_content = req.body.cm_content;
  const writer = req.body.writer; 
  const cm_type = req.body.cm_type; 
  const cm_image = req.body.cm_image; 
  

  const sqlQuery = "INSERT INTO `test`.`community` (`cm_title`, `cm_content`, `writer`, `cm_type`, `cm_image`) VALUES (?,?,?,?,?);";
  db.query(sqlQuery, [cm_title, cm_content, writer, cm_type, cm_image], (err, result) => {
      res.send('success!'); 
  });
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});

