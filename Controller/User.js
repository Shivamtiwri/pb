const { ProfitModel } = require("../Models/Investmodel");
const {
  getCheckSameDaylogin,
  loginModel,
  getUsermodle,
} = require("../Models/User");
function getRandomFourDigitNumber() {
  return Math.floor(1000 + Math.random() * 9000);
}

let randomFourDigitNumber = getRandomFourDigitNumber();

async function register(req, res) {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const mobile_no = req.body.mobile_no;
  const password = req.body.password;
  const refrall = req.body.refrall;
  const reg_type = req.body.reg_type;
  const reg_date = new Date();
  getCheckSameDaylogin(
    first_name,
    last_name,
    email,
    mobile_no,
    password,
    refrall,
    reg_date,
    reg_type,
    randomFourDigitNumber,
    (err, result) => {
      if (err) {
        res.status(500).json(err);
        return;
      }
      res
        .status(200)
        .json({ Response_code: 200, msg: "Register Successful... !" });
    }
  );
}

async function loginUser(req, res) {
  const { email, password, reg_type } = req.body;

  loginModel(email, password, reg_type, (err, token) => {
    if (err) {
      res.status(500).json(err); // Handle database errors or other internal errors
      return;
    }

    if (token) {
      res
        .status(200)
        .json({ token, status: email === "admin@gmail.com" ? true : false }); // Send JWT token on successful login
    } else {
      // Handle other cases where token might not be present (invalid email/password)
      res.status(401).json({ message: "Invalid credentials... !" });
    }
  });
}
async function getUser(req, res) {
  const userId = req.userId;

  getUsermodle(userId, (err, result) => {
    if (err) {
      res.status(500).json({ err: err }); // Handle database errors or other internal errors
    } else {
      res
        .status(200)
        .json({ Response_code: 200, data: result, message: "Data found... !" });
    }
  });
}

module.exports = {
  register,
  loginUser,
  getUser,
};
