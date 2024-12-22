// import { FloatingPlayer } from "@/components/FloatingPlayer";
import { colors, fontSize } from "constants/tokens";
import {
  FontAwesome,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Text, PlatformPressable } from "@react-navigation/elements";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import { FloatingPlayer } from "components/FloatingPlayer";

function MyTabBar({ state, descriptors, navigation }: any) {
  const { buildHref } = useLinkBuilder();

  return (
    <View
      style={{
        flexDirection: "row",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderTopWidth: 0,
        marginBottom: 10,
      }}
    >
      <BlurView
        intensity={20}
        style={{
          ...StyleSheet.absoluteFillObject,
          overflow: "hidden",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      />
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const getBottomIcon = () => {
          if (route.name === "favourites") {
            return (
              <FontAwesome
                name="heart"
                size={20}
                width={20}
                color={isFocused ? colors.primary : colors.textMuted}
              />
            );
          } else if (route.name === "playlists") {
            return (
              <MaterialCommunityIcons
                name="playlist-play"
                size={28}
                width={28}
                color={isFocused ? colors.primary : colors.textMuted}
              />
            );
          } else if (route.name === "(songs)") {
            return (
              <Ionicons
                name="musical-notes-sharp"
                size={24}
                width={24}
                color={isFocused ? colors.primary : colors.textMuted}
              />
            );
          } else if (route.name === "artists") {
            return (
              <FontAwesome6
                name="users-line"
                size={20}
                width={24}
                color={isFocused ? colors.primary : colors.textMuted}
              />
            );
          }
        };

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={route.key}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 10, // Adjust padding for spacing
            }}
          >
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {getBottomIcon()}
              <Text
                style={{
                  color: isFocused ? colors.primary : colors.textMuted,
                  fontSize: 12, // Adjust font size for better spacing
                  marginTop: 4, // Add margin between icon and text
                }}
              >
                {label}
              </Text>
            </View>
          </PlatformPressable>
        );
      })}
    </View>
  );
}

const TabsNavigation = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs
        tabBar={(props) => <MyTabBar {...props} />}
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarLabelStyle: {
            fontSize: fontSize.xs,
            fontWeight: "500",
          },

          headerShown: false,
          // tabBarStyle: {
          //   position: "absolute",
          //   borderTopLeftRadius: 20,
          //   borderTopRightRadius: 20,
          //   borderTopWidth: 0,
          //   bottom: 30,
          // },
          // tabBarItemStyle: {
          //   flex: 1,
          //   justifyContent: "center",
          //   alignItems: "center",
          //   paddingTop: 15,
          //   paddingBottom: 15,
          // },
          // tabBarBackground: () => (
          //   <BlurView
          //     intensity={20}
          //     style={{
          //       ...StyleSheet.absoluteFillObject,
          //       overflow: "hidden",
          //       borderTopLeftRadius: 20,
          //       borderTopRightRadius: 20,
          //     }}
          //   />
          // ),
        }}
      >
        <Tabs.Screen
          name="favourites"
          options={{
            title: "Favorites",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="heart" size={20} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="playlists"
          options={{
            title: "Playlists",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="playlist-play"
                size={28}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(songs)"
          options={{
            title: "Songs",
            tabBarIcon: ({ color }) => (
              <Ionicons name="musical-notes-sharp" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="artists"
          options={{
            title: "Artists",
            tabBarIcon: ({ color }) => (
              <FontAwesome6 name="users-line" size={20} color={color} />
            ),
          }}
        />
      </Tabs>

      <FloatingPlayer
        style={{
          position: "absolute",
          left: 8,
          right: 8,
          bottom: 78,
        }}
      />
    </SafeAreaView>
  );
};

export default TabsNavigation;
