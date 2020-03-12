import * as React from 'react';
import MovieItemList from '../component/MovieItemList';
import useMoviesByActor from '../domaineMovies/MoviesByActor';
import {
  StyleSheet,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Linking,
  ToastAndroid,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  Image,
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
  const {actorFacets} = route.params;
  const [page, setPage] = React.useState(0);
  const {movies, loading, nbPage} = useMoviesByActor(page, 5, actorName);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../img/background.jpg')}
        style={styles.background}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() =>
            Linking.openURL('https://www.google.com/search?q=' + actorName)
          }>
          <View
            style={{
              flexDirection: 'row',
              padding: '3%',
              backgroundColor: 'rgba(0,0,0,1)',
            }}>
            <Image
              style={{
                height: 50,
                width: 50,
                borderRadius: 50 / 2,
              }}
              source={{uri: `${actorFacets}`}}
            />
            <Text
              style={{
                margin: '1%',
                height: 35,
                fontSize: 24,
                color: 'rgba(256,256,256,1)',
              }}>
              Filmographie de {actorName} :
            </Text>
          </View>
        </TouchableOpacity>
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
          onEndReachedThreshold={0.01}
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
              <View style={{width: 40}} />
            )
          }
          //#endregion
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
    paddingTop: 50,
    padding: 20,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
  },
  imageContainer: {
    alignItems: 'center',
  },
});

export default ActorView;
