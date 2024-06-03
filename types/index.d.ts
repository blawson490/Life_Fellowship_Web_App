declare interface AuthFormProps {
    type: "sign-in" | "sign-up";
}

declare type SignUpParams = {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
};

declare interface SignInProps {
    email: string;
    password: string;
}

declare interface UserSessionUser {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    name: string;
    registration: string;
    status: boolean;
    labels: string[];
    passwordUpdate: string;
    email: string;
    phone: string;
    emailVerification: boolean;
    phoneVerification: boolean;
    mfa: boolean;
    prefs: Record<string, unknown>;
    targets: Target[];
    accessedAt: string;
}

declare interface CreateEventProps {
    title: string;
    EventImageURL: URL;
    location: string;
    eventDateTime: Date;
    shortDescription: string;
    description: string;
    price: number;
    pricePer: string;
    hasAction: boolean;
    actionText: string;
    importantMessage: string;
    createdBy: string;
    attendees: string[];
}

// types/event.ts
declare interface Event {
    title: string;
    EventImageURL: string | null;
    location: string;
    eventDateTime: string;
    shortDescription: string;
    description: string | null;
    price: number;
    pricePer: string;
    hasAction: boolean;
    actionText: string;
    importantMessage: string;
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: any[];
    createdBy: CreatedBy;
    attendees: Attendee[];
    $databaseId: string;
    $collectionId: string;
  }
  
  declare interface CreatedBy {
    email: string;
    userID: string;
    firstName: string;
    lastName: string;
    role: string;
    createdAt: string;
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: any[];
    $databaseId: string;
    $collectionId: string;
  }
  
  declare interface Attendee {
    email: string;
    userID: string;
    firstName: string;
    lastName: string;
    role: string;
    createdAt: string;
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: any[];
    $databaseId: string;
    $collectionId: string;
  }
  