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



type CardData = {
   name: string,
   image: string,
   id: string,
   set: string,
   rarity: string,
   types: string[],
   hp: number,
   stage: string,
   illustrator: string,
}

type SetData = {
   id: string,
   name: string,
   cards: CardData[],
}


// Typescript allows for adding things to the "Window" interface, instead of
//   overriding it
interface Window {
   electron: {
      resource_update: (callback: (stats: ResourceUpdate) => void) => void;
      getStaticData: () => Promise<StaticData>;
   },
   appMethods: {
      openSettings: () => void;
      changeSet: (setName: string) => void;
      changeProfile: (profileName: string) => void;
      changeView: (viewName: string) => void;
      fetchFurret: () => Promise<CardData | null>; 
      getCardById: (cardId: string) => Promise<CardData | null>; 
      getSetById: (setId: string) => Promise<SetData | null>; 
   }
}

