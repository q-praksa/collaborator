export type userCredentialsType = {
    email: string;
    password: string;
};

export type clientPayloadType = {
    companyName: string;
    CEO: string;
    img: string;
    region: string;
};

export type userTokenType = {
    exp: number;
    iat: number;
    userId: string | null;
};

export type userPayloadType = {
    id: string;
    fullname: string;
    job: string;
    email: string;
    address: string;
    skills: object;
};
