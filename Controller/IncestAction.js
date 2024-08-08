const {
  ProfitModel,
  InsertInvestWithProfitModel,
  getGenrateProfit,
  PaidProfitProfitModole,
  getProfitpaidModleUser,
} = require("../Models/InvestActionModel");

async function Profit(req, res) {
  try {
    await ProfitModel();
  } catch (err) {
    console.log(err);
  }
}
function myFunction() {
  Profit();
  // console.log("hello");
}
// Execute the function every hour (3600000 milliseconds)
setInterval(myFunction, 3600000);

async function InsertInvestWithProfit(req, res) {
  try {
    await InsertInvestWithProfitModel();
  } catch (err) {
    console.log(err);
  }
}
function myFunction() {
  InsertInvestWithProfit();
  // console.log("hello");
}
// Execute the function every hour (3600000 milliseconds)
setInterval(myFunction, 3600000);

async function getGenrateProfitinfivemint(req, res) {
  getGenrateProfit((err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json({
        Response_code: 200,
        data: result,
        msg: "Found data Successful... !",
      });
    }
  });
}
async function PaidProfit(req, res) {
  const { id } = req.body;

  PaidProfitProfitModole(id, (err, result) => {
    if (!id) {
      res.status(201).json({
        Response_code: 201,
        msg: `Id is required... !`,
        Status: false,
      });
    } else {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json({
          Response_code: 200,
          msg: "Paid Successful... !",
          Status: true,
        });
      }
    }
  });
}

async function getProfitpaidUser(req, res) {
  const userId = req.userId;
  console.log(userId);

  getProfitpaidModleUser(userId, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json({
        Response_code: 200,
        data: result,
        msg: "Found data Successful... !",
        Status: true,
      });
    }
  });
}

module.exports = { getGenrateProfitinfivemint, PaidProfit, getProfitpaidUser };
