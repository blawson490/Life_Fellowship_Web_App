// src/lib/server/appwrite.js
"use server";
import { Client, Account, Databases, Users } from "node-appwrite";
import { cookies } from "next/headers";


export async function createSessionClient() {
    let endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
    let project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

    if (!endpoint || !project) {
        throw new Error('Environment variables NEXT_PUBLIC_APPWRITE_ENDPOINT and NEXT_PUBLIC_APPWRITE_PROJECT must be set');
    }
    const client = new Client()
        .setEndpoint(endpoint)
        .setProject(project);

    const session = cookies().get("appwrite-session");
    if (!session || !session.value) {
        throw new Error("No session");
    }

    client.setSession(session.value);

    return {
        get account() {
        return new Account(client);
    },
  };
}

export async function createAdminClient() {
    let endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
    let project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;
    let key = process.env.NEXT_APPWRITE_KEY;
    
    if (!endpoint || !project || !key) {
        throw new Error('Environment variables NEXT_PUBLIC_APPWRITE_ENDPOINT and NEXT_PUBLIC_APPWRITE_PROJECT must be set');
    }
    const client = new Client()
        .setEndpoint(endpoint)
        .setProject(project)
        .setKey(key);

  return {
    get account() {
        return new Account(client);
    },
    get database() {
        return new Databases(client);
    },
    get user() {
        return new Users(client);
    }
  };
}