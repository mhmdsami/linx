import { Pressable, StyleProp, Text, ViewStyle } from "react-native";
import { COLORS } from "@/constants";

interface ButtonProps extends React.ComponentProps<typeof Pressable> {
  children: string;
  style?: StyleProp<ViewStyle>;
  variant?: "primary" | "destructive";
}

export default function Button({
  style,
  children,
  variant = "primary",
  disabled,
  ...props
}: ButtonProps) {
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
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
      disabled={disabled}
      {...props}
    >
      <Text
        style={{
          color: variant === "destructive" ? COLORS.danger : COLORS.text,
          fontFamily: "MonaSans-Bold",
        }}
      >
        {children}
      </Text>
    </Pressable>
  );
}
