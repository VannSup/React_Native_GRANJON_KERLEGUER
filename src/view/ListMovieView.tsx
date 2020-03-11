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
  Button,
  ImageBackground,
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
  const [hitsPerPage, setHitsPerPage] = React.useState(5);
  //Appel api
  const {movies, nbPage, loading, firstLoading} = useMovies(
    page,
    hitsPerPage,
    search,
    setPage,
  );
  //#endregion

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../img/background.jpg')}
        style={styles.background}>
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
      </ImageBackground>
      {firstLoading ? (
        <View style={[styles.activityIndicator, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          //#region mode horizontal
          horizontal
          showsHorizontalScrollIndicator={false}
          //#endregion
          //#region load more data
          onEndReached={() => {
            page < nbPage
              ? setPage(page + 1) // Met a jours la page (cause un appel api)
              : ToastAndroid.show('Fin', ToastAndroid.SHORT);
          }}
          onEndReachedThreshold={0.1}
          //#endregion
          //#region item
          data={movies}
          renderItem={({item}) => (
            <MovieItemList movie={item} navigation={navigation} />
          )}
          keyExtractor={item => item.objectID}
          //#endregion
          //#region dernier element
          ListFooterComponent={
            loading ? (
              <View style={[styles.activityIndicator, styles.horizontal]}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            ) : (
              <View />
            )
          }
          //#endregion
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  background: {
    flex: 1,
  },
});

export default ListMovieView;
