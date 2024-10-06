import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Assuming you're using FontAwesome for the arrow icon

const Header = ({
  title,
  onPress,
  buttonTitle,
  onPressProfile,
  profileButtonTitle,
  isFeedScreen,
  onBackPress,
}) => {
  return (
    <View style={styles.header}>
      {/* Render back arrow if not on Feed screen */}
      {!isFeedScreen && (
        <TouchableOpacity onPress={onBackPress}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
      )}

      <Text style={styles.headerTitle}>{title}</Text>

      <View style={styles.rightButtonsContainer}>
        {/* First button */}
        {onPress && (
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{buttonTitle}</Text>
          </TouchableOpacity>
        )}

        {/* Second button (Go to Profile) */}
        {onPressProfile && (
          <TouchableOpacity
            style={[styles.button, styles.profileButton]}
            onPress={onPressProfile}>
            <Text style={styles.buttonText}>{profileButtonTitle}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  rightButtonsContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  profileButton: {
    marginLeft: 10, // Adds spacing between buttons
    backgroundColor: '#28a745', // Different color for the profile button
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Header;
