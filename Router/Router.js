const express = require("express");
const { register, loginUser, getUser } = require("../Controller/User");
const { Verify, upload } = require("../middleware");
const {
  Invest,
  getInvest,
  IncestProfe,
  Profit,
} = require("../Controller/Invest");
const {
  Withdrawal,
  getWithdrawalUser,
  WithdrawalActionUser,
} = require("../Controller/Withdrawal");
const { addUserAccount, getUserAccount } = require("../Controller/Account");
const { getProfitpaidUser } = require("../Controller/IncestAction");

const router = new express.Router();

router.post("/register", register);
router.post("/login", loginUser);
router.post("/getUser", Verify, getUser);
router.post("/invest", Verify, Invest);
router.post("/get-invest", Verify, getInvest);
router.post("/withdrawal", Verify, Withdrawal);
router.post("/get-withdrawal", Verify, getWithdrawalUser);
router.post("/withdrawal-action-user", Verify, WithdrawalActionUser);
router.post("/add-user-account", Verify, addUserAccount);
router.post("/get-user-account", Verify, getUserAccount);
router.post("/get-profit-paid-user", Verify, getProfitpaidUser);
router.post("/invest-image", Verify, upload.single("image"), IncestProfe);

module.exports = router;
