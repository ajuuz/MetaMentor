import dotenv from 'dotenv';
dotenv.config();

export const config={

    server:{
        PORT : process.env.PORT || 5000
    },
    database:{
        URI : process.env.DATABASE_URI || "mongodb://localhost:27017/meta-mentor"
    },
} 