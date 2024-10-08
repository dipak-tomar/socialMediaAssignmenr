import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FeedImage from './FeedImage';
import { Post } from '../services/postsService';

const {width: screenWidth} = Dimensions.get('window');

interface FeedItemProps {
  post: Post;
}

const FeedItem = ({post}: FeedItemProps) => {
  const [liked, setLiked] = useState(post.liked);

  const handleLike = () => {
    setLiked(!liked);
  };

  console.log("post images",post?.images);
  

  return (
    <View style={styles.feedItemContainer}>
      {/* User Info */}
      <View style={styles.userInfo}>
        <Image source={{uri: post.avatar}} style={styles.avatar} />
        <Text style={{color: "#000"}}>{post.username}</Text>
      </View>

      <FlatList
        horizontal
        style={{width: screenWidth - 40}}
        showsHorizontalScrollIndicator={false}
        data={JSON.parse(post.images)}
        renderItem={({item}) => {
          return <FeedImage uri={item?.uri} mediaType={item?.type} />;
        }}
      />

      {/* title */}
      <Text style={styles.description}>{post.title}</Text>
      {/* Description */}
      <Text style={styles.description}>{post.description}</Text>

      {/* Like/Unlike Button */}
      <TouchableOpacity onPress={handleLike} style={styles.likeButton}>
        <Icon
          name={liked ? 'heart' : 'heart-outline'}
          size={24}
          color={liked ? 'red' : 'black'}
        />
      </TouchableOpacity>

      {/* Post Date */}
      <Text style={styles.postDate}>{post.date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  feedItemContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  description: {
    marginTop: 10,
    fontSize: 14,
     color: '#000'
  },
  likeButton: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  postDate: {
    marginTop: 5,
    fontSize: 12,
    color: 'gray',
  },
});

export default FeedItem;
