import * as React from 'react';
import {StyleSheet, View, Text, Image, TouchableHighlight} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

type ActorItemListProps = {
  navigation: any;
  actor: string;
};

const ActorItemList: React.FC<ActorItemListProps> = ({actor, navigation}) => {
  const actor_Facets_Name = actor.split('|');
  return (
    <TouchableHighlight
      onPress={() =>
        navigation.push('Actor', {
          actorFacets: actor_Facets_Name[0],
          actorName: actor_Facets_Name[1],
        })
      }>
      <View style={styles.actorList}>
        <Image
          style={styles.avatar}
          source={{uri: `${actor_Facets_Name[0]}`}}
        />
        <Text style={styles.actorname}>{actor_Facets_Name[1]}</Text>
      </View>
    </TouchableHighlight>
  );
};

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
});

export default ActorItemList;
