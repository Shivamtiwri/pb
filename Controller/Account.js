const {
  AddUserAccountModle,
  getUserAccountModle,
  AddAdminAccountModle,
  getAdminAccountModle,
} = require("../Models/AccountModel");

async function addUserAccount(req, res) {
  const {
    bank_name,
    acc_type,
    ifsc_code,
    acc_number,
    acc_holder_name,
    upi_id,
  } = req.body;
  const userId = req.userId; // Assuming req.email is correctly set elsewhere
  const in_date = new Date();

  if (!bank_name) {
    res.status(201).json({
      Response_code: 201,
      msg: `Bank Name is required ... !`,
    });
  }
  if (!acc_type) {
    res.status(201).json({
      Response_code: 201,
      msg: `Account Type is required ... !`,
    });
  }
  if (!ifsc_code) {
    res.status(201).json({
      Response_code: 201,
      msg: `Ifsc code is required ... !`,
    });
  }
  if (!acc_number) {
    res.status(201).json({
      Response_code: 201,
      msg: `Account number is required ... !`,
    });
  }
  if (!acc_holder_name) {
    res.status(201).json({
      Response_code: 201,
      msg: `Account holder name is required ... !`,
    });
  }

  // Correct the order of arguments passed to InvestModel
  AddUserAccountModle(
    bank_name,
    acc_type,
    ifsc_code,
    acc_number,
    acc_holder_name,
    userId,
    in_date,
    upi_id,
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json({
          Response_code: 200,
          msg: "Account Add Successfuly... !",
        });
      }
    }
  );
}

async function getUserAccount(req, res) {
  const userId = req.userId;
  getUserAccountModle(userId, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json({
        Response_code: 200,
        data: result[0],
        msg: "Account get Successfuly... !",
      });
    }
  });
}
async function addAdminAccount(req, res) {
  const {
    bank_name,
    acc_type,
    ifsc_code,
    acc_number,
    acc_holder_name,
    upi_id,
  } = req.body;
  const userId = req.userId; // Assuming req.email is correctly set elsewhere
  const in_date = new Date();

  if (!bank_name) {
    res.status(201).json({
      Response_code: 201,
      msg: `Bank Name is required ... !`,
    });
  }
  if (!acc_type) {
    res.status(201).json({
      Response_code: 201,
      msg: `Account Type is required ... !`,
    });
  }
  if (!ifsc_code) {
    res.status(201).json({
      Response_code: 201,
      msg: `Ifsc code is required ... !`,
    });
  }
  if (!acc_number) {
    res.status(201).json({
      Response_code: 201,
      msg: `Account number is required ... !`,
    });
  }
  if (!acc_holder_name) {
    res.status(201).json({
      Response_code: 201,
      msg: `Account holder name is required ... !`,
    });
  }

  // Correct the order of arguments passed to InvestModel
  AddAdminAccountModle(
    bank_name,
    acc_type,
    ifsc_code,
    acc_number,
    acc_holder_name,
    userId,
    in_date,
    upi_id,
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res
          .status(200)
          .json({ Response_code: 200, msg: "Account Add Successfuly... !" });
      }
    }
  );
}

async function getAdminAccount(req, res) {
  const userId = req.userId;
  getAdminAccountModle(userId, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json({
        Response_code: 200,
        data: result[0],
        msg: "Account Add Successfuly... !",
      });
    }
  });
}

// async function getUserAccount(req, res) {
//   const userId = req.userId;
//   getUserAccountModle(userId, (err, result) => {
//     if (err) {
//       res.status(500).json(err);
//     } else {
//       res.status(200).json({
//         Response_code: 200,
//         data: result,
//         msg: "Account Add Successfuly... !",
//       });
//     }
//   });
// }

module.exports = {
  addUserAccount,
  getUserAccount,
  addAdminAccount,
  getAdminAccount,
};
