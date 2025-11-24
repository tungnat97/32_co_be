export default () => ({
  jwt: {
    secret: process.env.JWT_SECRET || 'jwt_secret_key',
  },
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/32co',
  },
});
