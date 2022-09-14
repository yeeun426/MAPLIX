const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const PORT = 8000;

// const corsOptions = {
//   origin: 'http://localhost:8000'
// }

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "test",
    dateStrings:"date"
});

const multer = require('multer');
const upload = multer({dest : './upload'})

app.use('/image', express.static('./upload'))

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
  let sqlGet = "SELECT L.l_num, L.description, L.l_image, P.p_name, P.p_num, P.address, P.category, P.p_y, P.p_x, M.m_name FROM test.location AS L "; 
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
  let sqlGet = "SELECT L.*, P.p_name, P.p_num, P.address, P.category, P.p_y, P.p_x, M.m_name FROM test.location AS L "; 
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

app.get("/api/search", (req, res) => {
  const sqlGet = "SELECT * FROM test.place";
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});


// 카테고리 선택하면


// 장소명(p_name <- test.place), 주소(address <- test.place) (location과 p_num으로 조인)
// 드라마명(m_name <- media) (location과 m_num으로 조인)
app.post("/api/likelist", (req, res) => {
  const id = req.body.id;
  console.log(id)
  // 현재 로그인한 id를 user에서 찾고, likelist에서 그 id가 좋아요한 장소 num ( l_num )
  let sqlGet = " SELECT L.*, m_name, m_type, p_name, address, category, P.p_y, P.p_x FROM test.location As L ";
  sqlGet += "JOIN test.place AS P ON L.l_num = P.p_num JOIN test.media AS M ON L.l_num = M.m_num ";
  sqlGet += "WHERE L.l_num = any (SELECT l_num FROM test.likelist WHERE likelist.id = ?) ";
  // location (미디어num, 장소num)에서 미디어 num
  db.query(sqlGet, [id], (error, result) => {
    console.log(error)
    console.log(result);
    res.send(result);
  });
});

app.get('/api/course', (req, res) => {
  const id = req.body.id;
  // 즐겨찾기 값
  let sqlGet = " SELECT * FROM test.location As L ";
  sqlGet += "JOIN test.place AS P ON L.l_num = P.p_num JOIN test.media AS M ON L.l_num = M.m_num ";
  sqlGet += "WHERE L.l_num = any (SELECT l_num FROM test.likelist WHERE likelist.id = ?) ";
  sqlGet += "UNION";
  sqlGet = "SELECT * FROM test.location AS L "; 
  sqlGet += " JOIN test.media AS M ON L.m_num = M.m_num JOIN test.place AS P ON P.p_num = L.p_num ";
  sqlGet += " WHERE L.p_num = any (SELECT place.p_num FROM test.place WHERE place.category = '관광지' ) " ;
})

app.post("/api/mycourse", (req, res) => {
  const id = req.body.id;

  const sqlGet = "SELECT * FROM test.mycourse WHERE id = ?";
  
  db.query(sqlGet, [id], (error, result) => {
    // res.send(result.reverse());
    res.send(result);
  });
});

// mycourse 생성
app.post("/api/coursecreate", (req, res) => {
  const id = req.body.id;
  const mc_title = req.body.mc_title;
  const mc_content = req.body.mc_content;
  const count = req.body.count;
  const course1 = req.body.course1;
  const course2 = req.body.course2;
  const course3 = req.body.course3;
  const course4 = req.body.course4;
  const course5 = req.body.course5;
  const course6 = req.body.course6;
  const course7 = req.body.course7;
  const course8 = req.body.course8;
  const course9 = req.body.course9;

  if (count == 1) {
    const my_course = course1;
    const sqlQuery =  "INSERT INTO test.mycourse (id, my_course, mc_title, mc_content) VALUES (?, ?, ?, ?)"
    // db.query(sqlQuery, [record_title_var, record_title, record_content_var, record_content, id, m_num, poster], (err, result) => {
    db.query(sqlQuery, [id, my_course, mc_title, mc_content], (err, result) => {
      console.log(result);
      res.send(result);
    })
  }
  else if (count == 2) {
    const my_course = course1 + "/" + course2;
    const sqlQuery =  "INSERT INTO test.mycourse (id, my_course, mc_title, mc_content) VALUES (?, ?, ?, ?)"
    // db.query(sqlQuery, [record_title_var, record_title, record_content_var, record_content, id, m_num, poster], (err, result) => {
    db.query(sqlQuery, [id, my_course, mc_title, mc_content], (err, result) => {
      console.log(result);
      res.send(result);
    })
  }
  else if (count == 3) {
    const my_course = course1 + "/" + course2 + "/" + course3;
    const sqlQuery =  "INSERT INTO test.mycourse (id, my_course, mc_title, mc_content) VALUES (?, ?, ?, ?)"
    // db.query(sqlQuery, [record_title_var, record_title, record_content_var, record_content, id, m_num, poster], (err, result) => {
    db.query(sqlQuery, [id, my_course, mc_title, mc_content], (err, result) => {
      console.log(result);
      res.send(result);
    })
  }
  else if (count == 4) {
    const my_course = course1 + "/" + course2 + "/" + course3 + "/" + course4;
    const sqlQuery =  "INSERT INTO test.mycourse (id, my_course, mc_title, mc_content) VALUES (?, ?, ?, ?)"
    // db.query(sqlQuery, [record_title_var, record_title, record_content_var, record_content, id, m_num, poster], (err, result) => {
    db.query(sqlQuery, [id, my_course, mc_title, mc_content], (err, result) => {
      console.log(result);
      res.send(result);
    })
  }
  else if (count == 5) {
    const my_course = course1 + "/" + course2 + "/" + course3 + "/" + course4 + "/" + course5;
    const sqlQuery =  "INSERT INTO test.mycourse (id, my_course, mc_title, mc_content) VALUES (?, ?, ?, ?)"
    // db.query(sqlQuery, [record_title_var, record_title, record_content_var, record_content, id, m_num, poster], (err, result) => {
    db.query(sqlQuery, [id, my_course, mc_title, mc_content], (err, result) => {
      console.log(result);
      res.send(result);
    })
  }
  else if (count == 6) {
    const my_course = course1 + "/" + course2 + "/" + course3 + "/" + course4 + "/" + course5 + "/" + course6;
    const sqlQuery =  "INSERT INTO test.mycourse (id, my_course, mc_title, mc_content) VALUES (?, ?, ?, ?)"
    // db.query(sqlQuery, [record_title_var, record_title, record_content_var, record_content, id, m_num, poster], (err, result) => {
    db.query(sqlQuery, [id, my_course, mc_title, mc_content], (err, result) => {
      console.log(result);
      res.send(result);
    })
  }
  else if (count == 7) {
    const my_course = course1 + "/" + course2 + "/" + course3 + "/" + course4 + "/" + course5 + "/" + course6 + "/" + course7;

    const sqlQuery =  "INSERT INTO test.mycourse (id, my_course, mc_title, mc_content) VALUES (?, ?, ?, ?)"
    // db.query(sqlQuery, [record_title_var, record_title, record_content_var, record_content, id, m_num, poster], (err, result) => {
    db.query(sqlQuery, [id, my_course, mc_title, mc_content], (err, result) => {
      console.log(result);
      res.send(result);
    })
  }
  else if (count == 8) {
    const my_course = course1 + "/" + course2 + "/" + course3 + "/" + course4 + "/" + course5 + "/" + course6 + "/" + course7 + "/" + course8;

    const sqlQuery =  "INSERT INTO test.mycourse (id, my_course, mc_title, mc_content) VALUES (?, ?, ?, ?)"
    // db.query(sqlQuery, [record_title_var, record_title, record_content_var, record_content, id, m_num, poster], (err, result) => {
    db.query(sqlQuery, [id, my_course, mc_title, mc_content], (err, result) => {
      console.log(result);
      res.send(result);
    })
  }

  else if (count == 9) {
    const my_course = course1 + "/" + course2 + "/" + course3 + "/" + course4 + "/" + course5 + "/" + course6 + "/" + course7 + "/" + course8 + "/" + course9;

    const sqlQuery =  "INSERT INTO test.mycourse (id, my_course, mc_title, mc_content) VALUES (?, ?, ?, ?)"
    // db.query(sqlQuery, [record_title_var, record_title, record_content_var, record_content, id, m_num, poster], (err, result) => {
    db.query(sqlQuery, [id, my_course, mc_title, mc_content], (err, result) => {
      console.log(result);
      res.send(result);
    })
  }

});

app.post("/api/coursecreateimg", upload.single('image'), (req, res) => {
  const id = req.body.id;
  const mc_title = req.body.mc_title;
  const mc_content = req.body.mc_content;
  const count = req.body.count;
  const course1 = req.body.course1;
  const course2 = req.body.course2;
  const course3 = req.body.course3;
  const course4 = req.body.course4;
  const course5 = req.body.course5;
  const course6 = req.body.course6;
  const course7 = req.body.course7;
  const course8 = req.body.course8;
  const course9 = req.body.course9;
  const mc_image = '/image/' + req.file.filename; 

  if (count == 1) {
    const my_course = course1;
    const sqlQuery =  "INSERT INTO test.mycourse (id, my_course, mc_title, mc_content, mc_image) VALUES (?, ?, ?, ?, ?)"
    // db.query(sqlQuery, [record_title_var, record_title, record_content_var, record_content, id, m_num, poster], (err, result) => {
    db.query(sqlQuery, [id, my_course, mc_title, mc_content, mc_image], (err, result) => {
      console.log(result);
      res.send(result);
    })
  }
  else if (count == 2) {
    const my_course = course1 + "/" + course2;
    const sqlQuery =  "INSERT INTO test.mycourse (id, my_course, mc_title, mc_content, mc_image) VALUES (?, ?, ?, ?, ?)"
    // db.query(sqlQuery, [record_title_var, record_title, record_content_var, record_content, id, m_num, poster], (err, result) => {
    db.query(sqlQuery, [id, my_course, mc_title, mc_content, mc_image], (err, result) => {
      console.log(result);
      res.send(result);
    })
  }
  else if (count == 3) {
    const my_course = course1 + "/" + course2 + "/" + course3;
    const sqlQuery =  "INSERT INTO test.mycourse (id, my_course, mc_title, mc_content, mc_image) VALUES (?, ?, ?, ?, ?)"
    // db.query(sqlQuery, [record_title_var, record_title, record_content_var, record_content, id, m_num, poster], (err, result) => {
    db.query(sqlQuery, [id, my_course, mc_title, mc_content, mc_image], (err, result) => {
      console.log(result);
      res.send(result);
    })
  }
  else if (count == 4) {
    const my_course = course1 + "/" + course2 + "/" + course3 + "/" + course4;
    const sqlQuery =  "INSERT INTO test.mycourse (id, my_course, mc_title, mc_content, mc_image) VALUES (?, ?, ?, ?, ?)"
    // db.query(sqlQuery, [record_title_var, record_title, record_content_var, record_content, id, m_num, poster], (err, result) => {
    db.query(sqlQuery, [id, my_course, mc_title, mc_content, mc_image], (err, result) => {
      console.log(result);
      res.send(result);
    })
  }
  else if (count == 5) {
    const my_course = course1 + "/" + course2 + "/" + course3 + "/" + course4 + "/" + course5;
    const sqlQuery =  "INSERT INTO test.mycourse (id, my_course, mc_title, mc_content, mc_image) VALUES (?, ?, ?, ?, ?)"
    // db.query(sqlQuery, [record_title_var, record_title, record_content_var, record_content, id, m_num, poster], (err, result) => {
    db.query(sqlQuery, [id, my_course, mc_title, mc_content, mc_image], (err, result) => {
      console.log(result);
      res.send(result);
    })
  }
  else if (count == 6) {
    const my_course = course1 + "/" + course2 + "/" + course3 + "/" + course4 + "/" + course5 + "/" + course6;
    const sqlQuery =  "INSERT INTO test.mycourse (id, my_course, mc_title, mc_content, mc_image) VALUES (?, ?, ?, ?, ?)"
    // db.query(sqlQuery, [record_title_var, record_title, record_content_var, record_content, id, m_num, poster], (err, result) => {
    db.query(sqlQuery, [id, my_course, mc_title, mc_content, mc_image], (err, result) => {
      console.log(result);
      res.send(result);
    })
  }
  else if (count == 7) {
    const my_course = course1 + "/" + course2 + "/" + course3 + "/" + course4 + "/" + course5 + "/" + course6 + "/" + course7;

    const sqlQuery =  "INSERT INTO test.mycourse (id, my_course, mc_title, mc_content, mc_image) VALUES (?, ?, ?, ?, ?)"
    // db.query(sqlQuery, [record_title_var, record_title, record_content_var, record_content, id, m_num, poster], (err, result) => {
    db.query(sqlQuery, [id, my_course, mc_title, mc_content, mc_image], (err, result) => {
      console.log(result);
      res.send(result);
    })
  }
  else if (count == 8) {
    const my_course = course1 + "/" + course2 + "/" + course3 + "/" + course4 + "/" + course5 + "/" + course6 + "/" + course7 + "/" + course8;

    const sqlQuery =  "INSERT INTO test.mycourse (id, my_course, mc_title, mc_content, mc_image) VALUES (?, ?, ?, ?, ?)"
    // db.query(sqlQuery, [record_title_var, record_title, record_content_var, record_content, id, m_num, poster], (err, result) => {
    db.query(sqlQuery, [id, my_course, mc_title, mc_content, mc_image], (err, result) => {
      console.log(result);
      res.send(result);
    })
  }

  else if (count == 9) {
    const my_course = course1 + "/" + course2 + "/" + course3 + "/" + course4 + "/" + course5 + "/" + course6 + "/" + course7 + "/" + course8 + "/" + course9;

    const sqlQuery =  "INSERT INTO test.mycourse (id, my_course, mc_title, mc_content, mc_image) VALUES (?, ?, ?, ?, ?)"
    // db.query(sqlQuery, [record_title_var, record_title, record_content_var, record_content, id, m_num, poster], (err, result) => {
    db.query(sqlQuery, [id, my_course, mc_title, mc_content, mc_image], (err, result) => {
      console.log(result);
      res.send(result);
    })
  }

});

app.get("/api", (req, res) => {
  // 데이터베이스에 제대로 들어오는거 확인하면 쿼리문 삭제하세유
  const sqlQuery = "INSERT INTO test.media (m_name, m_name2, m_type) VALUES ('다', '라', '드라마')";
  // ---------------------------------------------------------------------
  res.setHeader('Access-Control-Allow-origin', 'https://localhost');

  db.query(sqlQuery, (err, result) => {
    console.log(err);
    res.send("success!");
  });
});

app.post("/api/media", (req, res) => {
  const m_type = req.body.m_type;

  const sqlQuery = "SELECT * FROM test.media WHERE m_type = ?"

  db.query(sqlQuery, [m_type], (err, result) => {
    console.log(result);
    res.send(result);
  });
});

app.post("/api/community/writepost", (req, res) =>{
  const cm_title = req.body.cm_title; 
  const cm_content = req.body.cm_content;
  const writer = req.body.writer; 
  const cm_type = req.body.cm_type; 
  

  const sqlQuery = "INSERT INTO `test`.`community` (`cm_title`, `cm_content`, `writer`, `cm_type`) VALUES (?,?,?,?);";
  db.query(sqlQuery, [cm_title, cm_content, writer, cm_type], (err, result) => {
      res.send('success!'); 
  });
});

app.post("/api/community/writepostimg", upload.single('image'), (req, res) =>{
  const cm_title = req.body.cm_title; 
  const cm_content = req.body.cm_content;
  const writer = req.body.writer; 
  const cm_type = req.body.cm_type; 
  const cm_image = '/image/' + req.file.filename; 
  

  const sqlQuery = "INSERT INTO `test`.`community` (`cm_title`, `cm_content`, `writer`, `cm_type`, `cm_image`) VALUES (?,?,?,?,?);";
  db.query(sqlQuery, [cm_title, cm_content, writer, cm_type, cm_image], (err, result) => {
      res.send(result); 
  });
});



app.post("/api/mypage/requestimg", upload.single('image'), (req, res) =>{
  const media_name = req.body.media_name; 
  const r_content = req.body.r_content;
  const id = req.body.id; 
  const m_type = req.body.m_type; 
  const r_image = '/image/' + req.file.filename; 
  // const r_image = req.file.file; 
  // const fd = req.body.fd;
  
  // console.log(media_name, fd);

  const sqlQuery = "INSERT INTO `test`.`request` (`media_name`, `r_content`, `id`, `m_type`, r_image) VALUES (?,?,?,?,?);";
  db.query(sqlQuery, [media_name, r_content, id, m_type, r_image], (err, result, fields) => {
      res.send(result); 
      console.log(result)
  });
});


app.post("/api/mypage/request", (req, res) =>{
  const media_name = req.body.media_name; 
  const r_content = req.body.r_content;
  const id = req.body.id; 
  const m_type = req.body.m_type; 

  const sqlQuery = "INSERT INTO `test`.`request` (`media_name`, `r_content`, `id`, `m_type`) VALUES (?,?,?,?);";
  db.query(sqlQuery, [media_name, r_content, id, m_type], (err, result) => {
      res.send('success!'); 
  });
});

app.post("/api/checkid", (req, res) => {
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

app.post("/api/checknickname", (req, res) => {
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

app.post("/api/post/likelist", (req, res) => {
  const id = req.body.id;
  const l_num = req.body.l_num;

  console.log(id, l_num)
  const sqlQuery = "INSERT INTO test.likelist (id, l_num) VALUES (?, ?)";
  db.query(sqlQuery, [id, l_num], (err, result) => {
    res.send('즐겨찾기에 추가되었습니다'); 
    console.log(result)
});
})

app.post("/api/post/likelistcheck", (req, res) => {
  const id = req.body.id;
  const l_num = req.body.l_num;

  console.log(id, l_num)
  const sqlQuery = "SELECT * FROM test.likelist WHERE id = ? AND l_num = ?";
  db.query(sqlQuery, [id, l_num], (err, result) => {
    res.send(result); 
    console.log(result)
});
})

app.post("/api/post/deletelikelist", (req, res) => {
  const id = req.body.id;
  const l_num = req.body.l_num;

  console.log(id, l_num)
  const sqlQuery = "DELETE FROM test.likelist WHERE id = ? AND l_num = ?";
  db.query(sqlQuery, [id, l_num], (err, result) => {
    res.send('즐겨찾기에서 삭제되었습니다.'); 
    console.log(result)
});
})

app.post("/signup", (req, res) => {
  const email = req.body.email;
  const id = req.body.id;
  const pw = req.body.pw;
  const u_name = req.body.u_name;
  const birth = req.body.birth;
  const gender = req.body.gender;
  const nick_name = req.body.nick_name;

  console.log(email, id, pw, u_name, birth, gender, nick_name);

  const sqlQuery = "INSERT INTO test.test.user(id, pw, u_name, birth, gender, nick_name, email) VALUES (?,?,?,?,?,?,?);";
  db.query(sqlQuery, [id, pw, u_name, birth, gender, nick_name, email], (err, result) => {
    res.send('success!'); 
    console.log(result)
});
});

app.post("/api/login", (req, res) => {
  const id = req.body.id;
  const pw = req.body.pw;

  let user_info = new Object();
  user_info.tf = true;

  console.log(id);

  let sqlQueryId = "SELECT id FROM test.user WHERE id= ?;";

  // const sqlQuery = "SELECT COUNT(id) as result FROM user WHERE id=?;";
  db.query(sqlQueryId, [id], (err, result) => {
    if (result[0] == undefined) { // 아이디 존재 X
      user_info.tf = false;
      res.send(user_info);
    }
    else {
      const sqlQueryPw = "SELECT pw, nick_name FROM test.user WHERE id=?;";
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

app.post("/api/stamp", (req, res) => {
  const id = req.body.id;
  const m_type = req.body.m_type;
  const media_name = "%"  + req.body.media_name + "%";

  console.log(id, m_type, media_name)
  // media 테이블에서 m_type, media_name에 해당하는 m_num을 가져와서 stamp 테이블에서 검색하기
  const sqlQuery = "SELECT * FROM test.stamp as S Join test.media as M ON S.m_num = M.m_num WHERE S.m_num = any (SELECT M.m_num FROM test.stamp as S, test.media as M WHERE S.id = ? AND M.m_type = ? AND (M.m_name like ? OR M.m_name2 like ?));";
  // media 테이블에서 m_type, media_name에 해당하는 poster 불러오기
  // const sqlQuery = "SELECT * FROM test.stamp WHERE m_type = ? AND media_name =?;";
  
  db.query(sqlQuery, [id, m_type, media_name, media_name], (error, result) => {
    console.log(result);
    res.send(result);
  });
});

app.get("/poster", (req, res) => {
  const id = 'jisu';

  for (i = 4; i < 206; i++) {
    const poster = 'poster' + i;
    const m_num = i;
    const sqlQuery = "INSERT INTO test.stamp (id, m_num, poster) VALUES (?, ?, ?);";
  
    db.query(sqlQuery, [id, m_num, poster], (error, result) => {
      console.log(result);
  });
  }
  // media 테이블에서 m_type, media_name에 해당하는 m_num을 가져와서 stamp 테이블에서 검색하기
  
});

// 도장깨기 글쓰기
app.post("/api/writestamp", upload.single("image"), (req, res) => {
  const id = req.body.id;
  const m_num = req.body.m_num;
  const poster = req.body.poster;
  // const record_title_var = "record_title" + req.body.part;
  // const record_content_var = "record_content" + req.body.part;
  const record_title = req.body.record_title;
  const record_content = req.body.record_content;
  const part = req.body.part;
  const record_image = "/image/" + req.file.filename;
  
  console.log(id, m_num, poster, record_content, record_title);

  if (part == 1) {
    const sqlQuery =  "UPDATE test.stamp SET record_title1 = ?, record_content1 = ?, record_image1 = ? WHERE id = ? AND m_num = ? AND poster = ?;"
    // db.query(sqlQuery, [record_title_var, record_title, record_content_var, record_content, id, m_num, poster], (err, result) => {
    db.query(sqlQuery, [record_title, record_content, record_image, id, m_num, poster], (err, result) => {
      console.log(result);
      res.send(result);
    })
  }
  else if (part == 2) {
    const sqlQuery =  "UPDATE test.stamp SET record_title2 = ?, record_content2 = ?, record_image2 = ? WHERE id = ? AND m_num = ? AND poster = ?;"
    // db.query(sqlQuery, [record_title_var, record_title, record_content_var, record_content, id, m_num, poster], (err, result) => {
    db.query(sqlQuery, [record_title, record_content, record_image, id, m_num, poster], (err, result) => {
      console.log(result);
      res.send(result);
    })
  }
  else if (part == 3) {
    const sqlQuery =  "UPDATE test.stamp SET record_title3 = ?, record_content3 = ?, record_image3 = ? WHERE id = ? AND m_num = ? AND poster = ?;"
    // db.query(sqlQuery, [record_title_var, record_title, record_content_var, record_content, id, m_num, poster], (err, result) => {
    db.query(sqlQuery, [record_title, record_content, record_image, id, m_num, poster], (err, result) => {
      console.log(result);
      res.send(result);
    })
  }
  else if (part == 4) {
    const sqlQuery =  "UPDATE test.stamp SET record_title4 = ?, record_content4 = ?, record_image4 = ? WHERE id = ? AND m_num = ? AND poster = ?;"
    // db.query(sqlQuery, [record_title_var, record_title, record_content_var, record_content, id, m_num, poster], (err, result) => {
    db.query(sqlQuery, [record_title, record_content, record_image, id, m_num, poster], (err, result) => {
      console.log(result);
      res.send(result);
    })
  }  
})

app.post("/api/stampcheck", (req, res) => {
  const id = req.body.id;
  const m_num = req.body.m_num;
  const poster = req.body.poster;
  const part = req.body.num;

  const sqlQuery =  "SELECT * FROM test.stamp WHERE id = ? AND m_num = ? AND poster = ?;"
  db.query(sqlQuery, [id, m_num, poster], (err, result) => {
    console.log(result);
    res.send(result);
  })  
})


app.get("/api/locationimage", (req, res) => {
  var Folder = '../front_end/public/location/';
      var fs = require('fs');
  
      fs.readdir(Folder, function(error, filelist){
        console.log(filelist);
        res.send(filelist);
  })
})

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
