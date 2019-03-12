"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Header_1 = require("./Header");
class InternetMessage {
    constructor() {
        this.headers = [];
        this.body = "";
    }
    toString() {
        return (this.headers.map((h) => `${h.name}: ${h.body}`).join("\r\n") +
            "\r\n" +
            this.body);
    }
    addDateHeader(date) {
        this.headers.push(new Header_1.Header("Date", date.toISOString()));
    }
    addFromHeader(mailboxList) {
        this.headers.push(new Header_1.Header("From", mailboxList.map((mailbox) => mailbox.toString()).join(",")));
    }
    addSenderHeader(mailbox) {
        this.headers.push(new Header_1.Header("Sender", mailbox.toString()));
    }
    addReplyToMailboxHeader(mailbox) {
        this.headers.push(new Header_1.Header("Reply-To", mailbox.toString()));
    }
    addReplyToGroupHeader(group) {
        this.headers.push(new Header_1.Header("Reply-To", group.toString()));
    }
    addToHeader(addresses) {
        this.headers.push(new Header_1.Header("To", addresses.map((address) => address.toString()).join(",")));
    }
    addCCHeader(addresses) {
        this.headers.push(new Header_1.Header("Cc", addresses.map((address) => address.toString()).join(",")));
    }
    addBCCHeader(addresses) {
        this.headers.push(new Header_1.Header("Bcc", addresses.map((address) => address.toString()).join(",")));
    }
    addMessageIDHeader(id) {
        this.headers.push(new Header_1.Header("Message-ID", id.toString()));
    }
    addInReplyToHeader(ids) {
        this.headers.push(new Header_1.Header("In-Reply-To", ids.map((id) => id.toString()).join(" ")));
    }
    addReferencesHeader(ids) {
        this.headers.push(new Header_1.Header("References", ids.map((id) => id.toString()).join(" ")));
    }
    addSubjectHeader(subject) {
        this.headers.push(new Header_1.Header("Subject", subject));
    }
    addCommentsHeader(comments) {
        this.headers.push(new Header_1.Header("Comments", comments));
    }
    addKeywordsHeader(keywords) {
        this.headers.push(new Header_1.Header("Keywords", keywords.join(",")));
    }
    addResentDateHeader(date) {
        this.headers.push(new Header_1.Header("Resent-Date", date.toISOString()));
    }
    addResentFromHeader(mailboxList) {
        this.headers.push(new Header_1.Header("Resent-From", mailboxList.map((mailbox) => mailbox.toString()).join(",")));
    }
    addResentSenderHeader(mailbox) {
        this.headers.push(new Header_1.Header("Resent-Sender", mailbox.toString()));
    }
    addResentToHeader(addresses) {
        this.headers.push(new Header_1.Header("Resent-To", addresses.map((address) => address.toString()).join(",")));
    }
    addResentCCHeader(addresses) {
        this.headers.push(new Header_1.Header("Resent-Cc", addresses.map((address) => address.toString()).join(",")));
    }
    addResentBCCHeader(addresses) {
        this.headers.push(new Header_1.Header("Resent-Bcc", addresses.map((address) => address.toString()).join(",")));
    }
    addResentMessageIDHeader(id) {
        this.headers.push(new Header_1.Header("Resent-Message-ID", id.toString()));
    }
    addReturnHeader(address) {
        this.headers.push(new Header_1.Header("Return-Path", `<${address}>`));
    }
    addReceivedHeader(details) {
        let headerBody = "";
        if (details.fromStatedClient && details.fromActualClient) {
            headerBody += `from ${details.fromStatedClient} (${details.fromActualClient})`;
        }
        else if (details.fromStatedClient) {
            headerBody += `from ${details.fromStatedClient}`;
        }
        else if (details.fromActualClient) {
            headerBody += `from ${details.fromActualClient}`;
        }
        if (details.byServer && details.byComment) {
            headerBody += ` by ${details.byServer} (${details.byComment})`;
        }
        else if (details.byServer) {
            headerBody += ` by ${details.byServer}`;
        }
        if (details.protocol)
            headerBody += ` via ${details.protocol}`;
        if (details.id)
            headerBody += ` id ${details.id}`;
        if (details.date) {
            headerBody += `; ${details.date.toDateString()}`;
        }
        else {
            headerBody += `; ${(new Date()).toDateString()}`;
        }
        this.headers.push(new Header_1.Header("Received", headerBody));
    }
}
exports.InternetMessage = InternetMessage;
//# sourceMappingURL=InternetMessage.js.map