import { Group } from "./Group";
import { Header } from "./Header";
import { Mailbox } from "./Mailbox";
import { MessageID } from "./MessageID";

export
class InternetMessage {

    public headers : Header[] = [];
    public body : string = "";

    public toString() : string {
        return (
            this.headers.map((h) => `${h.name}: ${h.body}`).join("\r\n") +
            "\r\n" +
            this.body
        );
    }

    // REVIEW:
    // date-time       =       [ day-of-week "," ] date FWS time [CFWS]
    // day-of-week     =       ([FWS] day-name) / obs-day-of-week
    // day-name        =       "Mon" / "Tue" / "Wed" / "Thu" /
    //                         "Fri" / "Sat" / "Sun"
    // date            =       day month year
    // year            =       4*DIGIT / obs-year
    // month           =       (FWS month-name FWS) / obs-month
    // month-name      =       "Jan" / "Feb" / "Mar" / "Apr" /
    //                         "May" / "Jun" / "Jul" / "Aug" /
    //                         "Sep" / "Oct" / "Nov" / "Dec"
    // day             =       ([FWS] 1*2DIGIT) / obs-day
    // time            =       time-of-day FWS zone
    // time-of-day     =       hour ":" minute [ ":" second ]
    // hour            =       2DIGIT / obs-hour
    // minute          =       2DIGIT / obs-minute
    // second          =       2DIGIT / obs-second
    // zone            =       (( "+" / "-" ) 4DIGIT) / obs-zone
    public addDateHeader(date : Date) : void {
        this.headers.push(new Header("Date", date.toISOString()));
    }

    // mailbox-list    =       (mailbox *("," mailbox)) / obs-mbox-list
    // mailbox         =       name-addr / addr-spec
    // name-addr       =       [display-name] angle-addr
    // angle-addr      =       [CFWS] "<" addr-spec ">" [CFWS] / obs-angle-addr
    // display-name    =       phrase
    // phrase          =       1*word / obs-phrase
    // word            =       atom / quoted-string
    public addFromHeader(mailboxList : Mailbox[]) : void {
        this.headers.push(new Header("From", mailboxList.map((mailbox : Mailbox) => mailbox.toString()).join(",")));
    }

    public addSenderHeader(mailbox : Mailbox) : void {
        this.headers.push(new Header("Sender", mailbox.toString()));
    }

    public addReplyToMailboxHeader(mailbox : string) : void {
        this.headers.push(new Header("Reply-To", mailbox.toString()));
    }

    public addReplyToGroupHeader(group : Group) : void {
        this.headers.push(new Header("Reply-To", group.toString()));
    }

    public addToHeader (addresses : (Mailbox | Group)[]) : void {
        this.headers.push(new Header("To", addresses.map((address) => address.toString()).join(",")));
    }

    public addCCHeader (addresses : (Mailbox | Group)[]) : void {
        this.headers.push(new Header("Cc", addresses.map((address) => address.toString()).join(",")));
    }

    public addBCCHeader (addresses : (Mailbox | Group)[]) : void {
        this.headers.push(new Header("Bcc", addresses.map((address) => address.toString()).join(",")));
    }

    public addMessageIDHeader(id : MessageID) : void {
        this.headers.push(new Header("Message-ID", id.toString()));
    }

    public addInReplyToHeader(ids : MessageID[]) : void {
        this.headers.push(new Header("In-Reply-To", ids.map((id : MessageID) => id.toString()).join(" ")));
    }

    public addReferencesHeader(ids : MessageID[]) : void {
        this.headers.push(new Header("References", ids.map((id : MessageID) => id.toString()).join(" ")));
    }

    public addSubjectHeader(subject : string) : void {
        this.headers.push(new Header("Subject", subject));
    }
    
    public addCommentsHeader(comments : string) : void {
        this.headers.push(new Header("Comments", comments));
    }

    public addKeywordsHeader(keywords : string[]) : void {
        this.headers.push(new Header("Keywords", keywords.join(",")));
    }

    public addResentDateHeader(date : Date) : void {
        this.headers.push(new Header("Resent-Date", date.toISOString()));
    }

    public addResentFromHeader(mailboxList : Mailbox[]) : void {
        this.headers.push(new Header("Resent-From", mailboxList.map((mailbox : Mailbox) => mailbox.toString()).join(",")));
    }

    public addResentSenderHeader(mailbox : Mailbox) : void {
        this.headers.push(new Header("Resent-Sender", mailbox.toString()));
    }

    public addResentToHeader (addresses : (Mailbox | Group)[]) : void {
        this.headers.push(new Header("Resent-To", addresses.map((address) => address.toString()).join(",")));
    }

    public addResentCCHeader (addresses : (Mailbox | Group)[]) : void {
        this.headers.push(new Header("Resent-Cc", addresses.map((address) => address.toString()).join(",")));
    }

    public addResentBCCHeader (addresses : (Mailbox | Group)[]) : void {
        this.headers.push(new Header("Resent-Bcc", addresses.map((address) => address.toString()).join(",")));
    }

    public addResentMessageIDHeader(id : MessageID) : void {
        this.headers.push(new Header("Resent-Message-ID", id.toString()));
    }

    public addReturnHeader(address : string) : void {
        this.headers.push(new Header("Return-Path", `<${address}>`));
    }

    // RFC 2821, Section 3.8.2:
    // When forwarding a message into or out of the Internet environment, a
    // gateway MUST prepend a Received: line, but it MUST NOT alter in any
    // way a Received: line that is already in the header.
    //
    // The syntaxes below do not seem to line up with what I see appearing in
    // examples of Received headers. In particular, the name-val-list syntax
    // does not seem to be kept at all.
    //
    // received        =       "Received:" name-val-list ";" date-time CRLF
    // name-val-pair   =       item-name CFWS item-value
    // item-name       =       ALPHA *(["-"] (ALPHA / DIGIT))
    // item-value      =       1*angle-addr / addr-spec /
    //                         atom / domain / msg-id
    public addReceivedHeader(details : {
        // RFC 5321, Section 4.4:
        // The FROM clause, which MUST be supplied in an SMTP environment,
        // SHOULD contain both (1) the name of the source host as presented
        // in the EHLO command and (2) an address literal containing the IP
        // address of the source, determined from the TCP connection.
        fromStatedClient? : string, // (1)
        fromActualClient? : string, // (2)
        byServer? : string,
        byComment? : string,
        protocol? : string,
        id? : string,
        date? : Date
    }) : void {
        let headerBody : string = "";

        if (details.fromStatedClient && details.fromActualClient) {
            headerBody += `from ${details.fromStatedClient} (${details.fromActualClient})`;
        } else if (details.fromStatedClient) {
            headerBody += `from ${details.fromStatedClient}`;
        } else if (details.fromActualClient) {
            headerBody += `from ${details.fromActualClient}`;
        }

        if (details.byServer && details.byComment) {
            headerBody += ` by ${details.byServer} (${details.byComment})`;
        } else if (details.byServer) {
            headerBody += ` by ${details.byServer}`;
        }
        
        if (details.protocol) headerBody += ` via ${details.protocol}`;
        if (details.id) headerBody += ` id ${details.id}`;

        if (details.date) {
            headerBody += `; ${details.date.toDateString()}`;
        } else {
            headerBody += `; ${(new Date()).toDateString()}`;
        }

        this.headers.push(new Header("Received", headerBody));
    }

}