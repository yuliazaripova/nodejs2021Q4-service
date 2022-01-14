import CONFIG from './src/common/config';

const ORM_CONFIG = { type: 'postgres',
database: CONFIG.POSTGRES_DB,
host: 'db', 
port: CONFIG.PGPORT,
username: CONFIG.POSTGRES_USER,
password: CONFIG.POSTGRES_PASSWORD,
    
    "entities": [
       "src/entity/**/*.ts"
    ],
    "migrations": [
       "src/migration/**/*.ts"
    ],
    "subscribers": [
       "src/subscriber/**/*.ts"
    ]
 }

 export default ORM_CONFIG