import { useState, useRef } from 'react'

import { View, FlatList, SectionList, Text } from 'react-native'

import { useCartStore } from '@/stores/cart-store'

import { CATEGORIES, MENU, ProductProps } from '@/utils/data/products'

import { CategoryButton } from '@/components/category-button'
import { Header } from '@/components/header'
import { Product } from '@/components/product'
import { Link } from 'expo-router'

export default function Home() {
  const [category, setCategory] = useState(CATEGORIES[0])

  const cartStore = useCartStore()
  const cartQuantityItems = cartStore.products.reduce((acc, product) => acc + product.quantity, 0)

  const sectionListRef = useRef<SectionList<ProductProps>>(null)

  function handleCategorySelect(selectedCategory: string) {
    setCategory(selectedCategory)

    const sectionIndex = MENU.findIndex((section) => section.title === selectedCategory)

    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex,
        itemIndex: 0,
        viewPosition: 0
      })
    }
  }

  return (
    <View className={'flex-1'}>
      <Header title='Faça seu pedido' cartQuantityItems={cartQuantityItems} />
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        className='max-h-10 mt-5'
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
        renderItem={({ item }) => (
          <CategoryButton
            title={item}
            isSelected={item === category}
            onPress={() => handleCategorySelect(item)}
          />
        )}
      />
      <SectionList
        ref={sectionListRef}
        sections={MENU}
        className='flex-1 p-5'
        contentContainerStyle={{ paddingBottom: 56 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <Product data={item} />
          </Link>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className='text-xl text-white font-heading mt-8 mb-3'>
            {title}
          </Text>
        )}
      />
    </View>
  )
}