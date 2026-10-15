"use strict";

// This file wins over the vercel.json rewrite to tesla-trek-v4.
// That app is a marketing UI with no /api/health. This host does not settle.
module.exports = function handler(req, res) {
  const body = JSON.stringify({
    ok: true,
    service: "tesla-trek-public-site",
    settlement: false,
    pay: "https://lvlltd.com/api/pay",
    proof: "https://lvlltd.com/api/proof",
    pay_to: "0x8E51309870394f79574452A52A3c916622f0c4d1",
    never_pay: "0xa00876513baa433ce2b58a5341fd06d2b6f9a6ed",
    note: "Public site only. Does not settle USDC and is not the Tesla Fleet API."
  });
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(body);
};
