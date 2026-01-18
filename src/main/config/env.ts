import dotenv from "dotenv";
import path from "path";
import fs from "fs";

const ENV = process.env.NODE_ENV || "development";
const prod = ENV === "production";
const dev = ENV === "development";

const ENV_FILE_MAP: Record<string, string> = {
  development: ".env.dev",
  production: ".env.prod",
};

// Tentukan file env
const envFileName = ENV_FILE_MAP[ENV] || ".env.dev";
const envFilePath = path.resolve(process.cwd(), envFileName);

// Load env file
if (fs.existsSync(envFilePath)) {
  dotenv.config({ path: envFilePath });
  console.log(` Loaded env from ${envFilePath}`);
} else {
  console.warn(` Env file ${envFilePath} not found. Using process.env defaults.`);
}

// Helper ambil env
function getEnvVar(name: string, fallback?: string): string {
  const value = process.env[name];
  if (value === undefined) {
    if (fallback !== undefined) return fallback;
    throw new Error(`environment variable ${name} is not defined`);
  }
  return value;
}

export const config = {
  PORT: parseInt(getEnvVar("PORT", process.env.PORT)),

  // env mode
  isProd: prod,
  isDev: dev,
  NODE_ENV: ENV,

  // koneksi database URL jika ada
  DATABASE_URL: process.env.DATABASE_CONNECT,

  // koneksi database manual (POSTGRES)
  DB_HOST: getEnvVar("DB_HOST", "localhost"),
  DB_PORT: parseInt(getEnvVar("DB_PORT", "5432")),
  DB_USER: getEnvVar("DB_USER", "postgres"),
  DB_PASS: getEnvVar("DB_PASS", ""),
  DB_NAME: getEnvVar("DB_NAME", "postgres"),

  // token
  ACCESS_TOKEN: getEnvVar("ACCESS_TOKEN", process.env.ACCESS_TOKEN),
  REFRESH_TOKEN: getEnvVar("REFRESH_TOKEN", process.env.REFRESH_TOKEN),

  // email config
  EMAIL_HOST: process.env.EMAIL_HOST || "smtp.gmail.com",
  EMAIL_PORT: parseInt(process.env.EMAIL_PORT || "587"),
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,

  //midtrans
    // Midtrans
  MIDTRANS_SERVER_KEY: getEnvVar("MIDTRANS_SERVER_KEY"),
  MIDTRANS_CLIENT_KEY: getEnvVar("MIDTRANS_CLIENT_KEY"),

  // base URL
  BASE_URL: getEnvVar("BASE_URL", process.env.BASE_URL),
};


// import dotenv from "dotenv";
// import path from "path";
// import fs from "fs";

// const ENV = process.env.NODE_ENV || "development";
// const prod = ENV === "production";
// const dev = ENV === "development";

// const ENV_FILE_MAP: Record<string, string> = {
//     development: ".env.dev",
//     production: ".env.prod"
// }

// const envFileName = ENV_FILE_MAP[ENV] || ".env.dev";
// const envFilePath = path.resolve(process.cwd(), envFileName);

// if (fs.existsSync(envFileName)) {
//     dotenv.config({ path: envFilePath });
//     console.log(` Loaded env from ${envFilePath}`);
// } else {
//     console.warn(` Env file ${envFilePath} not found. Using process.env defaults.`);
// };

// function getEnvVar(name: string, fallback?: string): string {
//     const value = process.env[name];
//     if (value === undefined) {
//         if (fallback !== undefined) return fallback;
//         throw new Error(`environment variabel ${name} is not defined`)
//     }
//     return value;
// }


// export const config = {
//     PORT: parseInt(getEnvVar("port", process.env.PORT)),
//     isProd: prod,
//     isDev: dev,
//     NODE_ENV: ENV,
//     DATABASE_URL: process.env.DATABASE_CONNECT,
//     ACCESS_TOKEN: getEnvVar("ACCESS_TOKEN", process.env.ACCESS_TOKEN),
//     REFRESH_TOKEN: getEnvVar("REFRESH_TOKEN", process.env.REFRESH_TOKEN),
//     EMAIL_HOST: process.env.EMAIL_HOST || 'smtp.gmail.com',
//     EMAIL_PORT: parseInt(process.env.EMAIL_PORT || '587'),
//     EMAIL_USER: process.env.EMAIL_USER,
//     EMAIL_PASS: process.env.EMAIL_PASS,
//     BASE_URL: getEnvVar("BASE_URL", process.env.BASE_URL),
// }