const httpStatus = require('http-status');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const user = require("../../assets/user.json");
const { dbConnection, dbDisconnection } = require('../../services/mysql.db.service')

exports.imageUpload = async (req, res, next) => {
    upload(req, res, (err) => {
        if (!req.file) {
            res.status(httpStatus.FORBIDDEN);
            console.log("No file received");
            res.json("No file received");
        }
        else {
            res.status(httpStatus.OK);
            console.log('File received');
            console.log(req.file);
            res.json(req.file.filename);
        }
    })
}
// try {
//     var myQuery = 'INSERT INTO image (name, type, size) VALUES (?,?,?)'
//     dbconnection.query(myQuery, [req.file.filename, req.file.mimetype, req.file.size], (error, results, fields) => {
//         if (results === undefined) {
//             console.log(results);
//             res.json({ "error": "Image already exists." });
//         }
//         else if (results.affectedRows === 1 && results.changedRows === 0) {
//             res.status(httpStatus.OK);
//             console.log('....................................CREATE................................');
//             console.log('The solution is: ', results);
//             console.log('..........................................................................');
//             res.json(req.file.filename);
//         }
//         else {
//             res.status(httpStatus.FORBIDDEN);
//             res.json({ "error": "Unable to upload image " });
//             // res.json(error);
//         }

//     })
// }
// catch (error) {
//     console.log(error);
//     res.json({ "error": error })
// }
// finally {
//     dbDisconnection(dbconnection);
//     console.log("...........disconnected............");
// }

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/assets/upload/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: fileFilter
}).single('myImage');

exports.createDataDB = async (req, res, next) => {
    const dbconnection = await dbConnection();
    const value = req.body;
    try {
        const myQuery = 'INSERT INTO user (firstName, lastName, emailid, contact, bloodGroup, skill, userName, password, filename) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        dbconnection.query(myQuery, [value.firstName, value.lastName, value.emailid, value.contact, value.bloodGroup, value.skill, value.userName, value.password, value.filename], (error, results, fields) => {
            if (results === undefined) {
                res.status(httpStatus.FORBIDDEN);
                res.json({ "error": "Username or Email already exists." });
            }
            else if (results.affectedRows === 1 && results.changedRows === 0) {
                res.status(httpStatus.OK);
                console.log('....registration.controller createDataDB....');
                console.log(results);
                console.log('............................................');
                res.status(httpStatus.OK);
                res.json("New User Created");
            }
            else {
                res.status(httpStatus.FORBIDDEN);
                res.json({ "error": "Unable to create user " });
                res.json(error);
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
};

////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.getUserByJSON = async (req, res, next) => {
    // console.log("hdhsdjb");
    try {
        const dataPath = "src/assets/user.json";
        // userService.getUser().then((data) => {
        //     return (res.json(JSON.parse(data)));
        // } ).console.error();
        // const users = await userService.getUser();
        fs.readFile(dataPath, "utf8", (err, user) => {
            if (err) {
                res.status(httpStatus.NOT_FOUND);
                throw err;
            }
            // console.log(data);
            res.status(httpStatus.OK);
            return (res.json(JSON.parse(user)));
        })
    }
    catch (error) {
        console.error(error);
    }
};

exports.createUserByJSON = async (req, res, next) => {
    try {
        const value = req.body;
        user.push(value);
        const dataPath = "src/assets/user.json";
        fs.writeFile(dataPath, JSON.stringify(user, null, 2), "utf8", err => {
            if (err) {
                throw err;
            }
            res.status(httpStatus.OK);
            return (res.json({ "data": "new user" }));
        });
    }
    catch (error) {
        console.error(error);
    }
}

exports.updateUserByIdJSON = async (req, res, next) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const dataPath = "src/assets/user.json";
        fs.readFile(dataPath, "utf8", (err, user) => {
            user = JSON.parse(user);
            user[id].userName = body.userName;
            user[id].emailid = body.emailid;
            fs.writeFile(dataPath, JSON.stringify(user, null, 2), "utf8", (err) => {
                if (err) throw err;
            });
            res.status(httpStatus.OK);
            return (res.json({ "data": "updated" }));
        });
    }
    catch (error) {
        console.error(error);
    }
}

exports.deleteUserByIdJSON = async (req, res, next) => {
    try {
        const id = req.params.id;
        const dataPath = "src/assets/user.json";
        fs.readFile(dataPath, "utf8", (err, user) => {
            user = JSON.parse(user);
            user.splice(id, 1);
            fs.writeFile(dataPath, JSON.stringify(user, null, 2), "utf8", (err) => {
                if (err) throw err;
            });
            res.status(httpStatus.OK);
            return (res.json({ "data": "deleted" }));
        });
    }
    catch (error) {
        console.error(error);
    }
}

// exports.getUser = async (req, res, next) => {
//     try {
//         const data = {
//             data: [{
//                 userName: 'Kasish',
//                 emailid: 'kas@va'
//             }]
//         };
//         res.status(httpStatus.OK);
//         return (res.json(data));
//     }
    // catch (error) {
    //     console.error(error);
    // }
// }

// exports.createUser = async (req, res, next) => {
//     const body = req.body;
//     try {
//         const data = {
//             data: [{
//                 userName: 'Kasish',
//                 emailid: 'kas@va'
//             }]
//         };
//         res.status(httpStatus.OK);
//         return (res.json(data));
//     }
//     catch (error) {
//         console.error(error);
//     }
// }

// exports.getUserById = async (req, res, next) => {
//     const body = req.body;
//     try {
//         const data = {
//             data: [{
//                 userName: 'Kasish ag',
//                 emailid: 'kas@val'
//             }]
//         };
//         res.status(httpStatus.OK);
//         return (res.json(data));
//     }
//     catch (error) {
//         console.error(error);
//     }
// }