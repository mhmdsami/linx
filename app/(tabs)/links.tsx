import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, ICONS } from "@/constants";
import LinkCard from "@/components/link-card";

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
      <Text
        style={{
          color: COLORS.text,
          fontFamily: "MonaSans-Bold",
          fontSize: 24,
          paddingTop: 10,
          paddingHorizontal: 20,
        }}
      >
        My Links
      </Text>
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
