import * as React from 'react';
import {Movie} from '../domaineMovies/tools/types';
import {StyleSheet, View, Text, Image, TouchableHighlight} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

type MovieItemListProps = {
  movie: Movie;
  navigation: any;
};

const MovieItemList: React.FC<MovieItemListProps> = ({movie, navigation}) => {
  return (
    <TouchableHighlight
      style={styles.touchableHighlight}
      onPress={() =>
        navigation.push('Movie', {
          objectId: movie.objectID,
        })
      }>
      <View style={styles.item}>
        <Image style={styles.itemImage} source={{uri: `${movie.image}`}} />
        {
          <View style={styles.itemText}>
            <Text style={styles.itemTitle}>{movie.title}</Text>
            <Text style={styles.itemYear}>{movie.year}</Text>
          </View>
        }
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'column',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    backgroundColor: 'green',
    margin: 10,
  },
  itemImage: {
    margin: 10,
    height: 400,
    width: 200,
  },
  itemText: {
    flexDirection: 'column',
    width: 200,
  },
  itemTitle: {
    margin: 5,
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  itemYear: {
    margin: 5,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  touchableHighlight: {
    height: 600,
  },
});

export default MovieItemList;
