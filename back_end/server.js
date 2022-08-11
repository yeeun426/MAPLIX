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

// 미디어 이름 검색시 
// 미디어 이름을 media에서 m_name, m_name2로 먼저 찾고, m_num을 받아와서
// location에서 m_num이 위와 같은것의 p_num, description, l_image 받아옴 
// 그 p_num을 place에서 찾아오기

app.get("/api/search/title", (req, res) => {
  const params = "%" + req.query.media + "%";
  //let sqlGet = "SELECT * FROM `test`.`media` WHERE `m_name2` LIKE ? OR `m_name` LIKE ?";
  let sqlGet = "SELECT L.*, P.p_name, P.p_num, P.address, P.category, M.m_name FROM test.location AS L "; 
  sqlGet += "JOIN test.place AS P ON L.p_num = P.p_num JOIN test.media AS M ON L.m_num = M.m_num "; 
  sqlGet += "WHERE L.m_num = any (SELECT media.m_num FROM test.media WHERE media.m_name LIKE ? OR media.m_name2 LIKE ?) ";
  
  console.log('params = '+ params);

  db.query(sqlGet, [params, params], (error, result) => {
    if (error) {
      console.log('Error: ' + error);
    }
    res.send(result);
    console.log(result);
  });
});

//지역 검색시 
app.get("/api/search/area", (req, res) => {
  const params = "%" + req.query.media + "%";
  let sqlGet = "SELECT * FROM test.location AS L "; 
  sqlGet += " JOIN test.media AS M ON L.m_num = M.m_num JOIN test.place AS P ON P.p_num = L.p_num ";
  sqlGet += " WHERE L.p_num = any (SELECT place.p_num FROM test.place WHERE place.address LIKE ? ) " ;

  console.log('params = '+ params);

  db.query(sqlGet, params, (error, result) => {
    if (error) {
      console.log('Error: ' + error);
    }
    res.send(result);
    console.log(result);
  });
});


// 카테고리 선택하면


// 장소명(p_name <- test.place), 주소(address <- test.place) (location과 p_num으로 조인)
// 드라마명(m_name <- media) (location과 m_num으로 조인)
app.get("/api/likelist", (req, res) => {
  const id = req.body.id;
  console.log(id);
  // 현재 로그인한 id를 user에서 찾고, likelist에서 그 id가 좋아요한 장소 num ( l_num )
  let sqlGet = " SELECT L.*, m_name, m_type, p_name, address FROM test.location As L ";
  sqlGet += "JOIN test.place AS P ON L.l_num = P.p_num JOIN test.media AS M ON L.l_num = M.m_num ";
  sqlGet += "WHERE L.l_num = any (SELECT l_num FROM test.likelist WHERE likelist.id = '?') ";
  // location (미디어num, 장소num)에서 미디어 num
  db.query(sqlGet, [id], (error, result) => {
    console.log(result);
    res.send(result);
  });
});

app.get("/api/mycourse", (req, res) => {
  const sqlGet = "SELECT * FROM test.mycourse WHERE id='예은'";
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

app.post("/checkid", (req, res) => {
  const id = req.body.id;
  console.log(req.body.id);
  
  const check_id = "SELECT id FROM test.user WHERE id=?"

  db.query(check_id, [id], (error, result) => {
    console.log(result);
    let check_id = new Object();
    check_id.tf = false;

    if (result[0] == undefined) { // 중복 X
      check_id.tf = true;
      res.send(check_id)
      console.log(check_id.id);
    }
    else {
      check_id.tf = false;
      res.send(check_id);
      console.log(check_id.id);
    }
  });
});

app.post("/checknickname", (req, res) => {
  const nick_name = req.body.nick_name;
  console.log(req.body.nick_name);
  
  const check_nick_name = "SELECT nick_name FROM test.user WHERE nick_name=?"

  db.query(check_nick_name, [nick_name], (error, result) => {
    console.log(result);
    let check_nick_name= new Object();
    check_nick_name.tf = false;

    if (result[0] == undefined) { // 중복 X
      check_nick_name.tf = true;
      res.send(check_nick_name)
    }
    else {
      check_nick_name.tf = false;
      res.send(check_nick_name);
    }
  });
});

app.post("/signup", (req, res) => {
  const email = req.body.email;
  const id = req.body.id;
  const pw = req.body.pw;
  const u_name = req.body.u_name;
  const birth = req.body.birth;
  const gender = req.body.gender;
  const nick_name = req.body.nick_name;

  console.log(email, id, pw, u_name, birth, gender, nick_name);

  const sqlQuery = "INSERT INTO user(id, pw, u_name, birth, gender, nick_name, email) VALUES (?,?,?,?,?,?,?);";
  db.query(sqlQuery, [id, pw, u_name, birth, gender, nick_name, email], (err, result) => {
    res.send('success!'); 
    console.log(result)
});
});

app.post("/login", (req, res) => {
  const id = req.body.id;
  const pw = req.body.pw;

  let user_info = new Object();
  user_info.tf = true;

  console.log(id);

  const sqlQueryId = "SELECT id FROM user WHERE id=?;";

  // const sqlQuery = "SELECT COUNT(id) as result FROM user WHERE id=?;";
  db.query(sqlQueryId, [id], (err, result) => {
    if (result[0] == undefined) { // 아이디 존재 X
      user_info.tf = false;
      res.send(user_info);
    }
    else {
      const sqlQueryPw = "SELECT pw, nick_name FROM user WHERE id=?;";
      db.query(sqlQueryPw, [id], (err, resultPw) => {
          user_info.tf = true;
          user_info.id = result[0].id;
          user_info.pw = resultPw[0].pw;
          user_info.nick_name = resultPw[0].nick_name;
          res.send(user_info);
      })
    }
  })
});



app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
