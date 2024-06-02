import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { Provider } from "react-redux";
import { PaperProvider, MD3LightTheme, MD3DarkTheme } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useColorScheme } from "@/hooks/useColorScheme";
import stores from "@/redux/stores";
import themes from "@/themes";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf")
  });
  const darkTheme = { ...MD3DarkTheme, colors: themes.darkTheme.colors };
  const lightTheme = { ...MD3LightTheme, colors: themes.lightTheme.colors };

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const themeApps = colorScheme === "dark" ? darkTheme : lightTheme;
  const queryClient = new QueryClient();

  return (
    <Provider store={stores}>
      <PaperProvider theme={themeApps}>
        <QueryClientProvider client={queryClient}>
          <Stack
            screenOptions={{
              headerTintColor: themeApps.colors.onBackground,
              headerStyle: {
                backgroundColor: themeApps.colors.background
              }
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="Home/index"
              options={{ headerShown: false, headerTitle: "Home" }}
            />
            <Stack.Screen
              name="ContactForm/[contactId]"
              options={{ headerTitle: "" }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>
        </QueryClientProvider>
      </PaperProvider>
    </Provider>
  );
}
