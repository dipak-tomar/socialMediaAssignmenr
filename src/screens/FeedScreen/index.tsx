import React, {useState, useEffect} from 'react';
import {
  FlatList,
  ActivityIndicator,
  View,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import FeedItem from '../../components/FeedItem';
import Header from '../../components/Heaser';
import {navigate} from '../../Navigators/utils';
import {posts as postsData} from '../../data/postData';
import {getPosts} from '../../services/postsService';
import {createTables} from '../../config/database';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const FeedScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const isFocused = useIsFocused();

  const getpostsData = async () => {
    try {
      console.log('feeds', feeds);
    } catch (error) {
      console.log('err feeds', error);
    }
  };
  const initializeData = async () => {
    setLoading(true);
    try {
      // Wait for table creation to complete
      await createTables();
      // Once tables are created, call getpostsData

      setTimeout(async () => {
        let feeds = await getPosts();

        setPosts(feeds);
      }, 2000);
    } catch (error) {
      console.log('Error initializing data', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    initializeData();
  }, [isFocused]);

  const renderFeedItem = ({item}) => <FeedItem post={item} />;

  // Function to handle the refresh action
  const onRefresh = () => {
    setIsRefreshing(true);
    initializeData();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

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
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={posts}
          renderItem={renderFeedItem}
          initialNumToRender={10} // Render only 10 items initially
          maxToRenderPerBatch={10} // Render 10 items per scroll batch
          windowSize={21} // Render 10 viewports ahead and behind (21 total items)
          removeClippedSubviews={true} // Remove items that are out of the viewport
          updateCellsBatchingPeriod={50} // How often to render next batch (ms)
          getItemLayout={(
            data,
            index, // Improve scroll performance by precomputing height
          ) => ({length: 80, offset: 80 * index, index})}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.feedList}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
        />
      )}
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
  loaderContainer: {
    ...StyleSheet.absoluteFillObject, // This makes the loader cover the entire screen
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background to overlay on the content
  },
});
export default FeedScreen;
