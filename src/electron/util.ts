import { ipcMain, WebContents } from "electron";

export function isDev(): boolean {
  //console.log(process.env.NODE_ENV === 'development' ? "Development mode" : "Production mode");
  return process.env.NODE_ENV === 'development';
}

export function ipcMainHandle<Key extends keyof EventPayloadMapping>(
  key: string, 
  handler: () => EventPayloadMapping[Key]
) {
  ipcMain.handle(key, () => {
    return handler();
  });
}

export function ipcWebContentsSend<Key extends keyof EventPayloadMapping>(
  key: Key, 
  webContents: WebContents, 
  payload: EventPayloadMapping[Key]
) {
  webContents.send(key, payload);
}