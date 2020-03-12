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
  Linking,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'App';
import {TouchableOpacity} from 'react-native-gesture-handler';

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
      <View
        style={{
          flexDirection: 'column',
          paddingHorizontal: '3%',
          paddingBottom: '3%',
          backgroundColor: Colors.dark,
        }}>
        <Text
          style={{
            fontSize: 27,
            color: Colors.white,
            textAlign: 'center',
            padding: '5%',
            fontWeight: 'bold',
          }}>
          {movie?.title}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() =>
              Linking.openURL('https://www.google.com/search?q=' + movie?.title)
            }>
            <Image style={styles.image} source={{uri: `${movie?.image}`}} />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'column',
              padding: '3%',
              width: 200,
            }}>
            <Text style={{fontSize: 20, color: Colors.white, padding: '3%'}}>
              Date de parution : {movie?.year}
            </Text>
            <Text style={{fontSize: 20, color: Colors.white, padding: '3%'}}>
              Genre : {movie?.genre.join(' / ')}
            </Text>
            <Text style={{fontSize: 20, color: Colors.white, padding: '3%'}}>
              Note : {movie?.score.toPrecision(2)}
            </Text>
            <Text style={{fontSize: 20, color: Colors.white, padding: '3%'}}>
              Description : Sed querebatur, quod omnibus in rebus homines
              diligentiores essent.
            </Text>
          </View>
        </View>
      </View>
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
  description: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  image: {
    marginLeft: 0,
    height: 400,
    width: 200,
  },
  imageContainer: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
});

export default MovieView;
