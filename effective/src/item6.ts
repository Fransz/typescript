/**
 * item 6; Use Your Editor to Interrogate and Explore the Type System
 * use <M-L>K for hover.
 * @param { string } msg - the message
 */

/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * logMessage
 * @param { string | null } msg - the message
 */
async function logMessage(msg: string | null): Promise<void> {
  if (msg) {
    console.log(msg);
    msg.split('/').slice(1).join('/');
  }

  // eslint-disable-next-line
  const o = {
    x: [1, 2],
    y: 'test',
  };

  for (let x = 0; x < 10; x++) {
    x = 12;
    for (let j = 0; j < 10; j++) x += 2;
  }
  const x = await fetch('fransjaspers.com');
}
