import * as React from 'react';
import {StyleSheet, View, Button} from 'react-native';

type NavButtonProps = {
  page: number;
  nbPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const NavButton: React.FC<NavButtonProps> = ({page, nbPage, setPage}) => {
  return (
    <View style={styles.fixToText}>
      <Button
        disabled={page <= 0}
        title="Previous"
        onPress={() => setPage(page - 1)}
      />
      <Button
        disabled={page >= nbPage - 1}
        title="Next"
        onPress={() => setPage(page + 1)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
  },
});

export default NavButton;
