import Button from "@/components/button";
import Input from "@/components/input";
import { COLORS, QUERY_KEYS } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

export default function Index() {
  const domain = SecureStore.getItem("domain") || "";
  const token = SecureStore.getItem("token") || "";

  const createLinkSchema = z.object({
    url: z.string().url(),
    code: z.string().min(1),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      url: "",
      code: "",
    },
    resolver: zodResolver(createLinkSchema),
  });

  const queryClient = useQueryClient();

  const { mutate: create, isPending } = useMutation({
    mutationKey: [QUERY_KEYS.CREATE],
    mutationFn: async (data: z.infer<typeof createLinkSchema>) => {
      if (!domain || !token) {
        throw new Error("Domain or token missing");
      }

      const res = await fetch(`https://${domain}/admin/link/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      reset();
      alert("Link created");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.LINKS] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <SafeAreaView
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
          name="url"
          render={({ field }) => (
            <Input
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Enter URL"
            />
          )}
        />
        <Controller
          control={control}
          name="code"
          render={({ field }) => (
            <Input
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Short code"
            />
          )}
        />
        <Button
          disabled={!isValid || isPending}
          onPress={handleSubmit((data) => create(data))}
        >
          Create
        </Button>
      </View>
    </SafeAreaView>
  );
}
