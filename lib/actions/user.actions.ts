'use server';

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

const {
    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
    APPWRITE_EVENT_COLLECTION_ID: EVENT_COLLECTION_ID,
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
        const { account, database } = await createAdminClient();

        newUserAccount = await account.create(
            ID.unique(), 
            email, 
            password, 
            `${firstName} ${lastName}`
        );

        if(!newUserAccount) throw new Error('Error creating user');

        const newUser = await database.createDocument(
            DATABASE_ID!, 
            USER_COLLECTION_ID!, 
            ID.unique(),
            {
                userID: newUserAccount.$id,
                email,
                firstName,
                lastName,
                role: 'user',
                createdAt: Date.now()
            }
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

export const createEvent = async ({
    title,
    EventImageURL,
    location,
    eventDateTime,
    shortDescription,
    description,
    price, 
    pricePer,
    hasAction,
    actionText,
    importantMessage,
    createdBy,
    attendees,
  }: CreateEventProps) => {
    try {
        const { database } = await createAdminClient();
        const newEvent = await database.createDocument(
            DATABASE_ID!,
            EVENT_COLLECTION_ID!,
            ID.unique(),
            {
                title,
                EventImageURL,
                location,
                eventDateTime,
                shortDescription,
                description,
                price,
                pricePer,
                hasAction,
                actionText,
                importantMessage,
                createdBy,
                attendees,
            }
        );
        return parseStringify(newEvent);
    } catch (error) {
        console.error('Error', error)
    }
}

export async function fetchEvents() {
    try {
        const { database } = await createAdminClient();
        const events = await database.listDocuments(
            DATABASE_ID!,
            EVENT_COLLECTION_ID!
        );
        return parseStringify(events.documents);
    } catch (error) {
        console.error('Error', error)
    }
}

export async function fetchEventById(id: string) {
    try {
        const { database } = await createAdminClient();
        const event = await database.getDocument(
            DATABASE_ID!,
            EVENT_COLLECTION_ID!,
            id
        );
      return parseStringify(event)
    } catch (error) {
      console.error('Error fetching event:', error);
      return null;
    }
  }