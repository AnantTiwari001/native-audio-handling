import React, { useEffect, useState } from 'react';
import {View, Text, Button} from 'react-native'
import { Audio } from 'expo-av';

const Example = () => {
  const [recording, setRecording] = useState(null);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    // Request permission to access the microphone
    const getMicrophonePermission = async () => {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Microphone permission not granted');
      }
    };

    getMicrophonePermission();

    return () => {
      // Clean up the recording and sound objects when the component unmounts
      if (recording) {
        recording.stopAndUnloadAsync();
      }
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      // Create a new recording object
      const recordingObject = new Audio.Recording();

      // Prepare the recording object
      await recordingObject.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);

      // Start the recording
      await recordingObject.startAsync();
    //   recordingObject

      setRecording(recordingObject);
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };

  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();

      // Get the playable sound object from the recording
      const { sound: soundObject } = await recording.createNewLoadedSoundAsync();

      setSound(soundObject);
    } catch (error) {
      console.error('Failed to stop recording:', error);
    }
  };

  const saveAudioToFile = async () => {
    try {
      // Check if a sound object is available
      if (sound) {
        const { sound: newSoundObject } = await sound.createAsync(
          { uri: Audio.RECORDING_OPTIONS_OUTPUT_FORMAT_MPEG_4 }, // Specify the desired output format
          { shouldPlay: false } // Set shouldPlay to false to prevent automatic playback
        );
        
        // Do something with the newSoundObject, e.g., save it to a file or upload it

        // Unload the sound object
        newSoundObject.unloadAsync();
      }
    } catch (error) {
      console.error('Failed to save audio:', error);
    }
  };

  return (
    <View>
      <Button onClick={startRecording} title='Start Recording'/>
      <Button onClick={stopRecording} title='Stop Recording'/>
      <Button onClick={saveAudioToFile} title='Save to file'/>
    </View>
  );
};

export default Example;