import { showInfo } from "@/app/utils";
import { COLORS, QUERY_KEYS, STORAGE_KEYS } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Clipboard from "expo-clipboard";
import * as SecureStore from "expo-secure-store";
import { Copy, Trash } from "lucide-react-native";
import { Platform, Text, View } from "react-native";

interface LinkCardProps {
  url: string;
  code: string;
  clicks: number;
}

export default function LinkCard({ url, code, clicks }: LinkCardProps) {
  const domain = SecureStore.getItem(STORAGE_KEYS.DOMAIN) || "";
  const token = SecureStore.getItem(STORAGE_KEYS.TOKEN) || "";

  const queryClient = useQueryClient();
  const { mutate: deleteLink, isPending } = useMutation({
    mutationKey: [QUERY_KEYS.DELETE],
    mutationFn: async (code: string) => {
      try {
        const res = await fetch(`https://${domain}/admin/link/${code}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => res.json());
      } catch (error) {
        console.error(error);
      }
    },
    onSuccess: () => {
      showInfo("Link deleted");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.LINKS] });
    },
  });

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
              maxWidth: "70%",
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
          <Copy
            stroke={COLORS.text}
            size={20}
            onPress={() => {
              if (Platform.OS === "ios") {
                Clipboard.setUrlAsync(`https://${domain}/${code}`);
              } else {
                Clipboard.setString(`https://${domain}/${code}`);
              }
            }}
          />
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
          <Trash
            stroke={COLORS.danger}
            size={20}
            onPress={() => {
              deleteLink(code);
            }}
          />
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
