import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut as firebaseSignOut,
  updateProfile,
  reauthenticateWithCredential,
  EmailAuthProvider,
  type User as FirebaseUser,
} from 'firebase/auth'

import { auth } from '@/services/firebase'
import { STORAGE_KEYS } from '@/store/persist'

export type UserData = {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  providerId: string
}

export type SessionState = {
  user: UserData | null
  isLoading: boolean
  error: string | null

  // Actions
  initialize: () => void
  loginWithEmail: (email: string, password: string) => Promise<void>
  registerWithEmail: (
    email: string,
    password: string,
    displayName: string,
  ) => Promise<void>
  loginWithGoogle: () => Promise<void>
  loginWithGithub: () => Promise<void>
  logout: () => Promise<void>
  clearError: () => void
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>
}

const mapFirebaseUser = (user: FirebaseUser): UserData => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
  providerId: user.providerData[0]?.providerId ?? '',
})

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: true,
      error: null,

      initialize: () => {
        onAuthStateChanged(auth, (firebaseUser) => {
          if (firebaseUser) {
            set({ user: mapFirebaseUser(firebaseUser), isLoading: false })
          } else {
            set({ user: null, isLoading: false })
          }
        })
      },

      loginWithEmail: async (email, password) => {
        set({ isLoading: true, error: null })
        try {
          const result = await signInWithEmailAndPassword(auth, email, password)
          set({ user: mapFirebaseUser(result.user), isLoading: false })
        } catch (err) {
          const message =
            err instanceof Error ? err.message : 'Error al iniciar sesión'
          set({ error: message, isLoading: false })
          throw err
        }
      },

      registerWithEmail: async (email, password, displayName) => {
        set({ isLoading: true, error: null })
        try {
          const result = await createUserWithEmailAndPassword(
            auth,
            email,
            password,
          )
          if (result.user) {
            await updateProfile(result.user, { displayName })
          }
          set({ user: mapFirebaseUser(result.user), isLoading: false })
        } catch (err) {
          const message =
            err instanceof Error ? err.message : 'Error al registrar usuario'
          set({ error: message, isLoading: false })
          throw err
        }
      },

      loginWithGoogle: async () => {
        set({ isLoading: true, error: null })
        try {
          const provider = new GoogleAuthProvider()
          const result = await signInWithPopup(auth, provider)
          set({ user: mapFirebaseUser(result.user), isLoading: false })
        } catch (err) {
          const message =
            err instanceof Error ? err.message : 'Error con Google'
          set({ error: message, isLoading: false })
          throw err
        }
      },

      loginWithGithub: async () => {
        set({ isLoading: true, error: null })
        try {
          const provider = new GithubAuthProvider()
          const result = await signInWithPopup(auth, provider)
          set({ user: mapFirebaseUser(result.user), isLoading: false })
        } catch (err) {
          const message =
            err instanceof Error ? err.message : 'Error con GitHub'
          set({ error: message, isLoading: false })
          throw err
        }
      },

      logout: async () => {
        set({ isLoading: true, error: null })
        try {
          await firebaseSignOut(auth)
          set({ user: null, isLoading: false })
        } catch (err) {
          const message =
            err instanceof Error ? err.message : 'Error al cerrar sesión'
          set({ error: message, isLoading: false })
          throw err
        }
      },

      changePassword: async (currentPassword: string, newPassword: string) => {
        set({ error: null })
        try {
          const currentUser = auth.currentUser
          if (!currentUser || !currentUser.email) {
            throw new Error('No hay usuario autenticado')
          }

          // Re-authenticate user
          const credential = EmailAuthProvider.credential(
            currentUser.email,
            currentPassword,
          )
          await reauthenticateWithCredential(currentUser, credential)

          // Note: Firebase requires import { updatePassword } from 'firebase/auth'
          // But we need to dynamically import to avoid issues
          const { updatePassword } = await import('firebase/auth')
          await updatePassword(currentUser, newPassword)
        } catch (err) {
          const message =
            err instanceof Error ? err.message : 'Error al cambiar contraseña'
          set({ error: message })
          throw err
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: STORAGE_KEYS.session,
      version: 1,
      partialize: (state) => ({ user: state.user }),
    },
  ),
)