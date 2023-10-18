import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CameraScreen() {

  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions()

  if (!permission) {
    return <View />
  }

  if (!permission.granted) {
    return (
      <View>
        <Text>permission not granted</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Camera style={styles.camera} type={type}>
        </Camera>

      </View>
      <Button onPress={() => setType(type == CameraType.back ? CameraType.front : CameraType.back)} title='flip' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // paddingVertical: 30
  },
  camera: {
    flex: 1,
    aspectRatio: 3/4
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});