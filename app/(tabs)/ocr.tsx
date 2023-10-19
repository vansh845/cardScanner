import { useIsFocused } from '@react-navigation/native';
import { Camera, CameraType } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'react-native';
import MlkitOcr from 'react-native-mlkit-ocr';


export default function CameraScreen() {

  const [photo, setPhoto] = useState('')
  const isFocused = useIsFocused()
  const cameraRef = useRef<Camera>(null)
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions()



  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log(photo)
      setPhoto(photo.uri)
    }
  }

  async function toText(){
      const resultFromUri = await MlkitOcr.detectFromFile(photo)
      console.log(resultFromUri.toString())
      return resultFromUri.toString()
    
  }

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
          
          {!photo?<Camera style={styles.camera} autoFocus type={type} ref={cameraRef} />:<Image source={{uri:photo}} style={styles.camera}/>}

        </View>
        <Button onPress={takePicture} title='Take picture' />
        <Button onPress={() => setType(type == CameraType.back ? CameraType.front : CameraType.back)} title='flip' />
        <Button onPress={toText} title='to text' />

      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    aspectRatio: 3 / 4
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