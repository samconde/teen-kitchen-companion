import { useState } from 'react';
import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import getFirebaseServices from 'src/firebase/getFirebaseServices';
import AuthContext from './AuthContext';
import User from 'src/model/User/User';
import StorableUser from 'src/model/User/StorableUser';
import retrieveUserData from 'src/firebase/User/retrieveUserData';
import initializeUser from 'src/firebase/User/initializeUser';

const AuthContextProvider = ({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element => {
  const [user, setUser] = useState<User | undefined>(undefined);

  function isSignedIn(): boolean {
    if (user === undefined) {
      return false;
    } else {
      return true;
    }
  }

  async function signUp(
    newUser: StorableUser,
    password: string
  ): Promise<void> {
    const { authRef } = getFirebaseServices();

    // Create the new user
    const userCredential = await createUserWithEmailAndPassword(
      authRef,
      newUser.email,
      password
    );

    // Initialize the user
    const userId = userCredential.user.uid;
    const storableUser: StorableUser = {
      ...newUser,
    };
    const user = User.fromStorable(storableUser, userId);

    // Update the database
    await initializeUser(user);

    setUser(user);
  }

  async function signIn(email: string, password: string): Promise<void> {
    const { authRef } = getFirebaseServices();

    try {
      const userCredential = await signInWithEmailAndPassword(
        authRef,
        email,
        password
      );

      const userId = userCredential.user.uid;
      const user = await retrieveUserData(userId);
      setUser(user);

      return;
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log({ ...error });
      }
      return;
    }
  }

  async function signOut(): Promise<void> {
    const { authRef } = getFirebaseServices();
    firebaseSignOut(authRef);
    setUser(undefined);
  }

  const providedValues = { user, signUp, signIn, signOut, isSignedIn };

  return (
    <AuthContext.Provider value={providedValues}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
