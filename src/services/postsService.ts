import database from '../config/database';

export interface Post {
  id?: number; // Optional because it might not exist before the post is saved
  title: string; // Post title
  description: string; // Post description
  avatar: string; // User's avatar URL
  username: string; // Post creator's username
  date: string; // Date of post creation
  images: Array<{uri: string; type: 'image' | 'video'}>; // Array of images/videos
  liked: boolean; // Whether the post is liked
}
export const createPost = (post: Post) => {
  return new Promise((resolve, reject) => {
    database.transaction(txn => {
      txn.executeSql(
        'INSERT INTO posts (id, avatar, username, title, description, date, images, liked) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [
          post.id, // Unique ID
          post.avatar, // Avatar URL
          post.username, // Username
          post.title, // Post Title
          post.description, // Post Description
          post.date, // Date
          JSON.stringify(post.images), // Convert images array to JSON string
          post.liked ? 1 : 0, // Boolean 'liked' to integer (1 for true, 0 for false)
        ],
        (txn, result) => {
          resolve(result);
        },
        error => {
          reject(error);
        },
      );
    });
  });
};
// Get all posts
export const getPosts = () => {
  return new Promise<Post[]>((resolve, reject) => {
    database.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM posts',
        [],
        (txn, result) => {
          let posts: Post[] = [];
          for (let i = 0; i < result.rows.length; i++) {
            posts.push(result.rows.item(i));
          }
          resolve(posts);
        },
        error => {
          reject(error);
        },
      );
    });
  });
};

