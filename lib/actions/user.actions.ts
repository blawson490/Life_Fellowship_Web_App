'use server';

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

const {
    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  } = process.env;

export const signIn = async ({ email, password }: SignInProps) => {
    try {
        const { account } = await createAdminClient();
        const session = await account
        .createEmailPasswordSession(email, password);


        cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return parseStringify(session);
    } catch (error) {
        console.error('Error', error)
    }
}

export const signUp = async (userData: SignUpParams) => {
    const {email, password, firstName, lastName} = userData;
    
    let newUserAccount;
    
    try {
        const { account } = await createAdminClient();

        newUserAccount = await account.create(
            ID.unique(), 
            email, 
            password, 
            `${firstName} ${lastName}`
        );

        const session = await account
        .createEmailPasswordSession(email, password);

        cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        return parseStringify(newUser);
    } catch (error) {
        console.error('Error', error)
    }
}

export async function getLoggedInUser(): Promise<UserSessionUser | null> {
    try {
      const { account } = await createSessionClient();
      const user = await account.get();
      return JSON.parse(JSON.stringify(user)) as UserSessionUser;
    } catch (error) {
      return null;
    }
  }  

export const logoutAccount = async () => {
    try {
        const { account } = await createSessionClient();
        cookies().delete("appwrite-session");
        return await account.deleteSession("current");
    } catch (error) {
        console.error('Error', error)
    }
}