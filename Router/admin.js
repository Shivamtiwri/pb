const express = require("express");
const { register, loginUser } = require("../Controller/User");
const { Verify, upload } = require("../middleware");
const {
  getInvestAdmin,
  InvestActionAdmin,
  getIncestProfeAdmin,
  ActionImageAproveAdmin,
  getInvestAdminApp,
} = require("../Controller/Invest");
const {
  getWithdrawalAdmin,
  WithdrawalActionAdmin,
  UplodeWithdrawalImageAdmin,
} = require("../Controller/Withdrawal");
const { addAdminAccount, getAdminAccount } = require("../Controller/Account");
const {
  getGenrateProfitinfivemint,
  PaidProfit,
} = require("../Controller/IncestAction");
const adminrouter = new express.Router();
// adminrouter.post("/register", register);
adminrouter.post("/login", loginUser);
adminrouter.post("/get-invest", Verify, getInvestAdmin);
adminrouter.post("/get-invest-admin-app", Verify, getInvestAdminApp);
adminrouter.post("/admin-invest-action", Verify, InvestActionAdmin);
// adminrouter.post("/get-invest-profeAdmin", Verify, getIncestProfeAdmin);
adminrouter.post("/action-image-aprove-admin", Verify, ActionImageAproveAdmin);
adminrouter.post("/get-withdrawal-admin", Verify, getWithdrawalAdmin);
adminrouter.post("/withdrawal-action-admin", Verify, WithdrawalActionAdmin);
adminrouter.post("/add-admin-account", Verify, addAdminAccount);
adminrouter.post("/get-admin-account", Verify, getAdminAccount);
adminrouter.post("/paid-profit", Verify, PaidProfit);

adminrouter.post(
  "/getGenrateProfitInfiveMint",
  Verify,
  getGenrateProfitinfivemint
);
adminrouter.post(
  "/uplode-withdrawal-image-admin",
  Verify,
  upload.single("image"),
  UplodeWithdrawalImageAdmin
);
module.exports = adminrouter;
