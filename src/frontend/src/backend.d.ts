import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type SubmitResult = {
    __kind__: "ok";
    ok: bigint;
} | {
    __kind__: "err";
    err: string;
};
export type Timestamp = bigint;
export interface ContactSubmission {
    id: bigint;
    name: string;
    submittedAt: Timestamp;
    email: string;
    message: string;
}
export interface backendInterface {
    getAllSubmissions(): Promise<Array<ContactSubmission>>;
    submitContact(name: string, email: string, message: string): Promise<SubmitResult>;
}
