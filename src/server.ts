import mongoose from "mongoose";
import app from "./app";
import config from "./config";

async function main() {
  try {
    await mongoose.connect(config.db_url as string);
  } catch (err) {
    console.log(err);
  }

  app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`);
  });
}

main();
