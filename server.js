/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const express = require("express");
const app = express();

app.use(express.static(path.resolve(__dirname, "dist")));

app.get("*", (_, res) => {
  res.sendFile(path.resolve(__dirname, "dist/index.html"));
});

app.listen(9000, () => "Listening...");
