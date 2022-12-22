export default () => ({
  port: parseInt(process.env.APP_PORT, 10) || 3000,
  database: {
    type: process.env.DB_TYPE || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME || 'student',
    password: process.env.DB_PASSWORD || 'student',
    database: process.env.DB_NAME || 'nest_project',
  },
  secretKey: process.env.SECRET_KEY || '39cf54cebdd3dd01',
  expiresIn: 3600,
});
