export type DialogActionCallbackResult = boolean | Promise<boolean> | void;
export type DialogActionCallback = (key: string) => DialogActionCallbackResult;
