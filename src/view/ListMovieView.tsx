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
        <View style={styles.itemText}>
          <Text style={styles.itemTitle}>{movie.title}</Text>
          <Text style={styles.itemYear}>{movie.year}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  itemImage: {
    margin: 10,
    height: 100,
    width: 50,
  },
  itemText: {
    flexDirection: 'column',
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
});

export default ListMovieView;
