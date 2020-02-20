import * as React from 'react';
import useMovies from '../domaineMovies/Movies';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'App';
import {SearchBar} from 'react-native-elements';
import MovieItemList from '../domaineMovies/component/MovieItemList';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Movies'
>;

type ListMovieViewProps = {
  navigation: ProfileScreenNavigationProp;
};

const ListMovieView: React.FC<ListMovieViewProps> = ({navigation}) => {
  const [search, setSearch] = React.useState('');
  const [page, setPage] = React.useState(0);
  const {movies, loading, nbPage} = useMovies(page, 10, search);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <SearchBar
          searchIcon={false}
          showLoading={false}
          lightTheme={true}
          placeholder="Search..."
          onChangeText={str => {
            setSearch(str), setPage(0);
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
          onEndReached={() => {
            setPage(page + 1);
          }}
          onEndReachedThreshold={0.1}
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
