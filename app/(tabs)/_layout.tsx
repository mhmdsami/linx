import { COLORS } from "@/constants";
import { Redirect, Tabs } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Link2, PlusCircle } from "lucide-react-native";
import { Text, View } from "react-native";

export default function AppLayout() {
  const tabs = [
    {
      name: "index",
      title: "Create",
      icon: <PlusCircle stroke={COLORS.text} />,
    },
    {
      name: "links",
      title: "My Links",
      icon: <Link2 stroke={COLORS.text} />,
    },
  ];

  if (!SecureStore.getItem("token")) {
    return <Redirect href="/config" />;
  }

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
            tabBarIcon: () => (
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                {icon}
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
