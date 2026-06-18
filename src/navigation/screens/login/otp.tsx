import { useNavigation } from '@react-navigation/native'
import React, { memo, useEffect, useState } from 'react'
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

const CODE_LENGTH = 6
const RESEND_SECONDS = 45

const OtpInit = (): React.ReactElement => {
  const navigation = useNavigation()
  const { colors } = useTheme()
  const { phoneNumber, confirmCode, sendCode } = useAuth()

  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Resend is gated behind a 45s countdown and allowed only once.
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS)
  const [hasResent, setHasResent] = useState(false)
  const [resending, setResending] = useState(false)

  useEffect(() => {
    if (secondsLeft <= 0) {
      return
    }
    const id = setTimeout(() => setSecondsLeft(s => s - 1), 1000)
    return () => clearTimeout(id)
  }, [secondsLeft])

  const handleVerify = async () => {
    if (code.length < CODE_LENGTH) {
      setError(`Enter the ${CODE_LENGTH}-digit code`)
      return
    }

    setError(null)
    setLoading(true)
    try {
      await confirmCode(code)
      navigation.reset({ index: 0, routes: [{ name: 'Tabs' as never }] })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid code')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (hasResent || !phoneNumber || resending) {
      return
    }
    setError(null)
    setResending(true)
    try {
      await sendCode(phoneNumber)
      setCode('')
      setHasResent(true)
      setSecondsLeft(RESEND_SECONDS)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not resend the code')
    } finally {
      setResending(false)
    }
  }

  const renderResend = () => {
    if (secondsLeft > 0) {
      return (
        <Text style={[styles.resendInfo, { color: colors.textTertiary }]}>
          Resend code in {secondsLeft}s
        </Text>
      )
    }
    if (!hasResent) {
      return (
        <Pressable onPress={handleResend} disabled={resending} hitSlop={SPACE[8]}>
          {resending ? (
            <ActivityIndicator color={colors.primary} />
          ) : (
            <Text style={[styles.resendLink, { color: colors.primary }]}>
              Resend code
            </Text>
          )}
        </Pressable>
      )
    }
    return (
      <Text style={[styles.resendInfo, { color: colors.textTertiary }]}>
        You can only resend once.
      </Text>
    )
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.textPrimary }]}>Verify</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Enter the {CODE_LENGTH}-digit code sent to{' '}
        <Text style={{ color: colors.textPrimary }}>
          {phoneNumber ?? 'your number'}
        </Text>
        .
      </Text>

      <TextInput
        value={code}
        onChangeText={text => setCode(text.replace(/\D/g, '').slice(0, CODE_LENGTH))}
        keyboardType="number-pad"
        maxLength={CODE_LENGTH}
        autoFocus
        style={[
          styles.codeInput,
          {
            backgroundColor: colors.surface,
            color: colors.textPrimary,
            borderColor: colors.surfaceSecondary,
          },
        ]}
      />

      <View style={styles.resendRow}>{renderResend()}</View>

      {error ? (
        <Text style={[styles.error, { color: colors.error }]}>{error}</Text>
      ) : null}

      <Pressable
        onPress={handleVerify}
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
            Verify
          </Text>
        )}
      </Pressable>
    </View>
  )
}

export const Otp = memo(OtpInit)

const styles = StyleSheet.create({
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
    marginBottom: SPACE[32],
  },
  codeInput: {
    height: getSize(56),
    borderRadius: BORDER_RADIUS[10],
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: SPACE[16],
    fontSize: getSize(24),
    letterSpacing: getSize(8),
    textAlign: 'center',
  },
  resendRow: {
    marginTop: SPACE[16],
    minHeight: getSize(20),
    ...centered,
  },
  resendInfo: {
    fontSize: getSize(14),
  },
  resendLink: {
    fontSize: getSize(14),
    fontWeight: '600',
  },
  error: {
    marginTop: SPACE[12],
    fontSize: getSize(14),
  },
  submit: {
    ...centered,
    height: getSize(52),
    borderRadius: BORDER_RADIUS[10],
    marginTop: SPACE[24],
  },
  submitLabel: {
    fontSize: getSize(16),
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.85,
  },
})
