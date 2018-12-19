var express = require("express"),
  router = express.Router(),
  db = require("./mysql_database.js");

router.get("/", function(req, res) {
  var errCode = 1;
  var errMsg = "Something went wrong!!",
    error = { errCode: errCode, errMsg: errMsg };
  db.query(
    "SELECT id, first_name firstName, last_name lastName, email, mobile FROM users",
    function(err, rows) {
      if (err) {
        (errCode = 1), (errMsg = "Error While fetching the Data");
      } else {
        (errCode = 0), (errMsg = "Data fecthed Successfully");
      }

      error = { errCode: errCode, errMsg: errMsg };
      results = { results: rows, error: error };
      res.json(results);
    }
  );
});

router.get("/:id", function(req, res) {
  var id = req.params.id;
  var errCode = 1;
  var errMsg = "Something went wrong!!",
    error = { errCode: errCode, errMsg: errMsg };
  if (id) {
    db.query(
      "SELECT id, first_name firstName, last_name lastName, email, mobile FROM users WHERE id = " +
        id,
      function(err, rows) {
        if (err) {
          (errCode = 1), (errMsg = "Error While fetching the Data");
        } else {
          (errCode = 0), (errMsg = "Data fecthed Successfully");
        }

        error = { errCode: errCode, errMsg: errMsg };
        results = { results: rows, error: error };
        res.json(results);
      }
    );
  } else {
    (errCode = 1), (errMsg = "Userid is Missing");
    error = { errCode: errCode, errMsg: errMsg };
    results = { results: [], error: error };
    res.json(results);
  }
});

router.delete("/:id", function(req, res) {
  var id = req.params.id;
  var errCode = 1;
  var errMsg = "Something went wrong!!",
    error = { errCode: errCode, errMsg: errMsg };
  if (id) {
    db.query("DELETE FROM users WHERE id = " + id, function(err, rows) {
      if (err) {
        console.log(err);
        (errCode = 1), (errMsg = "Error While Deleting the Data");
      } else {
        (errCode = 0), (errMsg = "Data Deleted Successfully");
      }

      error = { errCode: errCode, errMsg: errMsg };
      results = { results: rows, error: error };
      res.json(results);
    });
  } else {
    (errCode = 1), (errMsg = "Userid is Missing");
    error = { errCode: errCode, errMsg: errMsg };
    results = { results: [], error: error };
    res.json(results);
  }
});

router.post("/", function(req, res) {
  var validate = validateInput(req);

  var errCode = 1;
  var errMsg = "Something went wrong!!",
    error = { errCode: errCode, errMsg: errMsg };

  if (!validate.isValid) {
    errMsg = validate.errMsg;
    error = { errCode: errCode, errMsg: errMsg };
    results = { results: [], error: error };
    console.log(results);
    res.json(results);
  } else {
    var id = req.body.id,
      firstName = req.body.firstName,
      lastName = req.body.lastName,
      email = req.body.email,
      mobile = req.body.mobile;
    db.query(
      "INSERT INTO users SET  id = '" +
        id +
        "', first_name = '" +
        firstName +
        "', last_name = '" +
        lastName +
        "', email = '" +
        email +
        "', mobile = '" +
        mobile +
        "', createdon = NOW(), updatedon = NOW() ON DUPLICATE KEY UPDATE first_name = '" +
        firstName +
        "', last_name = '" +
        lastName +
        "', email = '" +
        email +
        "', mobile = '" +
        mobile +
        "', updatedon = NOW()",
      function(err, rows) {
        if (err) {
          console.log(err);
          (errCode = 1), (errMsg = "Error While updating the Data");
        } else {
          (errCode = 0), (errMsg = "Data updated Successfully");
        }
        results = req.body;
        results.id = rows.insertId;
        error = { errCode: errCode, errMsg: errMsg };
        results = { results: results, error: error };
        console.log(results);
        res.json(results);
      }
    );
  }
});

function validateInput(req) {
  var firstName = req.body.firstName,
    lastName = req.body.lastName,
    email = req.body.email,
    mobile = req.body.mobile;
  var errMsg = "",
    isValid = false;
  console.log(req.body);
  if (!firstName) errMsg = "First Name is Mandatory";
  else if (!lastName) errMsg = "Last Name is Mandatory";
  else if (!email) errMsg = "Email is Mandatory";
  else if (!mobile) errMsg = "Mobile NUmber is Mandatory";
  else isValid = true;

  return { isValid: isValid, errMsg: errMsg };
}

module.exports = router;
