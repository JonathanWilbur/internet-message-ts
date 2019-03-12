"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Group {
    constructor(mailboxList, displayName) {
        this.mailboxList = mailboxList;
        this.displayName = displayName;
    }
    toString() {
        return `${this.displayName}: ${this.mailboxList.map((mailbox) => mailbox.toString()).join(",")}`;
    }
}
exports.Group = Group;
//# sourceMappingURL=Group.js.map