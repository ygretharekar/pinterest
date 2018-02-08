import express from "express";
import appConfig from "./config/middleware";

const app = express();

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

appConfig(app);

app.listen(
	8100,
	err => {
		if (err) throw err;

		console.log("[INFO] Listening on *: 8100");

	}
);
