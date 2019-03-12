"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MessageID {
    constructor(idLeft, idRight) {
        this.idLeft = idLeft;
        this.idRight = idRight;
    }
    toString() {
        return `<${this.idLeft}@${this.idRight}>`;
    }
}
exports.MessageID = MessageID;
//# sourceMappingURL=MessageID.js.map