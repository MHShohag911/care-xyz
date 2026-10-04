import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function run() {
  await import("./seed-services");
}

run();