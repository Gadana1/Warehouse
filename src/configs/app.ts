const AppConfig = {
  // Define Environment
  env: process.env.NODE_ENV || process.env.ENV,
  isLocal: (process.env.NODE_ENV || process.env.ENV) === 'local',
  isDevelopment:
    (process.env.NODE_ENV || process.env.ENV) === 'development' ||
    (process.env.NODE_ENV || process.env.ENV) === 'dev',
  isProduction:
    (process.env.NODE_ENV || process.env.ENV) === 'production' ||
    (process.env.NODE_ENV || process.env.ENV) === 'prod',

  // JWT
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  jwtTokenExpiry: process.env.JWT_TOKEN_EXPIRY,

  // Throttle - Request Limit
  throttleTTL: process.env.THROTTLE_TTL || 60,
  throttleLimit: process.env.THROTTLE_LIMIT || 60,
};
export default AppConfig;
