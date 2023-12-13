import { View, Text, Button } from "react-native";
import rough from "../rough";
// import Audio from  'expo-av';
// import LiveAudioStream from 'react-native-live-audio-stream';
import AudioRecord from 'react-native-audio-recording-stream';
import { Buffer } from "buffer";
import RNFS from 'react-native-fs';


const AudioPage = () => {
  //native package
  let Audiodata=[];
  const handleStream = async () => {
    console.log('hello wrold');
    const options = {
      sampleRate: 16000, // default 44100
      channels: 1, // 1 or 2, default 1
      bitsPerSample: 16, // 8 or 16, default 16
      audioSource: 6, // android only (see below)
      wavFile: 'test.wav', // default 'audio.wav'
      chunkSize: 4096, //8192
    };
    console.log(AudioRecord.init(options));
    AudioRecord.start();
    AudioRecord.on('data', data => {
      // base64-encoded audio data chunks
      // Audiodata.push(Buffer.from(data, 'base64'))
      console.log(data);
    });
    setTimeout(async () => {
      console.log('here!');
      AudioRecord.stop()
      // handleSave();
    }, 1000);
  };

  const handleSave= async()=>{
    const combinedBuffer= Buffer.concat(Audiodata);
    await RNFS.write(RNFS.DocumentDirectoryPath, '/combinedAudio.wav', combinedBuffer, 'base64');
    console.log('done successfully!');
  }

  return (
    <View>
      <Text style={{ fontSize: 21 }}>Audio Testing Part!</Text>
      <Button title="start" onPress={handleStream} />
    </View>
  );
};

export default AudioPage;
