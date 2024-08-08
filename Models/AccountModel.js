const connectionDb = require("../db/server");

async function AddUserAccountModle(
  bank_name,
  acc_type,
  ifsc_code,
  acc_number,
  acc_holder_name,
  userId,
  in_date,
  upi_id,
  callback
) {
  connectionDb.query(
    "SELECT * FROM user_account WHERE user_id=?",
    [userId],
    async (err, result) => {
      if (err) {
        callback(err);
      } else {
        if (result.length === 1) {
          connectionDb.query(
            "UPDATE user_account SET bank_name = ?, acc_type = ?, ifsc_code = ?, acc_number = ?, acc_holder_name = ?, add_date = ?, upi_id = ? WHERE user_id = ?;",
            [
              bank_name,
              acc_type,
              ifsc_code,
              acc_number,
              acc_holder_name,
              in_date,
              upi_id,
              userId,
            ],
            async (err, result) => {
              if (err) {
                callback(err);
              } else {
                callback(null, result);
              }
            }
          );
        } else {
          connectionDb.query(
            "INSERT INTO user_account (bank_name,acc_type, ifsc_code, acc_number,acc_holder_name,user_id,add_date,upi_id) VALUES (?, ?, ?, ?,?,?,?,?)",
            [
              bank_name,
              acc_type,
              ifsc_code,
              acc_number,
              acc_holder_name,
              userId,
              in_date,
              upi_id,
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

async function getUserAccountModle(userId, callback) {
  connectionDb.query(
    "SELECT * FROM user_account WHERE user_id=?",
    [userId],
    async (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    }
  );
}

async function AddAdminAccountModle(
  bank_name,
  acc_type,
  ifsc_code,
  acc_number,
  acc_holder_name,
  userId,
  in_date,
  upi_id,
  callback
) {
  connectionDb.query(
    "SELECT * FROM admin_account WHERE user_id=?",
    [userId],
    async (err, result) => {
      if (err) {
        callback(err);
      } else {
        if (result.length === 1) {
          connectionDb.query(
            "UPDATE admin_account SET bank_name = ?, acc_type = ?, ifsc_code = ?, acc_number = ?, acc_holder_name = ?, add_date = ?, upi_id = ? WHERE user_id = ?;",
            [
              bank_name,
              acc_type,
              ifsc_code,
              acc_number,
              acc_holder_name,
              in_date,
              upi_id,
              userId,
            ],
            async (err, result) => {
              if (err) {
                callback(err);
              } else {
                callback(null, result);
              }
            }
          );
        } else {
          connectionDb.query(
            "INSERT INTO admin_account (bank_name,acc_type, ifsc_code, acc_number,acc_holder_name,user_id,add_date,upi_id) VALUES (?, ?, ?, ?,?,?,?,?)",
            [
              bank_name,
              acc_type,
              ifsc_code,
              acc_number,
              acc_holder_name,
              userId,
              in_date,
              upi_id,
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

async function getAdminAccountModle(userId, callback) {
  connectionDb.query(
    "SELECT * FROM admin_account WHERE user_id=?",
    [userId],
    async (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    }
  );
}

module.exports = {
  AddUserAccountModle,
  getUserAccountModle,
  AddAdminAccountModle,
  getAdminAccountModle,
};
