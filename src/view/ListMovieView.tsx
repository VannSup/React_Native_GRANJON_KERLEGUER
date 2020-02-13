import * as React from 'react';
import useMovies from '../domaineMovies/Movies';
import {Movie} from 'src/domaineMovies/tools/types';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  StatusBar,
  TouchableHighlight,
  ActivityIndicator,
  FlatList,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const ListMovieView: React.FC = () => {
  const {movies, loading, nbPage} = useMovies(10, 10, '');
  const navigation = useNavigation();

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
        navigation.navigate('Details', {
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
