const httpStatus = require('http-status');
const jwt = require('jsonwebtoken')
const { dbConnection, dbDisconnection } = require('../../services/mysql.db.service')

exports.login = async (req, res, next) => {
  const dbconnection = await dbConnection();
  try {
    const body = req.body;
    myQuery = 'SELECT * FROM user WHERE userName=? AND password =?';
    dbconnection.query(myQuery, [body.userName, body.password], (error, results, fields) => {
      if (error || results === null || results === undefined || results.length === 0) {
        res.status(httpStatus.FORBIDDEN);
        res.json({ "error": "User does not exist." });
      }
      else {
        console.log('........login.controller login.......');
        console.log(results);
        console.log('.....................................');
        jwt.sign({ userName: body.userName }, 'secretkey', (err, token) => {
          // { expiresIn: '60s' },
          res.status(httpStatus.OK);
          res.json({ token, "userName":body.userName });
        })
      }
    });
  }
  catch (error) {
    res.status(httpStatus.FORBIDDEN);
    res.json({ "error": error })
  }
  finally {
    dbDisconnection(dbconnection);
    console.log("Disconnected");
  }
}

exports.getDataDB = async (req, res, next) => {
  jwt.verify(req.token, 'secretkey', async (error, authData) => {
    if (error) {
      res.status(httpStatus.FORBIDDEN);
      res.json({ "error": error });
    }
    else {
      console.log("authData: ", authData);
    }
    const dbconnection = await dbConnection();
    try {
      myQuery = 'SELECT id, firstName, lastName, contact, bloodGroup FROM user';
      dbconnection.query(myQuery, (error, results, fields) => {
        if (error || results === null || results === undefined) {
          res.status(httpStatus.FORBIDDEN);
          res.json({ "error": "Not able to fetch users." });
        }
        else {
          console.log('.........login.controller getDataDB........');
          console.log(results);
          console.log('...........................................');
          res.status(httpStatus.OK);
          res.json(results);
        }
      });
    }
    catch (error) {
      res.status(httpStatus.FORBIDDEN);
      res.json({ "error": error })
    }
    finally {
      dbDisconnection(dbconnection);
      console.log("Disconnected");
    }
  });
}

exports.getImage = async (req, res, next) => {
  jwt.verify(req.token, 'secretkey', async (error, authData) => {
    if (error) {
      res.status(httpStatus.FORBIDDEN);
      res.json({ "error": error });
    }
    else {
      console.log("authData: ", authData);
    }
    const dbconnection = await dbConnection();
    try {
      myQuery = 'SELECT filename FROM user WHERE userName=?';
      dbconnection.query(myQuery, [authData.userName], (error, results, fields) => {
        if (error || results === null || results === undefined) {
          res.status(httpStatus.FORBIDDEN);
          res.json({ "error": "Not able to get image." });
        }
        else {
          console.log('.......login.controller getImage......');
          console.log(results);
          console.log('......................................');
          res.status(httpStatus.OK);
          res.json(results);
        }
      });
    }
    catch (error) {
      res.status(httpStatus.FORBIDDEN);
      res.json({ "error": error })
    }
    finally {
      dbDisconnection(dbconnection);
      console.log("Disconnected");
    }
  });
}

exports.updateDataDB = async (req, res, next) => {
  jwt.verify(req.token, 'secretkey', async (error, authData) => {
    if (error) {
      res.status(httpStatus.FORBIDDEN);
      res.json({ "error": error });
    } else {
      console.log("authData: ", authData);
    }
    const dbconnection = await dbConnection();
    try {
      const userName = req.params.id;
      const body = req.body;
      if (authData.userName == userName) {
        myQuery = 'UPDATE user SET firstName = ?, lastName = ?, contact =?, bloodGroup =?, skill=?, password=? WHERE userName = ? AND emailid = ?';
        dbconnection.query(myQuery, [body.firstName, body.lastName, body.contact, body.bloodGroup, body.skill, body.password, userName, body.emailid], (err, results, fields) => {
          if (results.affectedRows === 1 && results.changedRows === 1) {
            console.log('......login.controller updateDataDB......');
            console.log(results);
            console.log('.........................................');
            res.status(httpStatus.OK);
            res.json({ "Updated user with username:": userName });
          }
          else {
            res.status(httpStatus.FORBIDDEN);
            res.json({ "error": "Unable to update user." });
          }
        });
      }
      else {
        res.status(httpStatus.FORBIDDEN);
        res.json({ "error": "Trying to update different user." });
      }
    }
    catch (error) {
      res.status(httpStatus.FORBIDDEN);
      res.json({ "error": error })
    }
    finally {
      dbDisconnection(dbconnection);
      console.log("Disconnected");
    }
  });
};

exports.deleteDataDB = async (req, res, next) => {
  jwt.verify(req.token, 'secretkey', async (error, authData) => {
    if (error) {
      res.status(httpStatus.FORBIDDEN);
      res.json({ "error": error });
    } else {
      console.log("authData: ", authData);
    }
    const dbconnection = await dbConnection();
    try {
      const userName = req.params.id;
      if (authData.userName == userName) {
        myQuery = 'DELETE FROM user WHERE userName = ? AND password = ?';
        dbconnection.query(myQuery, [userName, req.body.password], (err, results, fields) => {
          if (results.affectedRows === 1 && results.changedRows === 0) {
            console.log('.....login.controller deleteDataDB.....');
            console.log(results);
            console.log('.......................................');
            res.status(httpStatus.OK);
            res.json({ "Deleted the User with username:": userName });
          }
          else {
            res.status(httpStatus.FORBIDDEN);
            res.json({ "error": "Unable to delete user" });
          }
        });
      }
      else {
        res.status(httpStatus.FORBIDDEN);
        res.json({ "error": "Trying to update different user." });
      }
    }
    catch (error) {
      res.status(httpStatus.FORBIDDEN);
      res.json({ "error": error })
    }
    finally {
      dbDisconnection(dbconnection);
      console.log("Disconnected");
    }
  });
};