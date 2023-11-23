const express = require("express");
const path = require("path");
const app = express();
const port = process.port || 3001;

app.listen(port, () => {
    console.log(`API server running on http://localhost:${port}`);
});