import { COLORS, ICONS } from "@/constants";
import { Tabs } from "expo-router";
import { Image, View, Text } from "react-native";

export default function AppLayout() {
  const tabs = [
    {
      name: "index",
      title: "Create",
      icon: ICONS.add,
    },
    {
      name: "links",
      title: "My Links",
      icon: ICONS.link,
    },
  ];

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: COLORS.secondary,
          borderTopColor: COLORS.tertiary,
          paddingTop: 10,
        },
      }}
    >
      {tabs.map(({ name, title, icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <Image
                  source={icon}
                  resizeMode="contain"
                  style={{
                    width: 20,
                  }}
                />
                <Text
                  style={{
                    color: COLORS.text,
                    fontFamily: "MonaSans-Bold",
                    fontSize: 10,
                  }}
                >
                  {title}
                </Text>
              </View>
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
