import { TlsSecurity } from "./conUtils";
export interface Credentials {
    host?: string;
    port?: number;
    user: string;
    password?: string;
    database?: string;
    tlsCAData?: string;
    tlsSecurity?: TlsSecurity;
}
export declare function getCredentialsPath(instanceName: string): Promise<string>;
export declare function readCredentialsFile(file: string): Promise<Credentials>;
export declare function validateCredentials(data: any): Credentials;
