import { useCallback, useState } from "react"

import { Alert, Linking, ScrollView, Text, View } from "react-native"

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

import { useCartStore } from "@/stores/cart-store"

import { Header } from "@/components/header"
import { Product } from "@/components/product"
import { formatCurrency } from "@/utils/functions/format-currency"
import { Input } from "@/components/input"
import { Button } from "@/components/button"
import { Feather } from "@expo/vector-icons"
import { LinkButton } from "@/components/link-button"
import { ProductProps } from "@/utils/data/products"
import { useNavigation } from "expo-router"

const PHONE_NUMBER = '5531993632661'

export default function Cart() {
  const [address, setAddress] = useState("")

  const cartStore = useCartStore()

  const navigation = useNavigation()

  const total = formatCurrency(cartStore.products.reduce((total, product) => {
    return total + product.price * product.quantity
  }, 0))

  const handleProductRemove = useCallback((product: ProductProps) => {
    Alert.alert('Remover produto', `Deseja remover o produto ${product.title} do carrinho?`, [{
      text: 'Cancelar',
    },
    {
      text: 'Remover',
      onPress: () => cartStore.remove(product.id)
    }
    ])
  }, [])

  function handleOrder() {
    if (address.trim().length === 0) {
      Alert.alert('Endereço', 'Informe o endereço de entrega.')
    }

    const products = cartStore.products.map((product) => (
      `\n x${product.quantity} ${product.title}`
    )).join('')

    const message = `
    🍔 NOVO PEDIDO
    \n Entregar em: ${address.trim()}
    ${products}
    \n Valor total: ${total}
    `

    Linking.openURL(`https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`)

    cartStore.clear()
    navigation.goBack()
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Carrinho" />

      <KeyboardAwareScrollView>
        <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
          <View className="p-5 flex-1">
            {cartStore.products.length > 0 ? (
              <View className="border-b border-slate-800">
                {cartStore.products.map((product) => (
                  <Product
                    data={product}
                    onPress={() => handleProductRemove(product)}
                    key={product.id}
                  />
                ))}
              </View>
            ) : (
              <Text className="font-body text-slate-400 text-center my-8">
                {'Seu carrinho está vazio.'}
              </Text>
            )}
            <View className="flex-row gap-2 items-center mt-5 mb-4">
              <Text className="text-white font-subtitle text-xl">
                {'Total:'}
              </Text>
              <Text className="text-lime-400 text-2xl font-heading ">
                {total}
              </Text>
            </View>
            <Input
              placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento..."
              onChangeText={setAddress}
              onSubmitEditing={handleOrder}
              returnKeyType="next"
              blurOnSubmit
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
      <View className="p-5 gap-5">
        <Button onPress={handleOrder}>
          <Button.Text>
            {'Finalizar compra'}
          </Button.Text>
          <Button.Icon>
            <Feather name="arrow-right-circle" size={20} />
          </Button.Icon>
        </Button>
        <LinkButton title="Voltar ao cardápio" href="/" />
      </View>
    </View>
  )
}