import * as React from 'react';
import MovieItemList from '../domaineMovies/component/MovieItemList';
import NavButton from '../domaineMovies/component/NavButton';
import useMoviesByActor from '../domaineMovies/MoviesByActor';
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Button,
  Linking,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'App';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Actor'>;
type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Actor'
>;

type MovieViewProps = {
  route: ProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
};

const ActorView: React.FC<MovieViewProps> = ({route, navigation}) => {
  const {actorName} = route.params;
  const [page, setPage] = React.useState(0);
  const {movies, loading, nbPage} = useMoviesByActor(page, 10, actorName);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{textAlign: 'center'}}>
        {nbPage <= 0 ? 0 : page} sur {nbPage}
      </Text>
      <Button
        title={actorName}
        onPress={() =>
          Linking.openURL('https://www.google.com/search?q=' + actorName)
        }
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={movies}
          renderItem={({item}) => (
            <MovieItemList movie={item} navigation={navigation} />
          )}
          keyExtractor={item => item.objectID}
        />
      )}
      <NavButton page={page} nbPage={nbPage} setPage={setPage} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ActorView;
