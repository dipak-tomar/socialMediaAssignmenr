import React, {useState, useEffect} from 'react';
import {FlatList, ActivityIndicator, View, StyleSheet} from 'react-native';
import FeedItem from '../../components/FeedItem';
import feedData from '../../data/feedData.json';
import Header from '../../components/Heaser';
import {goBack, navigate} from '../../Navigators/utils';
import {posts as postsData} from '../../data/postData';
import {getPosts} from '../../services/postsService';
const FeedScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getpostsData = async () => {
    const feeds = await getPosts();
    console.log('feeds', feeds);
  };

  useEffect(() => {
    setLoading(true);
    getpostsData();
    setPosts(feedData);
    setLoading(false);
  }, []);

  const renderFeedItem = ({item}) => <FeedItem post={item} />;
  console.log('posts', postsData);

  return (
    <View style={styles.container}>
      <Header
        title="Feed"
        buttonTitle="+ Create Post"
        onPress={() => navigate('CreatePostScreen', {})}
        profileButtonTitle={'Go To Profile'}
        onPressProfile={() => navigate('ProfileScreen', {})}
        isFeedScreen={true}
        onBackPress={() => {}}
      />

      {/* Feed List */}
      <FlatList
        data={feedData}
        renderItem={renderFeedItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.feedList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  feedList: {
    paddingBottom: 20,
  },
});
export default FeedScreen;
