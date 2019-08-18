module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  //will update with DB_URL & API TOKEN??
  DB_URL: process.env.DATABASE_URL || "postgres://postgres:postgres@localhost/workout",
}