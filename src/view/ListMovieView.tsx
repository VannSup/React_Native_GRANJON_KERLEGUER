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
  //Nombre d'élement charger a la fois.
  const [alea, setAlea] = React.useState(false);
  //Appel api
  const {movies, nbPage, loading, firstLoading} = useMovies(
    page,
    hitsPerPage,
    search,
    setPage,
    alea,
  );
  //#endregion

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        searchIcon={false}
        showLoading={false}
        placeholder="Recherche..."
        onChangeText={str => {
          setSearch(str); // Met a jours la recherche (cause un appel api)
        }}
        value={search}
      />
      <ImageBackground
        source={require('../img/background.jpg')}
        style={styles.background}>
        {firstLoading ? (
          <View style={[styles.activityIndicator, styles.horizontal]}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <FlatList
            style={styles.flatList}
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
                  <ActivityIndicator size="large" color="#ffffff" />
                </View>
              ) : (
                <View style={{width: 40}} />
              )
            }
            //#endregion
          />
        )}
        <Button
          title="Je ne sait pas quoi regarder"
          onPress={() => setAlea(!alea)}
        />
      </ImageBackground>
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
    height: 400,
    width: 200,
  },
  background: {
    flex: 1,
  },
  flatList: {
    paddingTop: '8%',
  },
});

export default ListMovieView;
