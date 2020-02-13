import * as React from 'react';
import useMovies from '../domaineMovies/Movies';
import {Movie} from 'src/domaineMovies/tools/types';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'App';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

type ListMovieViewProps = {
  navigation: ProfileScreenNavigationProp;
};

const ListMovieView: React.FC<ListMovieViewProps> = ({navigation}) => {
  const {movies, loading, nbPage} = useMovies(0, 999, '');

  return loading ? (
    <ActivityIndicator size="large" color="#0000ff" />
  ) : (
    <FlatList
      data={movies}
      renderItem={({item}) => <Item movie={item} navigation={navigation} />}
      keyExtractor={item => item.objectID}
    />
  );
};

function Item({movie, navigation}: {movie: Movie; navigation: any}) {
  return (
    <TouchableHighlight
      onPress={() =>
        navigation.push('Detail', {
          objectId: movie.objectID,
        })
      }>
      <View style={styles.item}>
        <Image style={styles.itemImage} source={{uri: `${movie.image}`}} />
        <Text style={styles.itemTitle}>{movie.title}</Text>
        <Text style={styles.itemDescription}>{movie.year}</Text>
        <Text>{movie.objectID}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
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

export default ListMovieView;
