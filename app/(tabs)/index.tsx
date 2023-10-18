import { StyleSheet } from 'react-native';
import { usePhotoStore } from '../../store';
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { useState } from 'react';
import { Image } from 'react-native/Libraries/Image/Image';

export default function TabOneScreen() {

  const {photo,status} = usePhotoStore()
  if(status){
    console.log(photo)
    return (
      <View style={styles.container}>
        <Image style={{ width: 300, height: 300 }} source={{uri:photo}}/>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Main Page</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
