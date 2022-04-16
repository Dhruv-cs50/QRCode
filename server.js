const express = require("express");
const app = express();
const morgan = require("morgan");
const QRCode = require("qrcode");

app.use(morgan("dev"));

app.get("/", (req, res) => {
  const query = req.query;
  const qr = query.qr;

  const cb = (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(
        `
            <img src="${data}">
          `
      );
    }
  };

  QRCode.toDataURL(qr, cb);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Example app listening on port 3000!");
});
