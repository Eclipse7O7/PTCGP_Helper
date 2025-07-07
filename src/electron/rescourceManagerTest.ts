/*
This file is essentially just being used for myself to test typescript
So i can then hopefully use the tcgdex api in typescript in tcgTrackerTest.ts

*/

import osUtils from "os-utils";
import os from "os";
import { resolve } from "path";

const pollingInterval = 500; // 0.5 seconds

export function pollRescources() {
   setInterval(async () => {
      const cpuUsage = await getCPUUsage();
      console.log(cpuUsage);
      // You can add more resource monitoring functions here
      // e.g., getMemoryUsage(), getDiskUsage(), etc.
   }, pollingInterval);  
}

export function getStaticData() {
   const cpuModel = os.cpus()[0].model; // Get the CPU model
   const totalMemory = os.totalmem(); // Get the total memory in bytes

   return {
      cpuModel: cpuModel,
      totalMemory: totalMemory
   };
}

function getCPUUsage() {
   return new Promise((resolve) => {
      // This function should return the CPU usage of the system
      osUtils.cpuUsage(resolve);
   })
   //Sync version: osUtils.cpuUsage((percentage) => console.log("CPU Usage: " + percentage * 100 + "%"));

}