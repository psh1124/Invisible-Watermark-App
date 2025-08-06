import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/Homescreen';
import ProfileScreen from './src/screens/ProfileScreen';
import WatermarEmbedingScreen from './src/screens/WatermarkEmbedingScreen';
import WatermarkDetectionScreen from './src/screens/WatermarkDetectionScreen';
import type { RootStackParamList } from './src/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile">
          {(props) => <ProfileScreen {...props} />}
        </Stack.Screen>
        {/* <Stack.Screen name="WatermarkEmbeding" component={WatermarEmbedingScreen} /> */}
        <Stack.Screen name="WatermarkDetection" component={WatermarkDetectionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}