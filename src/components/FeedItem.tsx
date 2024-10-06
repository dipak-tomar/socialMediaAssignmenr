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
import FastImage from 'react-native-fast-image';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/Ionicons';

const {width: screenWidth} = Dimensions.get('window');

const FeedItem = ({post}) => {
  const [liked, setLiked] = useState(post.liked);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <View style={styles.feedItemContainer}>
      {/* User Info */}
      <View style={styles.userInfo}>
        <Image source={{uri: post.avatar}} style={styles.avatar} />
        <Text>{post.username}</Text>
      </View>

      {/* Image Carousel */}
      <Carousel
        data={post.images}
        renderItem={({item}) => (
          <FastImage
            style={styles.image}
            source={{uri: item as string}}
            resizeMode={FastImage.resizeMode.cover}
          />
        )}
        sliderWidth={screenWidth}
        itemWidth={screenWidth - 40}
        loop
      />

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
