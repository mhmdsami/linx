import { View, Text, Pressable, Image } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, STORAGE_KEYS, QUERY_KEYS } from "@/constants";
import Input from "@/components/input";
import Button from "@/components/button";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import * as SecureStore from "expo-secure-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PlusCircle } from "lucide-react-native";

export default function Config() {
  const configSchema = z.object({
    token: z.string().min(1),
    domain: z
      .string()
      .min(1)
      .url()
      .transform((url) => new URL(url).hostname),
  });

  const {
    control,
    handleSubmit,
    getValues,
    formState: { isValid },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      token: SecureStore.getItem("token") || "",
      domain: SecureStore.getItem("domain") || "",
    },
    resolver: zodResolver(configSchema),
  });

  const setConfig = ({ token, domain }: z.infer<typeof configSchema>) => {
    SecureStore.setItem(STORAGE_KEYS.TOKEN, token);
    SecureStore.setItem(STORAGE_KEYS.DOMAIN, domain);
  };

  const clearConfig = () => {
    setValue("token", "");
    setValue("domain", "");
    SecureStore.deleteItemAsync(STORAGE_KEYS.TOKEN);
    SecureStore.deleteItemAsync(STORAGE_KEYS.DOMAIN);
  };

  const { mutate: validate, isPending } = useMutation({
    mutationKey: [QUERY_KEYS.CONFIG],
    mutationFn: async (domain: string) => {
      const res = await fetch(`https://${domain}/`);
      const data = await res.json();

      if (!data.success) {
        throw new Error("Invalid domain");
      }

      return data;
    },
    onSuccess: () => {
      try {
        setConfig(getValues());
        router.push("/");
      } catch (e) {
        console.error(e);
        alert("Error saving config");
      }
      alert("Config saved");
    },
    onError: () => {
      alert("Invalid domain");
    },
  });

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
          Config
        </Text>
        {watch("token") && watch("domain") && (
          <Pressable onPress={() => router.push("/")}>
            <PlusCircle stroke={COLORS.text} />
          </Pressable>
        )}
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.primary,
        }}
      >
        <View
          style={{
            display: "flex",
            gap: 10,
            width: "80%",
            alignItems: "center",
          }}
        >
          <Controller
            control={control}
            name="domain"
            render={({ field }) => (
              <Input
                placeholder="DOMAIN"
                onChangeText={field.onChange}
                value={field.value}
              />
            )}
          />
          <Controller
            control={control}
            name="token"
            render={({ field }) => (
              <Input
                placeholder="TOKEN"
                onChangeText={field.onChange}
                value={field.value}
              />
            )}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Button onPress={clearConfig} variant="destructive">
              Clear Config
            </Button>
            <Button
              onPress={handleSubmit(({ domain }) => validate(domain))}
              disabled={!isValid || isPending}
            >
              Validate & Save
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
