import { Mailbox, InternetMessage } from "../dist/index";

const im : InternetMessage = new InternetMessage();
im.addDateHeader(new Date());
im.addFromHeader([new Mailbox("jonathan@wilbur.space")]);
im.addToHeader([new Mailbox("jonathan@wilbur.space")]);
im.addSubjectHeader("What's goin' on, big guy?");
im.body = `
I see that you've got 17,000 dead fetuses on your property.
Anything you want to talk about, champ?

- Modern corporate managerial man
`;

console.log(im.toString());