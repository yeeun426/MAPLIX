// 시작할때 back_end> npm start

const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require('cors');
const bodyParser = require("body-parser");

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
  // let sqlGet = '';
  // // 전체
  // if (req.params.id == '0'){
  //   sqlGet = "SELECT * FROM test.community";
  //   console.log(req.params);
  // // 동행
  // }else if (req.params.id == '1'){
  //   sqlGet = "SELECT * FROM test.community WHERE cm_type = '동행'";
  //   console.log(req.params);
  // // 질문
  // }else if (req.params.id == '2'){
  //   sqlGet = "SELECT * FROM test.community WHERE cm_type = '질문'";
  //   console.log(req.params);
  // // 자유
  // }else if (req.params.id == '3'){
  //   sqlGet = "SELECT * FROM test.community WHERE cm_type = '자유'";
  //   console.log(req.params);
  // }
  db.query(sqlGet, (error, result) => {
    console.log(result);
    res.send(result);
  });
});
// SELECT * FROM test.community WHERE cm_type = "동행";
// SELECT * FROM test.community WHERE cm_type = "질문";
// SELECT * FROM test.community WHERE cm_type = "자유";

app.post("/api/post", (req, res) => {
  const {cm_num, cm_title, cm_content} = req.body;
  const sqlInsert = "INSERT INTO test.community (cm_title, cm_name) VALUES (?, ?)";
  db.query(sqlInsert, [cm_title, cm_content], (error, result) =>{
    if(error){
      console.log(error);
    }
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

app.listen(3001, () => {
  console.log(`running on port 3001`);
});

