import * as React from 'react';
import useMovie from '../domaineMovies/Movie';
import ActorItemList from '../component/ActorItemList';
import {
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'App';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Movie'>;
type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Movie'
>;

type MovieViewProps = {
  route: ProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
};

const MovieView: React.FC<MovieViewProps> = ({route, navigation}) => {
  const {objectId} = route.params;
  const {movie, loading} = useMovie(objectId);

  return loading ? (
    <ActivityIndicator size="large" color="#0000ff" />
  ) : (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={{uri: `${movie?.image}`}} />
      <Text style={styles.title}>{movie?.title}</Text>
      <Text style={styles.description}>{movie?.year}</Text>
      <Text style={styles.description}>{movie?.genre.join(' / ')}</Text>

      <FlatList
        data={movie?.actor_facets}
        renderItem={({item}) => (
          <ActorItemList actor={item} navigation={navigation} />
        )}
        keyExtractor={item => item}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  description: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  image: {
    marginLeft: 0,
    height: 100,
    width: 50,
  },
  container: {
    flex: 1,
  },
});

export default MovieView;
