import React, {useState, useEffect} from 'react';
import {FlatList, ActivityIndicator, View} from 'react-native';
import FeedItem from '../../components/FeedItem';
import feedData from '../../data/feedData.json';

const FeedScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    setPosts(feedData);
    setLoading(false);
  }, []);

  const loadMore = () => {
    setPage(page + 1);
  };

  return (
    <>
      <FlatList
        data={posts}
        renderItem={({item}) => <FeedItem post={item} />}
        keyExtractor={item => item.id.toString()}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
      />
      {loading ? <ActivityIndicator /> : null}
    </>
  );
};

export default FeedScreen;
