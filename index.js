const express = require("express");
const service = express();
service.use(express.json());
const port = 5000;
const fs = require("fs");
const mysql = require("mysql");
const json = fs.readFileSync("credentials.json", "utf8");
const credentials = JSON.parse(json);
const connection = mysql.createConnection(credentials);

connection.connect((error) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }
});



const selectQuery = 'SELECT * FROM guest';
connection.query(selectQuery, (error, rows) => {
  if (error) {
    console.error(error);
  } else {
    console.log(rows);
  }
});
service.listen(port, () => {
  console.log(`We're live on port ${port}!`);
});

// Cross origin requirement
service.use((request, response, next) => {
  response.set('Access-Control-Allow-Origin', '*');
  next();
});
service.options('*', (request, response) => {
  response.set('Access-Control-Allow-Headers', 'Content-Type');
  response.set('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  response.sendStatus(200);
});


//-----------------------------------------------------

// GETs all guests
service.get('/guests', (request, response) => {
  const parameters = [
    request.params
  ];

  const query = 'SELECT * FROM guest ORDER BY id';
  connection.query(query, parameters, (error, rows) => {
    if (error) {
      response.status(500);
      response.json({
        ok: false,
        result: error.message,
      });
    } else {
      response.json({
        ok: true,
        result: rows.map(rowToObject),
      });
      console.log(response);
    }
  });
});

// GETs guest by id number
service.get('/guests/:id', (request, response) => {

  const query = 'SELECT * FROM guest WHERE id = ?';
  const id_get = [parseInt(request.params.id)];
  connection.query(query, id_get, (error, rows) => {
    if (error) {
      response.status(500);
      response.json({
        ok: false,
        result: error.message,
      });
    } else {
      const guest = rows.map(rowToObject);
      response.json({
        ok: true,
        result: rows.map(rowToObject),
      });
      console.log(response);
    }
  });
});

// GETs guest by lastname
service.get('/searchLast/:lastname', (request, response) => {

  const query = 'SELECT * FROM guest WHERE lastname = ?';
  const name_get = request.params.lastname;
  connection.query(query, name_get, (error, rows) => {
    if (error) {
      response.status(500);
      response.json({
        ok: false,
        result: error.message,
      });
    } else {
      const guest = rows.map(rowToObject);
      response.json({
        ok: true,
        result: rows.map(rowToObject),
      });
      console.log(response);
    }
  });
});

// GETs guest by firstname
service.get('/searchFirst/:firstname', (request, response) => {

  const query = 'SELECT * FROM guest WHERE firstname = ?';
  const name_get = request.params.firstname;
  connection.query(query, name_get, (error, rows) => {
    if (error) {
      response.status(500);
      response.json({
        ok: false,
        result: error.message,
      });
    } else {
      const guest = rows.map(rowToObject);
      response.json({
        ok: true,
        result: rows.map(rowToObject),
      });
      console.log(response);
    }
  });
});

// DELETE /guests/id that removes a guest from
// the database. It returns nothing but gives back status code 204, which means
// the operation silently succeeded OR 404 if it failed.
service.delete("/guests/:id", (request, response) => {
  const id_delete = [parseInt(request.params.id)];
  const sql = 'DELETE FROM guest WHERE id = ?';
  console.log(`Deleted:${id_delete}`)
  connection.query(sql, id_delete, (error, result) => {
    if (error) {
      response.status(404);
      response.json({
        ok: false,
        results: error.message,
      });
    } else {
      response.status(204);
      response.json({
        ok: true,
      });
    }
  });
});
// PATCH /guests that accepts a JSON body containing an id and that guest's 
// new first and last name. It returns a JSON structure reporting the new info 
// assigned to the guest.
service.patch("/guests/:id/:firstname/:lastname", (request, response) => {
  const id_update = [parseInt(request.params.id)];
  const firstname_update = request.params.firstname;
  const lastname_update = request.params.lastname;
  const updateQuery = 'UPDATE guest SET firstname = ?, lastname = ? WHERE id = ?';
  const param = [firstname_update, lastname_update, id_update];
  connection.query(updateQuery, param, (error, result) => {
    if(error){
      console.error(error);
    } else {
      response.json({
        ok: true,
        result: {
          id: id_update,
          firstname: firstname_update,
          lastname: lastname_update,
        }
      });
    }
  });
});

// POST /guests that accepts a JSON body containing a new guest's first and last name. 
// It returns a JSON structure reporting the ID assigned to the new
// guest.
service.post("/guests", (request, response) => {
  const { firstname, lastname } = request.body;
  console.log(`Added First:${firstname} Last:${lastname}`)
  const insertQuery = 'INSERT INTO guest(firstname, lastname) VALUES (?, ?)';
  const parameters = [firstname, lastname];
  connection.query(insertQuery, parameters, (error, result) => {
    if (error) {
      console.error(error);
    } else {
      console.log(result);
      response.json({
        ok: true,
        result: {
          id: result.insertId,
          firstname: firstname,
          lastname: lastname,
        }
      });
    }
  });
});



function rowToObject(row) {
  return {
    id: row.id,
    firstName: row.firstname,
    lastName: row.lastname
  };
}