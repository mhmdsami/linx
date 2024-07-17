import { Platform, ToastAndroid } from "react-native";

export function showInfo(message: string) {
  if (Platform.OS === "android") {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    alert(message);
  }
}
