import * as React from 'react';
import useMovie from '../domaineMovies/Movie';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableHighlight,
  FlatList,
  SafeAreaView,
  Linking,
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
      <Image style={styles.itemImage} source={{uri: `${movie?.image}`}} />
      <Text style={styles.itemTitle}>{movie?.title}</Text>
      <Text style={styles.itemDescription}>{movie?.year}</Text>
      <Text style={styles.itemDescription}>{movie?.genre.join(' / ')}</Text>
      <FlatList
        data={movie?.actor_facets}
        renderItem={({item}) => <Item actor={item} navigation={navigation} />}
        keyExtractor={item => item}
      />
    </SafeAreaView>
  );
};

function Item({actor, navigation}: {actor: string; navigation: any}) {
  return (
    <TouchableHighlight
      onPress={
        () =>
          navigation.push('Actor', {
            actorName: getUrlImgAndNameFromActor_Facets(actor)[1],
          })
        // Linking.openURL(
        //   'https://www.google.com/search?q=' +
        //     getUrlImgAndNameFromActor_Facets(actor)[1],
        // )
      }>
      <View style={styles.actorList}>
        <Image
          style={styles.avatar}
          source={{uri: `${getUrlImgAndNameFromActor_Facets(actor)[0]}`}}
        />
        <Text style={styles.itemTitle}>
          {getUrlImgAndNameFromActor_Facets(actor)[1]}
        </Text>
      </View>
    </TouchableHighlight>
  );
}

function getUrlImgAndNameFromActor_Facets(s: string): string[] {
  let url = s.split('|');
  return url;
}

const styles = StyleSheet.create({
  actorList: {
    flexDirection: 'row',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  avatar: {
    margin: 10,
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
  },
  actorname: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
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
  container: {
    flex: 1,
  },
});

export default MovieView;
