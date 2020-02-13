import * as React from 'react';
import useMovie from '../domaineMovies/Movie';
import {Text, View, Image, StyleSheet, ActivityIndicator} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from 'App';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

type MovieViewProps = {
  route: ProfileScreenRouteProp;
};

const MovieView: React.FC<MovieViewProps> = ({route}) => {
  const {objectId} = route.params;
  const {movie, loading} = useMovie(objectId);

  return loading ? (
    <ActivityIndicator size="large" color="#0000ff" />
  ) : (
    <View style={styles.item}>
      <Image style={styles.itemImage} source={{uri: `${movie?.image}`}} />
      <Text style={styles.itemTitle}>{movie?.title}</Text>
      <Text style={styles.itemDescription}>{movie?.year}</Text>
      <Text style={styles.itemDescription}>{movie?.genre.join(' / ')}</Text>
    </View>
  );
};

function getUrlImgAndNameFromActor_Facets(s: string): string[] {
  let url = s.split('|');
  return url;
}

const styles = StyleSheet.create({
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

export default MovieView;
