import { Link } from "@/utils/types";
import LinkCard from "@/components/link-card";
import { COLORS, QUERY_KEYS, STORAGE_KEYS } from "@/constants";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Bolt } from "lucide-react-native";
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Links() {
  const token = SecureStore.getItem(STORAGE_KEYS.TOKEN);
  const domain = SecureStore.getItem(STORAGE_KEYS.DOMAIN);

  const {
    data: links,
    isLoading,
    isRefetching,
  } = useQuery({
    queryKey: [QUERY_KEYS.LINKS],
    queryFn: async () => {
      if (!token || !domain) {
        return [] as Link[];
      }

      try {
        const res = await fetch(`https://${domain}/admin/link/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => res.json());

        return res.data as Link[];
      } catch (error) {
        console.error(error);
        return [] as Link[];
      }
    },
    enabled: !!token && !!domain,
    refetchInterval: 1000 * 60 * 5,
  });

  const queryClient = useQueryClient();

  const onRefresh = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.LINKS] });
  };

  if (isLoading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: COLORS.primary,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 10,
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              color: COLORS.text,
              fontFamily: "MonaSans-Bold",
              fontSize: 24,
            }}
          >
            My Links
          </Text>
          <Pressable onPress={() => router.push("/config")}>
            <Bolt stroke={COLORS.text} />
          </Pressable>
        </View>
        <View
          style={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.primary,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 10,
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            color: COLORS.text,
            fontFamily: "MonaSans-Bold",
            fontSize: 24,
          }}
        >
          My Links
        </Text>
        <Pressable onPress={() => router.push("/config")}>
          <Bolt stroke={COLORS.text} />
        </Pressable>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} />
        }
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            padding: 20,
          }}
        >
          {links?.map((link, idx) => <LinkCard key={idx} {...link} />)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
