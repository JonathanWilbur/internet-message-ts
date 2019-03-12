export declare class Mailbox {
    readonly address: string;
    readonly displayName?: string | undefined;
    constructor(address: string, displayName?: string | undefined);
    toString(): string;
}
