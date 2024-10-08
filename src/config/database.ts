import SQLite from 'react-native-sqlite-storage';
import { posts } from '../data/postData';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

// Function to create the table and insert initial data
export const createTables = async () => {
  try {
    // Check if the data has been initialized before
    const isDataInitialized = await AsyncStorage.getItem('isDataInitialized');
    
    if (isDataInitialized !== 'true') {
      // If data hasn't been initialized, proceed to create tables and insert data
      database.transaction(txn => {
        // Create table if it doesn't exist
        txn.executeSql(
          `CREATE TABLE IF NOT EXISTS posts (
             id INTEGER PRIMARY KEY AUTOINCREMENT,
             avatar TEXT,
             username TEXT,
             title TEXT,
             description TEXT,
             date TEXT,
             images TEXT,
             liked INTEGER
           )`,
          [],
          async () => {
            console.log('Table created successfully');

            // Wrap insertion of all posts in a transaction
            database.transaction(insertTxn => {
              posts.forEach(post => {
                const imagesJson = JSON.stringify(post.images); // Convert images array to JSON string
                insertTxn.executeSql(
                  `INSERT INTO posts (avatar, username, title, description, date, images, liked)
                   VALUES (?, ?, ?, ?, ?, ?, ?)`,
                  [
                    post.avatar,
                    post.username,
                    post.title,
                    post.description,
                    post.date,
                    imagesJson,
                    post.liked ? 1 : 0,
                  ],
                  (insertTxn, result) => {
                    console.log(`Post with ID ${post.id} inserted successfully`);
                  },
                  error => {
                    console.log('Error inserting post: ', error);
                  },
                );
              });
            });

            // Set the flag in AsyncStorage indicating that the data has been initialized
            await AsyncStorage.setItem('isDataInitialized', 'true');
            console.log('Data initialization flag set');
          },
          error => {
            console.log('Error creating table: ', error);
          },
        );
      });
    } else {
      console.log('Data has already been initialized, skipping insertion');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

export default database;