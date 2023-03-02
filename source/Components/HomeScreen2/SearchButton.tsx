import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const SearchButton = () => {
  return (
    <TouchableOpacity style={styles.SearchB}>
      <Text>
        <Icon name="search-outline" size={45} />
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  SearchB: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    marginTop: 5,
    marginHorizontal: 5,
    borderRadius: 10,
    position: 'absolute',
    right: 0,
  },
});
