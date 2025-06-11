import dotenv from 'dotenv';
dotenv.config();

export const config={
    server:{
        PORT : process.env.PORT || 5000
    },
    origin:{
        uri:  process.env.ORIGIN || 'http://localhost:5173'
    },
    database:{
        URI : process.env.DATABASE_URI || "mongodb://localhost:27017/meta-mentor"
    },
    redis:{
        URL:process.env.REDIS_URL || 'redis://localhost:6379'
    },
    email:{
        EMAIL: process.env.EMAIL_USER,
        PASSWORD: process.env.EMAIL_PASS
    },

    jwt:{
        ACCESS_SECRET_KEY:process.env.ACCESS_TOKEN_SECRET || "access-secret-key",
        ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
        REFRESH_SECRET_KEY:process.env.REFRESH_TOKEN_SECRET || "refresh-scret-key",
		REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
    },
    node_env:process.env.NODE_ENV || "development",
    cloudinary:{
         cloud_name: process.env.CLOUD_NAME,
         api_key: process.env.CLOUD_API_KEY,
         api_secret: process.env.CLOUD_API_SECRET,
    }
}