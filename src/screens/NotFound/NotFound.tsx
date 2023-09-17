import * as React from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { RootStackParamList } from '@src/layout/Screens';

export const NotFound = ({ route, navigation }: StackScreenProps<RootStackParamList>) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>404 Not Found ({route.path})</Text>
      <Button
        mode='contained'
        onPress={() => {
          navigation.navigate('Home');
        }}
        style={styles.button}
      >
        Go to home
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  button: {
    margin: 24,
  },
});
