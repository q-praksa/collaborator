export type userCredentialsType = {
    email: string;
    password: string;
};

export type signupType = {
    email: string;
    password: string;
    name: string;
    lastName: string;
};
export type employeePayloadType = {
    fullname: string;
    email: string;
    password: string;
    job: string;
};
export type clientPayloadType = {
    id: string;
    companyName: string;
    status: string;
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
