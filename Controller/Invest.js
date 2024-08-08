const {
  InvestModel,
  getInvestAdminModel,
  InvestAdminActionModel,
  getInvestModel,
  IncestProfeModel,
  ActionImageAproveAdminModel,
  getInvestAdminModelApp,
} = require("../Models/Investmodel");

async function Invest(req, res) {
  const { amount } = req.body;
  const userId = req.userId; // Assuming req.email is correctly set elsewhere
  const in_date = new Date();
  if (!amount) {
    res.status(201).json({
      Response_code: 201,
      msg: `Ammount is required... !`,
      Status: false,
    });
  } else {
    InvestModel(userId, amount, in_date, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json({
          Response_code: 200,
          msg: "Invest Successful... !",
          Status: true,
        });
      }
    });
  }

  // Correct the order of arguments passed to InvestModel
}
async function getInvestAdmin(req, res) {
  getInvestAdminModel((err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json({
        Response_code: 200,
        count: result.length,
        data: result,
        msg: "Found data Successful... !",
      });
    }
  });
}
async function getInvestAdminApp(req, res) {
  getInvestAdminModelApp((err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json({
        Response_code: 200,
        count: result.length,
        data: result,
        msg: "Found data Successful... !",
      });
    }
  });
}

async function InvestActionAdmin(req, res) {
  const { status, id } = req.body;
  if (status === "Pending") {
    res.status(201).json({
      Response_code: 201,
      msg: `${status} is not req... !`,
    });
  }
  if (!status) {
    res.status(200).json({
      Response_code: 201,
      msg: "Status is required... !",
    });
  }

  InvestAdminActionModel(id, status, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json({
        Response_code: 200,
        msg: `${status} Successful... !`,
      });
    }
  });
}
async function getInvest(req, res) {
  const userId = req.userId;
  getInvestModel(userId, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json({
        Response_code: 200,
        count: result.length,
        data: result,
        msg: `Data Successful... !`,
      });
    }
  });
}
async function IncestProfe(req, res) {
  const { invest_id } = req.body;
  const userId = req.userId;
  const in_date = new Date();
  const filePath = req.file.path;
  IncestProfeModel(in_date, invest_id, filePath, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json({
        Response_code: 200,
        msg: `Uplode Successful... !`,
      });
    }
  });
}

async function ActionImageAproveAdmin(req, res) {
  const { status, id } = req.body;
  const in_date = new Date(); // current date
  const oneMonthAgo = new Date(in_date); // create a copy of the current date
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() + 1);
  if (status === "Pending") {
    res.status(201).json({
      Response_code: 201,
      msg: `${status} is not req... !`,
    });
  }
  if (!status) {
    res.status(200).json({
      Response_code: 201,
      msg: "Status is required... !",
    });
  }
  ActionImageAproveAdminModel(
    id,
    status,
    in_date,
    oneMonthAgo,
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json({
          Response_code: 200,
          // data: result,
          msg: `${status} Successful... !`,
        });
      }
    }
  );
}

module.exports = {
  Invest,
  getInvestAdmin,
  InvestActionAdmin,
  getInvest,
  IncestProfe,
  ActionImageAproveAdmin,
  getInvestAdminApp,
};
