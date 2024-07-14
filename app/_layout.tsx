import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

export default function RootLayout() {
  SplashScreen.preventAutoHideAsync();

  const [loaded, error] = useFonts({
    "MonaSans-Regular": require("../assets/fonts/MonaSans-Regular.otf"),
    "MonaSans-Bold": require("../assets/fonts/MonaSans-Bold.otf"),
    "MonaSans-Medium": require("../assets/fonts/MonaSans-Medium.otf"),
    "MonaSans-SemiBold": require("../assets/fonts/MonaSans-SemiBold.otf"),
    "MonaSans-Light": require("../assets/fonts/MonaSans-Light.otf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen
          name="config"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
