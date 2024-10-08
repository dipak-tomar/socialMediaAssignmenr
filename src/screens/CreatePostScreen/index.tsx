import React, {useState} from 'react';
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
  FlatList,
} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import Video from 'react-native-video';
import Header from '../../components/Heaser';
import {goBack} from '../../Navigators/utils';
import {createPost} from '../../services/postsService';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import RNFS from 'react-native-fs';

const CreatePost = () => {
  const [media, setMedia] = useState([]); // For storing selected photo or video
  const [mediaType, setMediaType] = useState(null); // To differentiate between image or video

  // Form validation schema using Yup
  const postSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
  });

  const {handleChange, handleSubmit, values, errors, touched, resetForm} =
    useFormik({
      initialValues: {title: '', description: ''},
      validationSchema: postSchema,
      onSubmit: async () => {
        if (!media) {
          Alert.alert('Error', 'Please upload a photo or video');
          return;
        }

        console.log('values', values, media);

        // Create a new post object
        const newPost = {
          id: Date.now(),
          title: values.title,
          description: values.description,
          images: media,
          date: new Date().toLocaleDateString(),
          username: 'john_doe',
          avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
          liked: false,
        };
        console.log('new post', newPost);
        try {
          // Save the post to the SQLite database
          await createPost(newPost);
          goBack();
          Alert.alert('Post created', 'Your post was successfully created!');
        } catch (error) {
          console.error('Failed to save post', error);
          Alert.alert('Error', 'Failed to create post');
        }
      },
    });

  // Function to handle media (photo/video) selection
  const handleMediaUpload = async () => {
    try {
      const results = await DocumentPicker.pick({
        allowMultiSelection: true,
        type: [DocumentPicker.types.images, DocumentPicker.types.video],
      });
      console.log('results dd', results);

      const selectedFiles = await Promise.all(
        results.map(async file => {
          const newPath = `${RNFS.DocumentDirectoryPath}/${file.name}`;
          await RNFS.copyFile(file.uri, newPath);

          return {
            uri: 'file://' + newPath, // Persist file path
            type: file?.type.includes('video') ? 'video' : 'image',
          };
        }),
      );
      setMedia(selectedFiles);
      // setMediaType(
      //   selectedFiles.some(file => file.type === 'video') ? 'video' : 'image',
      // );
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the document picker');
      } else {
        console.log('Unknown error: ', err);
      }
    }
  };

  // Function to delete a selected media file
  const deleteMedia = indexToDelete => {
    Alert.alert('Delete', 'Are you sure you want to delete this media?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          const newMedia = media?.filter((_, index) => index !== indexToDelete);
          setMedia(newMedia);
        },
      },
    ]);
  };

  const renderMediaItem = ({item, index}) => {
    return (
      <View style={styles.mediaContainer}>
        {/* Display Image or Video */}
        {item.type === 'image' ? (
          <Image source={{uri: item.uri}} style={styles.media} />
        ) : (
          <View style={styles.videoPlaceholder}>
            <Video
              source={{uri: item?.uri}}
              style={styles.media}
              controls
              paused={true}
              resizeMode="cover"
            />
          </View>
        )}
        {/* Cross icon to delete */}
        <TouchableOpacity
          style={styles.deleteIcon}
          onPress={() => deleteMedia(index)}>
          <Icon name="close-circle" size={30} color="red" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header isFeedScreen={false} onBackPress={() => goBack()} />
      <Text style={styles.heading}>Create New Post</Text>

      {/* Title Input */}
      <TextInput
        style={[styles.input]}
        placeholder="Enter post title"
        value={values.title}
        placeholderTextColor={'#000'}
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
        placeholderTextColor={'#000'}
        onChangeText={handleChange('description')}
        multiline
      />
      {touched.description && errors.description && (
        <Text style={styles.error}>{errors.description}</Text>
      )}

      {/* Media Upload Button */}
      <TouchableOpacity onPress={handleMediaUpload} style={styles.mediaButton}>
        <Text style={styles.mediaButtonText}>
          {media?.length > 0 ? 'Change Media' : 'Upload Photo/Video'}
        </Text>
      </TouchableOpacity>

      {/* Grid View for selected media */}
      <FlatList
        data={media}
        renderItem={renderMediaItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2} // Number of columns for grid view
        contentContainerStyle={styles.grid}
      />

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
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    color: '#000',
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

  mediaContainer: {
    position: 'relative',
    width: '45%', // 3 columns, adjust width
    marginBottom: 15,
    // backgroundColor: 'green',
    marginLeft: '4%',
  },
  media: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  videoPlaceholder: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoText: {
    color: '#fff',
    fontSize: 16,
  },
  grid: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '5%',
  },
  deleteIcon: {
    position: 'absolute',
    top: -10,
    right: -10,
  },
});

export default CreatePost;
