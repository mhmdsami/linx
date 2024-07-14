import LinkCard from "@/components/link-card";
import { COLORS } from "@/constants";
import { router } from "expo-router";
import { Bolt } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Links() {
  const links = [
    {
      url: "https://gist.github.com/mhmdsami/c38086281cd4564693f35b6e5b0793de",
      code: "git-conventions",
      clicks: 0,
    },
    {
      url: "https://github.com/srm-kzilla",
      code: "srmkzilla",
      clicks: 115,
    },
    {
      url: "https://github.com/srm-kzilla",
      code: "srmkzilla",
      clicks: 115,
    },
    {
      url: "https://github.com/srm-kzilla",
      code: "srmkzilla",
      clicks: 115,
    },
  ];
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.primary,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 10,
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            color: COLORS.text,
            fontFamily: "MonaSans-Bold",
            fontSize: 24,
          }}
        >
          My Links
        </Text>
        <Pressable onPress={() => router.push("/config")}>
          <Bolt stroke={COLORS.text} />
        </Pressable>
      </View>
      <ScrollView>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            padding: 20,
          }}
        >
          {links.map((link, idx) => (
            <LinkCard key={idx} {...link} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
