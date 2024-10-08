import React, {useEffect, useState} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {screenWidth} from '../Navigators/utils';
import Video from 'react-native-video';


interface FeedImageProps {
  uri: string;
  mediaType: string
}

const FeedImage = ({uri, mediaType}: FeedImageProps) => {
  return (
    <View style={styles.container}>
      {uri ? (
        mediaType.includes('image') ? (
          <FastImage
            style={styles.image}
            source={{uri: uri as string}}
            resizeMode={FastImage.resizeMode.contain}
            fallback={true}
          />
        ) : (
          <Video
            source={{uri: uri}}
            style={styles.image}
            controls
            paused={true}
            resizeMode="cover"
          />
        )
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: screenWidth,
    height: 200,
  },
});

export default FeedImage;
