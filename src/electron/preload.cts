import { getStaticData } from "./rescourceManagerTest";

const electron = require("electron");

// This file can require and use Node.js APIs etc without risking security issues
// Allows for the main window to access the methods specified in the contextBridge
//   under the name "electron" - stops the UI from having too much control

electron.contextBridge.exposeInMainWorld("electron", {
   // Doesn't like either of these, so commented out
   //getAppPath: () => electron.app.getAppPath(),
   //isDev: () => electron.app.isPackaged === false,
   getStaticData: () => console.log("getStaticData called"),

   // Add more functions to expose to the renderer process as needed?
   });

   