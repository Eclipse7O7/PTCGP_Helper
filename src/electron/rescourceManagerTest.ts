/*
This file is essentially just being used for myself to test typescript
So i can then hopefully use the tcgdex api in typescript in tcgTrackerTest.ts

*/

import osUtils from "os-utils";
import os from "os";
import fs from "fs";
//import { resolve } from "path";
import { BrowserWindow } from "electron";
import { get } from "http";

const pollingInterval = 500; // 0.5 seconds

export function pollRescources(mainWindow: BrowserWindow) {
   setInterval(async () => {
      const cpuUsage = await getCPUUsage();
      //console.log(cpuUsage);
      //mainWindow.webContents.send("resource-update", { cpuUsage: cpuUsage });
      // You can add more resource monitoring functions here
      // e.g., getMemoryUsage(), getDiskUsage(), etc.
      const ramUsage = 1 - osUtils.freememPercentage(); // Calculate RAM usage
      const storageUsage = getStorageUsage();


      //console.log({ cpuUsage, ramUsage, storageUsage: storageUsage.usage })
      mainWindow.webContents.send("resource_update", { cpuUsage, ramUsage, storageUsage: storageUsage.usage });

   }, pollingInterval);
}

export function getStaticData() {
   const cpuModel = os.cpus()[0].model; // Get the CPU model
   const totalMemory = os.totalmem(); // Get the total memory (in bytes?)
   const totalStorage = getStorageUsage().total; // Get the total storage (in MB?)

   return {
      cpuModel: cpuModel,
      totalMemory: totalMemory,
      totalStorage: totalStorage
   };
}

function getCPUUsage() {
   return new Promise((resolve) => {
      // This function should return the CPU usage of the system
      osUtils.cpuUsage(resolve);
   })
   //Sync version: osUtils.cpuUsage((percentage) => console.log("CPU Usage: " + percentage * 100 + "%"));

}

function getStorageUsage() {
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