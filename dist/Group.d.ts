import { Mailbox } from "./Mailbox";
export declare class Group {
    readonly mailboxList: Mailbox[];
    readonly displayName: string;
    constructor(mailboxList: Mailbox[], displayName: string);
    toString(): string;
}
