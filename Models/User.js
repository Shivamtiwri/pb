const jwt = require("jsonwebtoken");
const connectionDb = require("../db/server");
const secretKey = "hello";

async function getCheckSameDaylogin(
  first_name,
  last_name,
  email,
  mobile_no,
  password,
  refrall,
  reg_date,
  reg_type,
  randomFourDigitNumber,
  callback
) {
  connectionDb.query(
    "SELECT * FROM register WHERE email=? or mobile_no= ?",
    [email, mobile_no],
    async (err, result) => {
      if (err) {
        callback(err);
      } else {
        if (result?.[0]?.email === email) {
          callback({ Response_code: 201, msg: "Email alrady exit... !" });
        } else if (result?.[0]?.mobile_no === mobile_no) {
          callback({ Response_code: 201, msg: "Mobile  alrady exit... !" });
        } else {
          connectionDb.query(
            "INSERT INTO register(first_name,user_id,last_name,email,mobile_no,password,refrall,reg_date,reg_type) VALUES (?,?,?,?,?,?,?,?,?)",
            [
              first_name,
              `FN${randomFourDigitNumber}`,
              last_name,
              email,
              mobile_no,
              password,
              refrall ? refrall : "",
              reg_date,
              reg_type,
            ],
            async (err, result) => {
              if (err) {
                callback(err);
              } else {
                callback(null, result);
              }
            }
          );
        }
      }
    }
  );
}

async function loginModel(email, password, reg_type, callback) {
  connectionDb.query(
    "SELECT * FROM register WHERE email=? ",
    [email],
    async (err, result) => {
      if (err) {
        callback(err);
      } else {
        if (result?.[0]?.email === email) {
          if (result?.[0]?.password === password) {
            const id = result?.[0]?.user_id;
            // Generate JWT token
            const token = jwt.sign({ id }, secretKey, { expiresIn: "10d" });
            // Return result and token
            callback(null, { token, result });
          } else {
            callback({ Response_code: 201, msg: "Password invalid... !" });
          }
        } else {
          callback({ Response_code: 201, msg: "Email invalid... !" });
        }
      }
    }
  );
}

async function getUsermodle(userId, callback) {
  connectionDb.query(
    "SELECT * FROM register WHERE user_id=?",
    [userId],
    async (err, result) => {
      if (err) {
        callback(err);
      } else {
        if (result) {
          callback(null, result);
        } else {
          callback({ Response_code: 201, msg: "No data found !", data: [] });
        }
      }
    }
  );
}

module.exports = {
  getCheckSameDaylogin,
  loginModel,
  getUsermodle,
};
