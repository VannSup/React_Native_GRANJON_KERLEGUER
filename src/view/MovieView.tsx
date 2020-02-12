import * as React from 'react';
import useMovie from '../domaineMovies/Movie';
import {Text, View, Image, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const MoviePage: React.FC = ({id}) => {
  const {movie, loading} = useMovie(id);

  return loading ? (
    <Text>Loading...</Text>
  ) : (
    <View style={styles.item}>
      <Image style={styles.itemImage} source={{uri: `${movie.image}`}} />
      <Text style={styles.itemTitle}>{movie.title}</Text>
      <Text style={styles.itemDescription}>{movie.year}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  itemTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  itemDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  itemImage: {
    marginLeft: 0,
    height: 100,
    width: 50,
  },
});

export default MoviePage;
