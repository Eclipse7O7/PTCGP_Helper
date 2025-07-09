type ResourceUpdate = {
   cpuUsage: number;
   ramUsage: number;
   storageUsage: number;
}

type StaticData = {
   cpuModel: string;
   totalMemory: number; // in bytes(?)
   totalStorage: number; // in MB(?)
}

type EventPayloadMapping = {
   "resource_update": ResourceUpdate;
   "getStaticData": StaticData;
}



// Typescript allows for adding things to the "Window" interface, instead of
//   overriding it
interface Window {
   electron: {
      resource_update: (callback: (stats: ResourceUpdate) => void) => void;
      getStaticData: () => Promise<StaticData>;
   }
}

