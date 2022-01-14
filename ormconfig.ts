import CONFIG from './src/common/config';
import { User } from './src/entity/User';
import { Board } from './src/entity/Board'

const ORM_CONFIG = { 
   type: 'postgres',
   database: CONFIG.POSTGRES_DB,
   host: 'db', 
   port: CONFIG.PGPORT,
   username: CONFIG.POSTGRES_USER,
   password: CONFIG.POSTGRES_PASSWORD,
   entities: [User, Board],
      "migrations": [
         "src/migration/**/*.ts"
      ],
      "subscribers": [
         "src/subscriber/**/*.ts"
      ]
 }

 export default ORM_CONFIG