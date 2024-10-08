import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../../components/Heaser';
import {goBack} from '../../Navigators/utils';

// Constants
const screenWidth = Dimensions.get('window').width;

// Dummy data for posts
const posts = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d',
  },
  {
    id: '5',
    imageUrl: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d',
  },
];

// Profile Header Component
const ProfileHeader = ({profileImage, username, bio}) => (
  <View style={styles.headerContainer}>
    <Image source={{uri: profileImage}} style={styles.profileImage} />
    <View style={styles.userInfo}>
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.bio}>{bio}</Text>
    </View>
  </View>
);

// Profile Stats Component
const ProfileStats = ({postsCount, followersCount}) => (
  <View style={styles.statsContainer}>
    <View style={styles.statItem}>
      <Text style={styles.statCount}>{postsCount}</Text>
      <Text style={styles.statLabel}>Posts</Text>
    </View>
    <View style={styles.statItem}>
      <Text style={styles.statCount}>{followersCount}</Text>
      <Text style={styles.statLabel}>Followers</Text>
    </View>
  </View>
);

// Post Grid Component
const PostGrid = ({posts}) => (
  <FlatList
    data={posts}
    numColumns={3}
    keyExtractor={item => item.id}
    renderItem={({item}) => (
      <Image source={{uri: item.imageUrl}} style={styles.gridImage} />
    )}
  />
);

const ProfileScreen = () => {
  // Sample profile data
  const profileImage = 'https://randomuser.me/api/portraits/men/1.jpg';
  const username = 'johndoe';
  const bio = 'Photographer & Traveler';
  const postsCount = posts.length;
  const followersCount = 120;

  return (
    <View style={styles.container}>
      <Header isFeedScreen={false} onBackPress={() => goBack()} />
      <ProfileHeader
        profileImage={profileImage}
        username={username}
        bio={bio}
      />
      <ProfileStats postsCount={postsCount} followersCount={followersCount} />
      <PostGrid posts={posts} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userInfo: {
    marginLeft: 15,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000'
  },
  bio: {
    color: '#888',
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eaeaea',
  },
  statItem: {
    alignItems: 'center',
  },
  statCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000'
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
  },
  gridImage: {
    width: screenWidth / 3,
    height: screenWidth / 3,
    margin: 1,
  },
});
