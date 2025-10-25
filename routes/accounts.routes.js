import express from "express";
import {
  getAllAccounts,
  getAccountById,
  getAccountsByQuery,
  getTotalBalance
} from "../controllers/accounts.controller.js";

const router = express.Router();

router.get('/cuentasBalance', getTotalBalance);

router.get('/', (req, res) => {
    if (Object.keys(req.query).length === 0) {
        return getAllAccounts(req, res);
    } else {
        return getAccountsByQuery(req, res);
    }
});

router.get('/:id', getAccountById);

export default router;