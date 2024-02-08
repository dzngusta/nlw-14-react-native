import { View, FlatList } from 'react-native'

import { CATEGORIES } from '@/utils/data/products'

import { CategoryButton } from '@/components/category-button'
import { Header } from '@/components/header'
import { useState } from 'react'

export default function Home() {
  const [category, setCategory] = useState(CATEGORIES[0])

  function handleCategorySelect(selectedCategory: string) {
    setCategory(selectedCategory)
  }

  return (
    <View className={'flex-1'}>
      <Header title='Faça seu pedido' cartQuantityItems={3} />
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
    </View>
  )
}