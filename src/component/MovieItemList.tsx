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
      onPress={() =>
        navigation.push('Movie', {
          objectId: movie.objectID,
        })
      }>
      <View style={styles.item}>
        <Image style={styles.itemImage} source={{uri: `${movie.image}`}} />
        <Text style={styles.movieItemTitle} numberOfLines={1}>
          {movie.title}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'column',
    borderRadius: 4,
    backgroundColor: 'rgba( 50, 50, 50, 0.9)',
    margin: 20,
  },
  itemImage: {
    margin: 5,
    height: 400,
    width: 200,
  },
  movieItemTitle: {
    margin: 5,
    height: 35,
    width: 200,
    fontSize: 24,
    color: Colors.white,
  },
});

export default MovieItemList;
