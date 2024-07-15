import { COLORS } from "@/constants";
import { TextInput } from "react-native";

interface InputProps extends React.ComponentProps<typeof TextInput> {}

export default function Input({ style, ...props }: InputProps) {
  return (
    <TextInput
      style={[
        {
          backgroundColor: COLORS.secondary,
          color: COLORS.text,
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: COLORS.highlight,
          fontFamily: "MonaSans-Medium",
          width: "100%",
        },
        style,
      ]}
      placeholderTextColor={COLORS.placeholder}
      {...props}
    />
  );
}
