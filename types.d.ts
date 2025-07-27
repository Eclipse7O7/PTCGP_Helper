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
   id: string,
   name: string,
   image: string,
    // Only used for ptcg pocket cards
   localId?: string,
    // Think aren't used for pocket cards
   set?: string,
   rarity?: string,
   types?: string[],
   hp?: number,
   stage?: string,
   illustrator?: string,
}

type SetData = {
   id: string,
   name: string,
   cards: CardData[],
}




type ProfileData = {
   id: number,
   name: string,
   collection: [
      {
         card: CardData,
         quantity: number,
      }
   ],
   settings: {
      language: string,
      theme: "DARK" | "LIGHT",
   }
}

enum InventoryOptions {
   SELECT_CARD = "SELECT_CARD",
   ADD_CARD = "ADD_CARD",
   REMOVE_CARD = "REMOVE_CARD",
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
      getProfileById: (profileId: number) => Promise<ProfileData | null>;
      // Add more methods as needed (remember to add to preload.cts)
   }
}

