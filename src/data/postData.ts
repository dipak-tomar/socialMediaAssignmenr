export interface Post {
  id: number;
  title: string;
  description: string;
  media: string; // URI of the image or video
  mediaType: 'image' | 'video'; // Type of media
}

export const posts: Post[] = []; // This array will store the posts

// Function to add a new post to the posts array
export const createPost = (post: Post): void => {
  posts.push(post); // Add the new post to the array
};
