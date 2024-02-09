import { Image, Text, View } from "react-native";

import { useLocalSearchParams, useNavigation } from "expo-router";

import { Feather } from "@expo/vector-icons";

import { PRODUCTS } from "@/utils/data/products";
import { formatCurrency } from "@/utils/functions/format-currency";

import { Button } from "@/components/button";
import { LinkButton } from "@/components/link-button";
import { useCartStore } from "@/stores/cart-store";

export default function Product() {
  const cartStore = useCartStore()
  const navigation = useNavigation()
  const { id } = useLocalSearchParams()

  const product = PRODUCTS.filter((item) => item.id === id)[0]

  function handleAddToCart() {
    cartStore.add(product)
    navigation.goBack()
  }

  return (
    <View className="flex-1">
      <Image
        className="w-full h-52"
        source={product?.cover}
        resizeMode="cover"
      />
      <View className="flex-1 p-5 mt-8">
        <Text className="text-lime-400 text-2xl font-heading my-2">
          {formatCurrency(product.price)}
        </Text>
        <Text className="text-slate-400 font-body text-base leading-6 mb-6">
          {product.description}
        </Text>
        {
          product.ingredients.map((ingredient) => (
            <Text
              className="text-slate-400 font-body text-base leading=6"
              key={ingredient}
            >
              {'\u2022'} {ingredient}
            </Text>
          ))
        }
      </View>
      <View className="p-5 pb-8 gap-5">
        <Button onPress={handleAddToCart}>
          <Button.Icon >
            <Feather name="plus-circle" size={20} />
          </Button.Icon>
          <Button.Text>
            {'Adicionar ao pedido'}
          </Button.Text>
        </Button>
        <LinkButton href="/" title="Voltar ao cardápio" />
      </View>
    </View>
  )
}