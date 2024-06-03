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
