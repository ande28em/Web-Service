const express = require("express");
const service = express();
service.use(express.json());
const port = 5000;
const WTF = 10; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt#description

const fs = require("fs");
const mysql = require("mysql");

// Parse credentials
const json = fs.readFileSync("credentials.json", "utf8");
const credentials = JSON.parse(json);

// Connect with database
const connection = mysql.createConnection(credentials);
connection.connect((error) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }
});

// Cross origin requirement
service.use((request, response, next) => {
  response.set('Access-Control-Allow-Origin', '*');
  next();
});

// // TODO: issue queries.

// Guest list
let guestNextId = 1;
const guests = {
  [guestNextId]: {
    id: guestNextId++,
    firstname: "Eric",
    lastname: "Anderson",
  },
  [guestNextId]: {
    id: guestNextId++,
    firstname: "Brantley",
    lastname: "Cevarich",
  },
};

// Open port
service.listen(port, () => {
  console.log(`We're live on port ${port}!`);
});

// ----------------- CRUD Functions ----------------

// POST /guests that accepts a JSON body containing a new guest's first and last name. 
// It returns a JSON structure reporting the ID assigned to the new
// guest.
service.post("/guests", (req, resp) => {

  const { firstname, lastname } = req.body;
  console.log(`Added First:${firstname} Last:${lastname}`)
  const insertQuery = 'INSERT INTO guest(firstname, lastname) VALUES (?, ?)';
  const parameters = [firstname, lastname];

  connection.query(insertQuery, parameters, (error, result) => {
    if (error) {
      console.error(error);
    } else {
      console.log(result);
      resp.json({
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

// GET /get/:id that returns as JSON an object with the guests first and last name.
service.get("/get/:id", (req, resp) => {
  const id_get = [parseInt(req.params.id)];
  const sql = "SELECT * FROM guest WHERE id = ?";

  connection.query(sql, id_get, (error, rows) => {
    //resp.sendFile('/Users/brantleycervarich/Desktop/PROJECT2CS347/report.html'); // -=-=-=-=-=-=ENSURE=-=-=-=-=-=-
    if (error) {
      resp.status(500);
      resp.json({
        ok: false,
        results: error.message,
      });
    } else {
      const guest = rows.map(rowToObject);
      resp.json({
        ok: true,
        results: rows.map(rowToObject),
      });
    }
  });
});

// GET /get that returns as JSON an object with ALL guests first and last name.
service.get("/get/", (req, resp) => {
  const id_get = [parseInt(req.params.id)];
  const sql = "SELECT * FROM guest";

  connection.query(sql, id_get, (error, rows) => {
    if (error) {
      resp.status(500);
      resp.json({
        ok: false,
        results: error.message,
      });
    } else {
      const guest = rows.map(rowToObject);
      resp.json({
        ok: true,
        results: rows.map(rowToObject),
      });
    }
  });
});

// DELETE /guests/id that removes a guest from
// the database. It returns nothing but gives back status code 204, which means
// the operation silently succeeded OR 404 if it failed.
service.delete("/guests/:id", (req, resp) => {
  const id_delete = [parseInt(req.params.id)];

  const sql = 'DELETE FROM guest WHERE id = ?';
  console.log(`Deleted:${id_delete}`)

  connection.query(sql, id_delete, (error, result) => {
    if (error) {
      resp.status(404);
      resp.json({
        ok: false,
        results: error.message,
      });
    } else {
      resp.status(204);
      resp.json({
        ok: true,
      });
    }
  });
});

// PATCH /guests that accepts a JSON body containing an id and that guest's 
// new first and last name. It returns a JSON structure reporting the new info 
// assigned to the guest.
service.patch("/guests/:id/:firstname/:lastname", (req, resp) => {
  const id_update = [parseInt(req.params.id)];
  const firstname_update = req.params.firstname;
  const lastname_update = req.params.lastname;
  const updateQuery = 'UPDATE guest SET firstname = ?, lastname = ? WHERE id = ?';
  const param = [firstname_update, lastname_update, id_update];
  connection.query(updateQuery, param, (error, result) => {
    if(error){
      console.error(error);
    } else {
      resp.json({
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