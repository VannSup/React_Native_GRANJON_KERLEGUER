import * as React from 'react';
import useMovies from '../domaineMovies/Movies';
import MovieItemList from '../component/MovieItemList';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ToastAndroid,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'App';
import {SearchBar} from 'react-native-elements';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Movies'
>;

type ListMovieViewProps = {
  navigation: ProfileScreenNavigationProp;
};

const ListMovieView: React.FC<ListMovieViewProps> = ({navigation}) => {
  //#region Initialisation Api
  //Element de la recherche.
  const [search, setSearch] = React.useState('');
  //Page actuel.
  const [page, setPage] = React.useState(0);
  //Nombre d'élement charger a la fois.
  const [hitsPerPage, setHitsPerPage] = React.useState(10);
  //Appel api
  const {movies, loading, nbPage} = useMovies(
    page,
    hitsPerPage,
    search,
    setPage,
  );
  //#endregion

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <SearchBar
          searchIcon={false}
          showLoading={false}
          lightTheme={true}
          placeholder="Search..."
          onChangeText={str => {
            setSearch(str); // Met a jours la recherche (cause un appel api)
          }}
          value={search}
        />
        <Text style={{textAlign: 'center'}}>
          {nbPage <= 0 ? 0 : page} sur {nbPage}
        </Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={true}
          onEndReached={() => {
            page < nbPage
              ? setPage(page + 1) // Met a jours la page (cause un appel api)
              : ToastAndroid.show('Fin', ToastAndroid.SHORT);
          }}
          onEndReachedThreshold={0.01}
          data={movies}
          renderItem={({item}) => (
            <MovieItemList movie={item} navigation={navigation} />
          )}
          keyExtractor={item => item.objectID}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ListMovieView;
