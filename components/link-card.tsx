import { COLORS } from "@/constants";
import { Copy } from "lucide-react-native";
import { Text, View } from "react-native";

interface LinkCardProps {
  url: string;
  code: string;
  clicks: number;
}

export default function LinkCard({ url, code, clicks }: LinkCardProps) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 7,
        padding: 10,
        backgroundColor: COLORS.secondary,
        borderRadius: 10,
        borderColor: COLORS.highlight,
        borderWidth: 1,
      }}
    >
      <View
        style={{
          padding: 10,
          backgroundColor: COLORS.tertiary,
          borderRadius: 10,
          borderColor: COLORS.highlight,
          borderWidth: 1,
        }}
      >
        <Text
          style={{
            color: COLORS.text,
            fontFamily: "MonaSans-SemiBold",
            overflow: "scroll",
          }}
        >
          {url}
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 5,
        }}
      >
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 10,
            backgroundColor: COLORS.tertiary,
            borderRadius: 10,
            borderColor: COLORS.highlight,
            borderWidth: 1,
            flexGrow: 1,
          }}
        >
          <Text
            style={{
              color: COLORS.text,
              fontFamily: "MonaSans-SemiBold",
              overflow: "hidden",
              maxWidth: "85%",
              height: 20,
            }}
          >
            {code}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLORS.tertiary,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: COLORS.highlight,
          }}
        >
          <Copy stroke={COLORS.text} size={20} />
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          backgroundColor: COLORS.tertiary,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            fontFamily: "MonaSans-SemiBold",
            color: COLORS.text,
            fontSize: 16,
            flexGrow: 1,
          }}
        >
          clicks
        </Text>
        <Text
          style={{
            fontFamily: "MonaSans-Bold",
            color: COLORS.text,
            fontSize: 32,
          }}
        >
          {clicks}
        </Text>
      </View>
    </View>
  );
}
