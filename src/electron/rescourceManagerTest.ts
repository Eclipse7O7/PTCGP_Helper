/*
This file is essentially just being used for myself to test typescript
So i can then hopefully use the tcgdex api in typescript in tcgTrackerTest.ts

*/

import osUtils from "os-utils";
import os from "os";
import fs from "fs";
//import { resolve } from "path";
import { BrowserWindow, webContents } from "electron";
import { get } from "http";
import { ipcWebContentsSend } from "./util.js";

const pollingInterval = 1500; // 0.5 seconds - temporarily 1.5 seconds for testing

export function pollRescources(mainWindow: BrowserWindow) {
   setInterval(async () => {
      const cpuUsage = await getCPUUsage();
      //console.log(cpuUsage);
      //mainWindow.webContents.send("resource-update", { cpuUsage: cpuUsage });
      // You can add more resource monitoring functions here
      // e.g., getMemoryUsage(), getDiskUsage(), etc.
      const ramUsage = 1 - osUtils.freememPercentage(); // Calculate RAM usage
      const storageData = getStorageData();


      //console.log({ cpuUsage, ramUsage, storageUsage: storageData.usage })
      //mainWindow.webContents.send("resource_update", { cpuUsage, ramUsage, storageUsage: storageData.usage });
      var polledData: ResourceUpdate = {
         cpuUsage: cpuUsage,
         ramUsage: ramUsage,
         storageUsage: storageData.usage};

      console.log(polledData);
      //mainWindow.webContents.send("resource_update", polledData);
      ipcWebContentsSend("resource_update", mainWindow.webContents, polledData);
 

   }, pollingInterval);
}

export function getStaticData() {
   const cpuModel = os.cpus()[0].model; // Get the CPU model
   const totalMemory = os.totalmem(); // Get the total memory (in bytes?)
   const totalStorage = getStorageData().total; // Get the total storage (in MB?)

   return {
      cpuModel: cpuModel,
      totalMemory: totalMemory,
      totalStorage: totalStorage
   };
}

function getCPUUsage(): Promise<number> {
   return new Promise((resolve) => {
      // This function should return the CPU usage of the system
      osUtils.cpuUsage(resolve);
   })
   //Sync version: osUtils.cpuUsage((percentage) => console.log("CPU Usage: " + percentage * 100 + "%"));

}

function getStorageData() {
   const stats = fs.statfsSync(process.platform === "win32" ? "C:\\" : "/");
   const total = stats.bsize * stats.blocks; // Total storage in bytes
   const free = stats.bsize * stats.bfree; // Free storage in bytes
   const used = total - free; // Used storage in bytes
   return {
      total: Math.floor(total / (1024 * 1024)), // Convert to MB
      usage: 1 - (free / total), // Usage as a percentage
      free: Math.floor(free / (1024 * 1024)), // Free storage
   }
}