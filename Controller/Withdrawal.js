const {
  WithdrawalModel,
  getWithdrawalAdminModel,
  getWithdrawalUserModel,
  WithdrawalActionAdminModel,
  UplodeWithdrawalImageAdminModel,
  WithdrawalActionAdminUser,
} = require("../Models/WithdrawalModol");

async function Withdrawal(req, res) {
  const { invest_id } = req.body;
  const userId = req.userId;
  const in_date = new Date();

  WithdrawalModel(in_date, invest_id, userId, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json({
        Response_code: 200,
        msg: `Withdrawal Successful... !`,
        status: true,
      });
    }
  });
}

async function getWithdrawalAdmin(req, res) {
  const userId = req.userId;
  getWithdrawalAdminModel((err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json({
        Response_code: 200,
        msg: `Get Withdrawal Successful... !`,
        status: true,
        data: result,
      });
    }
  });
}

async function getWithdrawalUser(req, res) {
  const userId = req.userId;
  getWithdrawalUserModel(userId, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json({
        Response_code: 200,
        status: true,
        withdrawal: result,
        msg: `Get Withdrawal Successful... !`,
      });
    }
  });
}
async function WithdrawalActionAdmin(req, res) {
  const { status, id } = req.body;
  const userId = req.userId;
  WithdrawalActionAdminModel(id, status, userId, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json({
        Response_code: 200,
        status: true,
        msg: `${status} Successful... !`,
      });
    }
  });
}

async function WithdrawalActionUser(req, res) {
  const { status, id } = req.body;
  const userId = req.userId;
  WithdrawalActionAdminUser(id, status, userId, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json({
        Response_code: 200,
        status: true,
        msg: `${status} Successful... !`,
      });
    }
  });
}

async function UplodeWithdrawalImageAdmin(req, res) {
  const { withdrawal_id } = req.body;
  const in_date = new Date();
  const filePath = req.file.path;
  UplodeWithdrawalImageAdminModel(
    in_date,
    withdrawal_id,
    filePath,
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json({
          Response_code: 200,
          status: true,
          msg: `Uplode Successful... !`,
        });
      }
    }
  );
}

module.exports = {
  Withdrawal,
  getWithdrawalAdmin,
  getWithdrawalUser,
  WithdrawalActionAdmin,
  UplodeWithdrawalImageAdmin,
  WithdrawalActionUser,
};
