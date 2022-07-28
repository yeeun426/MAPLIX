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

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));


app.get("/api/community", (req, res) => {
  const sqlGet = "SELECT * FROM test.community";
  db.query(sqlGet, (error, result) => {
    res.send(result.reverse());
  });
});


// 장소명(p_name <- test.place), 주소(address <- test.place) (location과 p_num으로 조인)
// 드라마명(m_name <- media) (location과 m_num으로 조인)
app.get("/api/likelist", (req, res) => {
  // 현재 로그인한 id를 user에서 찾고, likelist에서 그 id가 좋아요한 장소 num ( l_num )
  let sqlGet = " SELECT L.*, m_name, m_type, p_name, address FROM test.location As L ";
  sqlGet += "JOIN test.place AS P ON L.l_num = P.p_num JOIN test.media AS M ON L.l_num = M.m_num ";
  sqlGet += "WHERE L.l_num = any (SELECT l_num FROM test.likelist WHERE likelist.id = 'heesoo') ";
  // location (미디어num, 장소num)에서 미디어 num
  db.query(sqlGet, (error, result) => {
    console.log(result);
    res.send(result);
  });
});

app.get("/api/mycourse", (req, res) => {
  const sqlGet = "SELECT * FROM test.mycourse WHERE id='heesoo'";
  db.query(sqlGet, (error, result) => {
    res.send(result.reverse());
  });
});
// app.post("/insert", (req, res) => {
//   const { cm_title } = req.body;
//   const { cm_content } = req.body;
  
//   let sqlInsert = "INSERT INTO test.community (cm_title, cm_name) VALUES (?, ?)";
//   db.query(sqlInsert, [cm_title, cm_content], (err, result) => {
//     res.send(result);
//   });
// });


// app.get("/", (req, res) => {
//   // 데이터베이스에 제대로 들어오는거 확인하면 쿼리문 삭제하세유
//   const sqlQuery = "INSERT INTO test.media (m_name, m_name2, m_type) VALUES ('가', '나', '드라마')";
//   // ---------------------------------------------------------------------
//   db.query(sqlQuery, (err, result) => {
//     console.log(err);
//     res.send("success!");
//   });
// });


app.get("/", (req, res) => {
  // 데이터베이스에 제대로 들어오는거 확인하면 쿼리문 삭제하세유
  // const sqlQuery = "INSERT INTO test.media (m_name, m_name2, m_type) VALUES ('가', '나', '드라마')";
  // ---------------------------------------------------------------------
  db.query(sqlQuery, (err, result) => {
    console.log(err);
    res.send("success!");
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

app.post("/mypage/request", (req, res) =>{
  const media_name = req.body.media_name; 
  const r_content = req.body.r_content;
  const id = req.body.id; 
  const m_type = req.body.m_type; 
  const r_image = req.body.r_image; 
  

  const sqlQuery = "INSERT INTO `test`.`request` (`media_name`, `r_content`, `id`, `m_type`, `r_image`) VALUES (?,?,?,?,?);";
  db.query(sqlQuery, [media_name, r_content, id, m_type, r_image], (err, result) => {
      res.send('success!'); 
  });
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});

