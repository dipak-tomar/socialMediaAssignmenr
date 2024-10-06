import database from '../config/database';

export interface Post {
  id?: number;
  title: string;
  description: string;
  media: string;
  mediaType: 'image' | 'video';
}

// Create a new post
export const createPost = (post: Post) => {
  return new Promise((resolve, reject) => {
    database.transaction(txn => {
      txn.executeSql(
        `INSERT INTO posts (title, description, media, mediaType) VALUES (?, ?, ?, ?)`,
        [post.title, post.description, post.media, post.mediaType],
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

// Delete a post by id
export const deletePost = (postId: number) => {
  return new Promise((resolve, reject) => {
    database.transaction(txn => {
      txn.executeSql(
        'DELETE FROM posts WHERE id = ?',
        [postId],
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
