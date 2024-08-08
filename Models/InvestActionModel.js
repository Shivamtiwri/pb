const connectionDb = require("../db/server");

async function ProfitModel() {
  const in_date = new Date();
  const dateObj = new Date(in_date);
  // oneMonthAgo.setMonth(oneMonthAgo.getMonth() + 1);
  // Extract date portion
  const dateOnly = dateObj.toISOString().split("T")[0]; // current date

  connectionDb.query(
    "SELECT * FROM invest WHERE prfit_gen=? and image_status = 'approve'",
    [dateOnly],
    async (err, result) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(result);
      const insertQuery = `
            INSERT INTO profit (user_id, amount, profit_amount, profit_date,in_id)
            VALUES (?, ?, ?, ?,?);
        `;

      for (const row of result) {
        const userId = row.user_id;
        const amount = row.amount;
        const profitAmount = (amount * 2) / 100;
        const profitDate = new Date();
        const in_id = row.id;
        const oneMonthAgo = new Date(row.prfit_gen); // create a copy of the current date
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() + 1);

        connectionDb.query(
          insertQuery,
          [userId, amount, profitAmount, profitDate, in_id],
          async (err, result) => {
            if (err) {
              console.error(err);
              return;
            }
            connectionDb.query(
              "UPDATE invest SET prfit_gen=? and profit_get_status=? WHERE id = ?",
              [oneMonthAgo, "0", in_id],
              async (err, result) => {
                if (err) {
                  console.error(err);
                }
              }
            );
          }
        );
      }
    }
  );
}

async function InsertInvestWithProfitModel() {
  function getDateFiveDaysAgo() {
    const today = new Date();
    const fiveDaysAgo = new Date(today);
    fiveDaysAgo.setDate(today.getDate() + 5);
    return fiveDaysAgo.toISOString().split("T")[0]; // Format: YYYY-MM-DD
  }

  const dateonly = getDateFiveDaysAgo();
  console.log(dateonly);

  connectionDb.query(
    "SELECT * FROM invest WHERE prfit_gen=? and image_status = 'approve' and profit_get_status='0'",
    [dateonly],
    async (err, result) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(result);
      const insertQuery = `
            INSERT INTO invest_profit (inv_id, invest_amount, invest_profit_amount, user_id,profit_date,paid_status)
            VALUES (?, ?, ?, ?,?,?);
        `;

      for (const row of result) {
        const userId = row.user_id;
        const amount = row.amount;
        const profitAmount = (amount * 2) / 100;
        const profitDate = new Date();
        const in_id = row.id;
        // const oneMonthAgo = new Date(row.prfit_gen); // create a copy of the current date
        // oneMonthAgo.setMonth(oneMonthAgo.getMonth() + 1);

        connectionDb.query(
          insertQuery,
          [in_id, amount, profitAmount, userId, profitDate, "Unpaid"],
          async (err, result) => {
            if (err) {
              console.error(err);
              return;
            }
            connectionDb.query(
              "UPDATE invest SET profit_get_status=? WHERE id = ?",
              ["1", in_id],
              async (err, result) => {
                if (err) {
                  console.error(err);
                }
              }
            );
          }
        );
      }
    }
  );
}

async function getGenrateProfit(callback) {
  connectionDb.query(
    "SELECT r.email, r.first_name, r.last_name, i.* FROM register r JOIN invest_profit i ON r.user_id = i.user_id WHERE i.paid_status = 'Unpaid';",
    (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    }
  );
}
async function PaidProfitProfitModole(id, callback) {
  connectionDb.query(
    "UPDATE invest_profit SET paid_status = 'Paid' WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    }
  );
}

async function getProfitpaidModleUser(userId, callback) {
  console.log(userId);

  connectionDb.query(
    "SELECT r.email, r.first_name, r.last_name, i.* FROM register r JOIN invest_profit i ON r.user_id = i.user_id WHERE i.paid_status = 'Paid' and i.user_id = ?",
    [userId],
    (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    }
  );
}

module.exports = {
  ProfitModel,
  InsertInvestWithProfitModel,
  getGenrateProfit,
  PaidProfitProfitModole,
  getProfitpaidModleUser,
};
