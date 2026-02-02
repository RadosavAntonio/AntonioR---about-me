import { TrueSheet } from '@lodev09/react-native-true-sheet'
import React, { forwardRef, memo, useImperativeHandle, useRef } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

export interface AppBottomSheetHandle {
  present: () => Promise<void> | void
  dismiss: () => Promise<void> | void
}

interface Props {
  id?: string
}

const AppBottomSheetInner = (
  _: Props,
  ref: React.Ref<AppBottomSheetHandle>,
) => {
  const sheetRef = useRef<any>(null)

  useImperativeHandle(
    ref,
    () => ({
      present: () => sheetRef.current?.present(),
      dismiss: () => sheetRef.current?.dismiss(),
    }),
    [],
  )

  return (
    <TrueSheet ref={sheetRef} detents={['auto', 1]}>
      <View style={styles.container}>
        <Text style={styles.title}>Hello from the Bottom Sheet</Text>
        <Text style={styles.text}>This is the content of the sheet.</Text>
        <View style={styles.button}>
          <Button title="Close" onPress={() => sheetRef.current?.dismiss()} />
        </View>
      </View>
    </TrueSheet>
  )
}

const Forwarded = forwardRef<AppBottomSheetHandle, Props>(AppBottomSheetInner)
export const AppBottomSheet = memo(Forwarded)

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  text: { fontSize: 14, color: '#333', marginBottom: 12 },
  button: { marginTop: 8, width: '100%' },
})
