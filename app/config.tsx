import Button from "@/components/button";
import Input from "@/components/input";
import { COLORS, QUERY_KEYS, STORAGE_KEYS } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { PlusCircle } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

export default function Config() {
  const configSchema = z.object({
    token: z.string().min(1, { message: "Token is required " }),
    domain: z
      .string()
      .min(1, { message: "Domain is required" })
      .url({ message: "Enter a valid domain" })
      .transform((url) => new URL(url).hostname),
  });

  const token = SecureStore.getItem("token");
  const domain = SecureStore.getItem("domain");

  const {
    control,
    handleSubmit,
    getValues,
    formState: { isValid, errors },
    setValue,
  } = useForm({
    defaultValues: {
      token: token || "",
      domain: domain ? `https://${domain}` : "",
    },
    resolver: zodResolver(configSchema),
    mode: "onChange",
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

  const { mutate: validate, isPending: isValidating } = useMutation({
    mutationKey: [QUERY_KEYS.CONFIG],
    mutationFn: async (domain: string) => {
      const res = await fetch(`https://${domain}/`);
      const data = await res.json();

      if (!data.success) {
        throw new Error("Invalid domain");
      }

      return domain;
    },
    onSuccess: () => {
      try {
        setConfig(configSchema.parse(getValues()));
        router.replace("/");
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
        {getValues("token") && getValues("domain") && (
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
                errorMessage={errors.domain?.message}
                {...field}
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
                errorMessage={errors.token?.message}
                {...field}
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
              disabled={!isValid || isValidating}
            >
              Validate & Save
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
