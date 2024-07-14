import { SafeAreaView, Text, StyleSheet } from "react-native";
import { COLORS } from "@/constants";

export default function SignIn() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Sign In</Text>
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
