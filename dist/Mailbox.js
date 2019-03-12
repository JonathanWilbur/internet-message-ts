"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Mailbox {
    constructor(address, displayName) {
        this.address = address;
        this.displayName = displayName;
    }
    toString() {
        return (this.displayName) ?
            `${this.displayName} ${this.address}` :
            this.address;
    }
}
exports.Mailbox = Mailbox;
//# sourceMappingURL=Mailbox.js.map