import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/constants";

export default function Links() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Your Links</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    gap: 20,
  },
  text: {
    fontFamily: "MonaSans-SemiBold",
    fontSize: 24,
    color: COLORS.text,
  },
});
