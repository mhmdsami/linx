import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/constants";
import Input from "@/components/input";
import Button from "@/components/button";

export default function Index() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.primary,
      }}
    >
      <View
        style={{
          display: "flex",
          gap: 10,
          width: "80%",
          alignItems: "center",
        }}
      >
        <Input placeholder="Enter url" />
        <Input placeholder="Short code" />
        <Button onPress={() => alert("Create pressed")}>Create</Button>
      </View>
    </SafeAreaView>
  );
}
