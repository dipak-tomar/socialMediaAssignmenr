import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import Video from 'react-native-video';
import Header from '../../components/Heaser';
import {goBack} from '../../Navigators/utils';
import {createPost} from '../../services/postsService';
import {createTables} from '../../config/database';

const CreatePost = () => {
  const [media, setMedia] = useState(null); // For storing selected photo or video
  const [mediaType, setMediaType] = useState(null); // To differentiate between image or video

  // Form validation schema using Yup
  const postSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
  });

  useEffect(() => {
    // Create tables on mount
    createTables();
  }, []);

  const {handleChange, handleSubmit, values, errors, touched, resetForm} =
    useFormik({
      initialValues: {title: '', description: ''},
      validationSchema: postSchema,
      onSubmit: async () => {
        if (!media) {
          Alert.alert('Error', 'Please upload a photo or video');
          return;
        }

        console.log('values', values);

        // Create a new post object
        const newPost = {
          id: Date.now(), // Using timestamp as a unique ID for simplicity
          title: values.title,
          description: values.description,
          media: media,
          mediaType: mediaType,
        };

        try {
          // Save the post to the SQLite database
          await createPost(newPost);
          resetForm();
          setMedia(null);
          setMediaType(null);
          Alert.alert('Post created', 'Your post was successfully created!');
        } catch (error) {
          console.error('Failed to save post', error);
          Alert.alert('Error', 'Failed to create post');
        }
      },
    });

  // Function to handle media (photo/video) selection
  const handleMediaUpload = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'mixed', // Allows both images and videos
        includeBase64: false,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled media picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          const selectedAsset = response.assets[0];
          setMedia(selectedAsset.uri);
          setMediaType(
            selectedAsset.type?.startsWith('video') ? 'video' : 'image',
          );
        }
      },
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header isFeedScreen={false} onBackPress={() => goBack()} />
      <Text style={styles.heading}>Create New Post</Text>

      {/* Title Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter post title"
        value={values.title}
        onChangeText={handleChange('title')}
      />
      {touched.title && errors.title && (
        <Text style={styles.error}>{errors.title}</Text>
      )}

      {/* Description Input */}
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter post description"
        value={values.description}
        onChangeText={handleChange('description')}
        multiline
      />
      {touched.description && errors.description && (
        <Text style={styles.error}>{errors.description}</Text>
      )}

      {/* Media Upload Button */}
      <TouchableOpacity onPress={handleMediaUpload} style={styles.mediaButton}>
        <Text style={styles.mediaButtonText}>
          {media ? 'Change Media' : 'Upload Photo/Video'}
        </Text>
      </TouchableOpacity>

      {/* Display Selected Media */}
      {media && mediaType === 'image' && (
        <Image source={{uri: media}} style={styles.media} />
      )}
      {media && mediaType === 'video' && (
        <Video
          source={{uri: media}}
          style={styles.media}
          controls
          paused={true}
          resizeMode="cover"
        />
      )}

      {/* Submit Button */}
      <Button title="Create Post" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  mediaButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  mediaButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  media: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
});

export default CreatePost;
