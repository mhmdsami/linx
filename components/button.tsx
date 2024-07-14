import { Pressable, StyleProp, Text, ViewStyle } from "react-native";
import { COLORS } from "@/constants";

interface ButtonProps extends React.ComponentProps<typeof Pressable> {
  children: string;
  style?: StyleProp<ViewStyle>;
}

export default function Button({ style, children, ...props }: ButtonProps) {
  return (
    <Pressable
      style={[
        {
          backgroundColor: COLORS.secondary,
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: COLORS.highlight,
          width: "auto",
        },
        style,
      ]}
      {...props}
    >
      <Text
        style={{
          color: COLORS.text,
          fontFamily: "MonaSans-SemiBold",
        }}
      >
        {children}
      </Text>
    </Pressable>
  );
}
