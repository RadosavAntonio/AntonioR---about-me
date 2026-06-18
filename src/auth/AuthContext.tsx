import {
  FirebaseAuthTypes,
  getAuth,
  signInWithPhoneNumber,
} from '@react-native-firebase/auth'
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react'

// Fictional numbers registered in the Firebase console (Authentication → Phone →
// "Phone numbers for testing"). These bypass real verification in dev so they work
// on the iOS simulator. Real numbers are NOT listed here and keep full verification.
const TEST_PHONE_NUMBERS = ['+441111111111']

interface AuthContextValue {
  /** The E.164 number the current OTP was sent to, for display on the verify screen. */
  phoneNumber: string | null
  /** Send an OTP to the given E.164 number (e.g. +441111111111). Stores the confirmation. */
  sendCode: (e164PhoneNumber: string) => Promise<void>
  /** Confirm the OTP entered by the user against the pending confirmation. */
  confirmCode: (code: string) => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement => {
  // The confirmation result is not serialisable (it holds a verificationId +
  // confirm method), so it lives here in a ref rather than navigation params.
  const confirmationRef =
    useRef<FirebaseAuthTypes.ConfirmationResult | null>(null)
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null)

  const sendCode = useCallback(async (e164PhoneNumber: string) => {
    const auth = getAuth()
    // Dev only: disable app verification ONLY for the fictional test numbers so they
    // sign in without reCAPTCHA/APNs on the simulator. Set it explicitly each call so a
    // real number after a test number resets to full verification (and never in prod).
    if (__DEV__) {
      auth.settings.appVerificationDisabledForTesting =
        TEST_PHONE_NUMBERS.includes(e164PhoneNumber)
    }
    const confirmation = await signInWithPhoneNumber(auth, e164PhoneNumber)
    confirmationRef.current = confirmation
    setPhoneNumber(e164PhoneNumber)
  }, [])

  const confirmCode = useCallback(async (code: string) => {
    if (!confirmationRef.current) {
      throw new Error('No verification in progress. Request a new code.')
    }
    await confirmationRef.current.confirm(code)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({ phoneNumber, sendCode, confirmCode }),
    [phoneNumber, sendCode, confirmCode],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
