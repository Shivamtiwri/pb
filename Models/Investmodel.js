const connectionDb = require("../db/server");
const moment = require("moment");

async function InvestModel(userId, amount, in_date, callback) {
  connectionDb.query(
    "INSERT INTO invest (amount,user_id,in_date,status,image,image_date,image_status,image_action_date,profit_get_status) VALUES (?, ?, ?,?,?,?,?,?,?)",
    [amount, userId, in_date, "Pending", "", "", "Pending", "", ""],
    async (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    }
  );
}

async function getInvestAdminModel(callback) {
  connectionDb.query(
    "SELECT i.id, r.first_name, i.user_id, i.image, r.last_name, r.email, r.mobile_no, i.status, r.reg_date, i.amount, i.in_date, i.image_status FROM register r JOIN invest i ON r.user_id = i.user_id WHERE i.image_status != 'Approve';",
    async (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    }
  );
}
async function getInvestAdminModelApp(callback) {
  connectionDb.query(
    "SELECT i.id, r.first_name, i.user_id, i.image, r.last_name, r.email, r.mobile_no, i.status, r.reg_date, i.amount, i.in_date, i.image_status FROM register r JOIN invest i ON r.user_id = i.user_id WHERE i.image_status = 'Approve';",
    async (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    }
  );
}
async function InvestAdminActionModel(id, status, callback) {
  if (status === "rejected") {
    connectionDb.query(
      "UPDATE invest SET status = 'Rejected' WHERE id = ?",
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
      "UPDATE invest SET status = 'Approve' WHERE id = ?",
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
async function getInvestModel(userId, callback) {
  connectionDb.query(
    "SELECT invest.*, CASE WHEN invest.image = '' THEN 'false' ELSE 'true' END AS imageuplodeStatus, ac.bank_name ,ac.acc_type, ac.ifsc_code, ac.acc_number, ac.acc_holder_name, ac.upi_id,profit.profit_amount FROM invest JOIN admin_account as ac left JOIN profit ON invest.id = profit.in_id WHERE invest.user_id =?",
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
async function IncestProfeModel(in_date, invest_id, filePath, callback) {
  const imageurl = filePath?.split("\\");
  // console.log(imageurl?.[1]);
  connectionDb.query(
    "UPDATE invest SET image = ?, image_date = ?,image_status=? WHERE id = ?",
    [
      `https://sachinproject-1.onrender.com/images/${imageurl?.[1]}`,
      in_date,
      "Padding",
      invest_id,
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
//////

////

async function ActionImageAproveAdminModel(
  id,
  status,
  in_date,
  oneMonthAgo,
  callback
) {
  if (status === "rejected") {
    connectionDb.query(
      "UPDATE invest SET image_status = 'Rejected', image_action_date = ?, profit_gen = ? WHERE id = ?",
      [in_date, oneMonthAgo, id],
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
      "UPDATE invest SET image_status = 'Approve',image_action_date=?,prfit_gen=? WHERE id = ?",
      [in_date, oneMonthAgo, id],
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

module.exports = {
  InvestModel,
  getInvestAdminModel,
  InvestAdminActionModel,
  getInvestModel,
  IncestProfeModel,
  ActionImageAproveAdminModel,
  getInvestAdminModelApp,
};
