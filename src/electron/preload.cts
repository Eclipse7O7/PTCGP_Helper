//import { getStaticData } from "./rescourceManagerTest";

const electron = require("electron");

// This file can require and use Node.js APIs etc without risking security issues
// Allows for the main window to access the methods specified in the contextBridge
//   under the name "electron" - stops the UI from having too much control

electron.contextBridge.exposeInMainWorld("electron", {
 
   // ".on" and ".send" is a UDP style manner of listening for events, fire-and-forget
   resource_update: (callback: (resource_update: any) => void) => {
      electron.ipcRenderer.on("resource_update", (event: any, stats: any) => {
         callback(stats);
      })
   },
   //getStaticData: () => console.log("getStaticData called"),
   // ".invoke" and ".handle" is a request-response style of listening for events
   getStaticData: () => electron.ipcRenderer.invoke("getStaticData"),
  
} satisfies Window["electron"]);


// Add more functions to expose to the renderer process as needed? (in other contextBridges)
   