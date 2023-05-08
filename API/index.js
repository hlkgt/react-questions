const express = reuquire("express");
const api = require("./api/server");
const app = express();

const port = process.env.PORT || 5500;

app.use("/api", api);

app.listen(port, () => console.log(`Listen on port ${port}`));
