import SQLite from 'react-native-sqlite-storage';

// Open or create the posts database
const database = SQLite.openDatabase(
  {
    name: 'PostsDatabase',
    location: 'default',
  },
  () => {
    console.log('Database opened successfully');
  },
  error => {
    console.log('Error opening database: ', error);
  },
);

// Initialize the posts table if it doesn't exist
export const createTables = () => {
  database.transaction(txn => {
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS posts (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         title TEXT,
         description TEXT,
         media TEXT,
         mediaType TEXT
       )`,
      [],
      () => {
        console.log('Table created successfully');
      },
      error => {
        console.log('Error creating table: ', error);
      },
    );
  });
};

export default database;
