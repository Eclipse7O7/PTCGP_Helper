import path from "path";
import { app } from "electron";
import { isDev } from "./util.js";

export function getPreloadedPath(): string {
   // This function returns the path to the preloaded script
   // It is used in the Electron main process to preload scripts into the renderer process
   return path.join(
   app.getAppPath(),
   // When in dev mode the path is just back one directory
   // When in production mode the path is back two directories 
   isDev() ? "." : "..",
   // ".cjs" is used for CommonJS modules, as it will be placed in a seperate
   //   folder than the combined .ts file that the builder would otherwise create
   "/dist-electron/preload.cjs"
   );
}