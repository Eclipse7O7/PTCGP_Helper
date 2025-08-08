//import { getStaticData } from "./rescourceManagerTest";

import { openSettings, changeProfile, changeSet, changeView, fetchFurret, getCardById, getSetById } from "./tcgTrackerTest";

const electron = require("electron");

// This file can require and use Node.js APIs etc without risking security issues
// Allows for the main window to access the methods specified in the contextBridge
//   under the name "electron" - stops the UI from having too much control

electron.contextBridge.exposeInMainWorld("electron", {
 
   // ".on" and ".send" is a UDP style manner of listening for events, fire-and-forget
   resource_update: (callback: (resource_update: ResourceUpdate) => void) => {
      
      ipcOn("resource_update", (stats) => {
         callback(stats);
      })
         
      //electron.ipcRenderer.on("resource_update", (event: any, stats: ResourceUpdate) => {
         //callback(stats);
      //})

   },
   //getStaticData: () => console.log("getStaticData called"),
   // ".invoke" and ".handle" is a request-response style of listening for events
   //getStaticData: () => electron.ipcRenderer.invoke("getStaticData"),
   getStaticData: () => ipcInvoke("getStaticData"),
  
} satisfies Window["electron"]);


// These have to be in here as the utils file can't import the util.ts file
function ipcInvoke<Key extends keyof EventPayloadMapping>(
   key: Key, 
   // Async so needs to return promise
): Promise<EventPayloadMapping[Key]> {
   return electron.ipcRenderer.invoke(key);
}

function ipcOn<Key extends keyof EventPayloadMapping>(
   key: Key, 
   callback: (payload: EventPayloadMapping[Key]) => void
) {
   electron.ipcRenderer.on(key, (_event: any, payload: EventPayloadMapping[Key]) => callback(payload));
}



// Add more functions to expose to the renderer process as needed? (in other contextBridges)
   
electron.contextBridge.exposeInMainWorld("appMethods", {
   openSettings: () => {
      electron.ipcRenderer.invoke("openSettings");
      console.log("preload: openSettings called");
   },
   changeSet: (setName: string) => {
      //
   },
   changeProfile: (profileName: string) => {
      //
   },
   changeView: (viewName: string) => {
      //
   },
   fetchFurret: async () => {
      try {
         return await electron.ipcRenderer.invoke("fetchFurret")
      } catch (error) {
         console.error("Error fetching Furret:", error);
         return null;
      }
   },
   getCardById: async (cardId: string) => {
      try {
         return await electron.ipcRenderer.invoke("getCardById", cardId);
      } catch (error) {
         console.error("Error fetching card by ID:", error);
         return null;
      }
   },
   getSetById: async (setId: string) => {
      try {
         return await electron.ipcRenderer.invoke("getSetById", setId);
      } catch (error) {
         console.error("Error fetching set by ID:", error);
         return null;
      }
   },
   getProfileById: async (profileId: number) => {
      try {
         return await electron.ipcRenderer.invoke("getProfileById", profileId);
      } catch (error) {
         console.error("Error fetching profile:", error);
         return null;
      }
   },
   getNumOfProfiles: async () => {
      try {
         return await electron.ipcRenderer.invoke("getNumOfProfiles");
      } catch (error) {
         console.error("Error fetching number of profiles:", error);
         return 0;
      }
   },
   getCurrentProfile: async () => {
      try {
         return await electron.ipcRenderer.invoke("getCurrentProfile");
      } catch (error) {
         console.error("Error fetching current profile:", error);
         return null;
      }
   },
   // Add more methods as needed (remember to add to types.d.ts)
});



