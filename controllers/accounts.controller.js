import { accounts } from "../data/accounts.js";

export const getAllAccounts = (req, res) => {
  try {
    const response = {
      count: accounts.length,
      data: accounts
    };
    res.json(response);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAccountById = (req, res) => {
  try {
    const { id } = req.params;
    const account = accounts.find(acc => acc._id === id);

    const response = account
      ? { finded: true, account }
      : { finded: false, message: "Account not found" };

    res.json(response);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAccountsByQuery = (req, res) => {
  try {
    const { gender, id, name, isActive } = req.query;
    let resultados = [...accounts];

    const noParams =
      !gender && !id && !name && typeof isActive === "undefined";

    if (noParams) {
      return res.json({ count: accounts.length, data: accounts });
    }

    if (id) resultados = resultados.filter(a => a._id === id);
    if (gender)
      resultados = resultados.filter(
        a => a.gender.toLowerCase() === gender.toLowerCase()
      );
    if (name)
      resultados = resultados.filter(a =>
        a.client.toLowerCase().includes(name.toLowerCase())
      );
    if (typeof isActive !== "undefined") {
      const activeValue = isActive === "true";
      resultados = resultados.filter(a => a.isActive === activeValue);
    }

    const response =
      resultados.length === 0
        ? { finded: false }
        : resultados.length === 1
        ? { finded: true, account: resultados[0] }
        : { finded: true, data: resultados };

    res.json(response);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const getTotalBalance = (req, res) => {
  try {
    const activeAccounts = accounts.filter(a => a.isActive);

    const totalBalance = activeAccounts.reduce(
      (sum, a) => sum + parseFloat(a.balance.replace(/[$,]/g, "")),
      0
    );

    res.json({
      status: activeAccounts.length > 0,
      accountBalance: totalBalance
    });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
