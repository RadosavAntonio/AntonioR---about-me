import { useNavigation } from '@react-navigation/native'
import React, { memo, useRef, useState } from 'react'
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { BORDER_RADIUS, centered, getSize, SPACE, useTheme } from '@antonior/core'
import { useAuth } from '../../../auth/AuthContext'
import { AnimatedBackground } from './AnimatedBackground'
import {
  CountryCodePicker,
  CountryCodePickerHandle,
} from './CountryCodePicker'
import { Country, DEFAULT_COUNTRY } from './countries'

// Strip everything but digits, then drop the trunk-prefix zero so a UK "07911..."
// becomes "7911..." before the dial code is prepended.
const toNationalNumber = (raw: string): string =>
  raw.replace(/\D/g, '').replace(/^0+/, '')

const LoginInit = (): React.ReactElement => {
  const navigation = useNavigation()
  const { colors } = useTheme()
  const { sendCode } = useAuth()
  const pickerRef = useRef<CountryCodePickerHandle>(null)

  const [country, setCountry] = useState<Country>(DEFAULT_COUNTRY)
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSendCode = async () => {
    const national = toNationalNumber(phone)
    if (national.length < 4) {
      setError('Enter a valid mobile number')
      return
    }

    setError(null)
    setLoading(true)
    try {
      await sendCode(`${country.dialCode}${national}`)
      navigation.navigate('Otp' as never)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not send the code')
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.root}>
      <AnimatedBackground />
      <View style={styles.container}>
      <Text style={[styles.title, { color: colors.textPrimary }]}>Sign in</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Enter your mobile number to receive a verification code.
      </Text>

      <View style={styles.inputRow}>
        <Pressable
          onPress={() => pickerRef.current?.present()}
          style={({ pressed }) => [
            styles.codeButton,
            { backgroundColor: colors.surface, borderColor: colors.surfaceSecondary },
            pressed && styles.pressed,
          ]}>
          <Text style={styles.flag}>{country.flag}</Text>
          <Text style={[styles.code, { color: colors.textPrimary }]}>
            {country.dialCode}
          </Text>
          <Text style={[styles.caret, { color: colors.textTertiary }]}>▾</Text>
        </Pressable>

        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder="Mobile number"
          placeholderTextColor={colors.textTertiary}
          keyboardType="phone-pad"
          style={[
            styles.phoneInput,
            {
              backgroundColor: colors.surface,
              color: colors.textPrimary,
              borderColor: colors.surfaceSecondary,
            },
          ]}
        />
      </View>

      {error ? (
        <Text style={[styles.error, { color: colors.error }]}>{error}</Text>
      ) : null}

      <Pressable
        onPress={handleSendCode}
        disabled={loading}
        style={({ pressed }) => [
          styles.submit,
          { backgroundColor: colors.primary },
          (pressed || loading) && styles.pressed,
        ]}>
        {loading ? (
          <ActivityIndicator color={colors.textOnPrimary} />
        ) : (
          <Text style={[styles.submitLabel, { color: colors.textOnPrimary }]}>
            Send code
          </Text>
        )}
      </Pressable>
      </View>

      <CountryCodePicker ref={pickerRef} onSelect={setCountry} />
    </View>
  )
}

export const Login = memo(LoginInit)

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: SPACE[24],
  },
  title: {
    fontSize: getSize(28),
    fontWeight: 'bold',
    marginBottom: SPACE[8],
  },
  subtitle: {
    fontSize: getSize(16),
    marginBottom: SPACE[24],
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  codeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: getSize(52),
    paddingHorizontal: SPACE[12],
    borderRadius: BORDER_RADIUS[10],
    borderWidth: StyleSheet.hairlineWidth,
    marginRight: SPACE[8],
  },
  flag: {
    fontSize: getSize(20),
    marginRight: SPACE[8],
  },
  code: {
    fontSize: getSize(16),
    fontWeight: '600',
  },
  caret: {
    fontSize: getSize(12),
    marginLeft: SPACE[4],
  },
  phoneInput: {
    flex: 1,
    height: getSize(52),
    borderRadius: BORDER_RADIUS[10],
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: SPACE[16],
    fontSize: getSize(16),
  },
  error: {
    marginTop: SPACE[12],
    fontSize: getSize(14),
  },
  submit: {
    ...centered,
    height: getSize(52),
    borderRadius: BORDER_RADIUS[10],
    marginTop: SPACE[16],
  },
  submitLabel: {
    fontSize: getSize(16),
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.85,
  },
})
