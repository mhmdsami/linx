import { COLORS } from "@/constants";
import { forwardRef } from "react";
import { Text, TextInput, View } from "react-native";

interface InputProps extends React.ComponentProps<typeof TextInput> {
  errorMessage?: string;
}

const Input = forwardRef<TextInput, InputProps>(
  ({ style, errorMessage, ...props }, ref) => {
    return (
      <View
        style={{
          width: "100%",
        }}
      >
        <TextInput
          ref={ref}
          style={[
            {
              backgroundColor: COLORS.secondary,
              color: COLORS.text,
              paddingHorizontal: 15,
              paddingVertical: 10,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: errorMessage ? COLORS.danger : COLORS.highlight,
              fontFamily: "MonaSans-Medium",
              width: "100%",
            },
            style,
          ]}
          placeholderTextColor={COLORS.placeholder}
          {...props}
        />
        <Text
          style={{
            color: COLORS.danger,
            fontFamily: "MonaSans-Medium",
            fontSize: 12,
            marginTop: 5,
            display: errorMessage ? "flex" : "none",
          }}
        >
          {errorMessage}
        </Text>
      </View>
    );
  },
);

export default Input;
