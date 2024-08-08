const connectionDb = require("../db/server");

async function WithdrawalModel(in_date, invest_id, userId, callback) {
  connectionDb.query(
    "SELECT * FROM `invest` WHERE id=?",
    [invest_id],
    async (err, result) => {
      if (result.length === 0) {
        callback({ msg: "Invest id not found...!", status: false });
      } else {
        connectionDb.query(
          "INSERT INTO withdrawal (user_id,invest_id,withdarwal_date,status,image,imageup_date,image_status) VALUES (?,?,?,?,?,?,?)",
          [userId, invest_id, in_date, "Pending", "", "", ""],
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
  );
}

async function getWithdrawalAdminModel(callback) {
  connectionDb.query(
    "SELECT w.id, w.status, w.image_status, w.image, CASE WHEN w.image = '' THEN 'false' ELSE 'true' END as imageuplodeStatus, w.withdarwal_date, w.user_id, i.amount as invest_ammount, i.profit as invest_pro, i.in_date, r.email as user_email, r.first_name, r.last_name, ua.bank_name,ua.acc_type,ua.ifsc_code,ua.acc_number,ua.acc_holder_name FROM invest i JOIN withdrawal w ON i.id = w.invest_id JOIN register r ON w.user_id = r.user_id JOIN user_account ua ON w.user_id = ua.user_id;",
    async (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    }
  );
}
async function getWithdrawalUserModel(userId, callback) {
  connectionDb.query(
    "SELECT *, CASE WHEN `image` = '' THEN 'false' ELSE 'true' END as imageuplodeStatus FROM withdrawal WHERE user_id = ?",
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

async function WithdrawalActionAdminModel(id, status, userId, callback) {
  connectionDb.query(
    "SELECT * FROM `withdrawal` WHERE id=?",
    [id],
    async (err, result) => {
      if (result.length === 0) {
        callback({ msg: "Withdrawal id not found...!", status: true });
      } else {
        if (status === "rejected") {
          connectionDb.query(
            "UPDATE withdrawal SET status = 'Rejected' WHERE id = ?",
            [id],
            async (err, result) => {
              if (err) {
                callback(err);
              } else {
                callback(null, result);
              }
            }
          );
        }
        if (status === "approve") {
          connectionDb.query(
            "UPDATE withdrawal SET status = 'Approve' WHERE id = ?",
            [id],
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
async function WithdrawalActionAdminUser(id, status, userId, callback) {
  connectionDb.query(
    "SELECT * FROM `withdrawal` WHERE id=?",
    [id],
    async (err, result) => {
      if (result.length === 0) {
        callback({ msg: "Withdrawal id not found...!", status: true });
      } else {
        if (status === "rejected") {
          connectionDb.query(
            "UPDATE withdrawal SET image_status = 'Rejected' WHERE id = ?",
            [id],
            async (err, result) => {
              if (err) {
                callback(err);
              } else {
                callback(null, result);
              }
            }
          );
        }
        if (status === "approve") {
          connectionDb.query(
            "UPDATE withdrawal SET image_status = 'Approve' WHERE id = ?",
            [id],
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

async function UplodeWithdrawalImageAdminModel(
  in_date,
  withdrawal_id,
  filePath,
  callback
) {
  const imageurl = filePath?.split("\\");
  // console.log(imageurl?.[1]);
  connectionDb.query(
    "UPDATE withdrawal SET image = ?, imageup_date = ?,image_status=? WHERE id = ?",
    [
      `https://sachinproject-1.onrender.com/images/${imageurl?.[1]}`,
      in_date,
      "Pending",
      withdrawal_id,
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

module.exports = {
  WithdrawalModel,
  getWithdrawalAdminModel,
  getWithdrawalUserModel,
  WithdrawalActionAdminModel,
  UplodeWithdrawalImageAdminModel,
  WithdrawalActionAdminUser,
};
