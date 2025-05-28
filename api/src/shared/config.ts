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
    }
}