import { BORDER_RADIUS, getSize, SPACE, useTheme } from '@antonior/core'
import { TrueSheet } from '@lodev09/react-native-true-sheet'
import React, {
  forwardRef,
  memo,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { COUNTRIES, Country } from './countries'

export interface CountryCodePickerHandle {
  present: () => void
  dismiss: () => void
}

interface Props {
  onSelect: (country: Country) => void
}

const CountryCodePickerInner = (
  { onSelect }: Props,
  ref: React.Ref<CountryCodePickerHandle>,
) => {
  const sheetRef = useRef<any>(null)
  const { colors } = useTheme()
  const [query, setQuery] = useState('')

  useImperativeHandle(
    ref,
    () => ({
      present: () => sheetRef.current?.present(),
      dismiss: () => sheetRef.current?.dismiss(),
    }),
    [],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) {
      return COUNTRIES
    }
    return COUNTRIES.filter(
      c =>
        c.name.toLowerCase().includes(q) ||
        c.dialCode.includes(q) ||
        c.iso.toLowerCase().includes(q),
    )
  }, [query])

  const handleSelect = (country: Country) => {
    onSelect(country)
    setQuery('')
    sheetRef.current?.dismiss()
  }

  return (
    <TrueSheet
      ref={sheetRef}
      detents={[0.85]}
      scrollable
      backgroundColor={colors.background}
      onDidDismiss={() => setQuery('')}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          Select country
        </Text>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search country or code"
          placeholderTextColor={colors.textTertiary}
          autoCorrect={false}
          style={[
            styles.search,
            {
              backgroundColor: colors.surface,
              color: colors.textPrimary,
              borderColor: colors.surfaceSecondary,
            },
          ]}
        />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={item => item.iso}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleSelect(item)}
            style={({ pressed }) => [
              styles.row,
              pressed && { backgroundColor: colors.surface },
            ]}>
            <Text style={styles.flag}>{item.flag}</Text>
            <Text
              style={[styles.name, { color: colors.textPrimary }]}
              numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={[styles.dial, { color: colors.textSecondary }]}>
              {item.dialCode}
            </Text>
          </Pressable>
        )}
      />
    </TrueSheet>
  )
}

const Forwarded = forwardRef<CountryCodePickerHandle, Props>(
  CountryCodePickerInner,
)
export const CountryCodePicker = memo(Forwarded)

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: SPACE[24],
    paddingTop: SPACE[24],
    paddingBottom: SPACE[12],
  },
  title: {
    fontSize: getSize(18),
    fontWeight: '600',
    marginBottom: SPACE[16],
  },
  search: {
    height: getSize(44),
    borderRadius: BORDER_RADIUS[10],
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: SPACE[16],
    fontSize: getSize(16),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACE[12],
    paddingHorizontal: SPACE[24],
  },
  flag: {
    fontSize: getSize(22),
    marginRight: SPACE[16],
  },
  name: {
    flex: 1,
    fontSize: getSize(16),
  },
  dial: {
    fontSize: getSize(16),
    marginLeft: SPACE[12],
  },
})
