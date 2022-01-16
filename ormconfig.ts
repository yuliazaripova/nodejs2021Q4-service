import CONFIG from './src/common/config';

const ORM_CONFIG = { 
   type: 'postgres',
   database: CONFIG.POSTGRES_DB,
   host: 'db', 
   port: CONFIG.PGPORT,
   username: CONFIG.POSTGRES_USER,
   password: CONFIG.POSTGRES_PASSWORD,
   synchronize: false,
   migrationsRun: true,
   "entities": [
      "src/entity/**/*.ts"
   ],
   "migrations": [
      "src/migrations/**/*.ts"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migrations",
      "subscribersDir": "src/subscriber"
   }
 }

 export default ORM_CONFIG