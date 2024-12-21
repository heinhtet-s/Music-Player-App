import { playbackService } from "constants/playbackService";
import { colors } from "constants/tokens";
import { useLogTrackPlayerState } from "hooks/useLogTrackPlayerState";
import { useSetupTrackPlayer } from "hooks/useSetupTrackPlayer";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TrackPlayer from "react-native-track-player";
import { Text, View } from "react-native";
import "react-native-gesture-handler";
import { configureReanimatedLogger } from "react-native-reanimated";
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
  useTheme,
} from "@react-navigation/native";

import { Slot } from "expo-router";
SplashScreen.preventAutoHideAsync();

TrackPlayer.registerPlaybackService(() => playbackService);

const App = () => {
  const handleTrackPlayerLoaded = useCallback(() => {
    SplashScreen.hideAsync();
    console.log("hello");
  }, []);

  useSetupTrackPlayer({
    onLoad: handleTrackPlayerLoaded,
  });

  useLogTrackPlayerState();

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#000" }}>
        <ThemeProvider value={DarkTheme}>
          <RootNavigation />
        </ThemeProvider>
        <StatusBar style="auto" />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

// Inside the functional component
configureReanimatedLogger({
  strict: false,
});
const RootNavigation = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen
        name="player"
        options={{
          presentation: "modal",
          gestureEnabled: true,
          gestureDirection: "vertical",
          animationDuration: 400,
          headerShown: false,
          // animation: "slide_from_bottom",
        }}
      />

      {/* <Stack.Screen
        name="(modals)/addToPlaylist"
        options={{
          presentation: "modal",
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitle: "Add to playlist",
          headerTitleStyle: {
            color: colors.text,
          },
        }}
      /> */}
    </Stack>
  );
};

export default App;
