import TCGdex from "@tcgdex/sdk";

const tcgdex = new TCGdex('en');


// This can't return the card object as it is not serializable, so for now return the name
// This is a workaround until I can figure out how to serialize the card object
// - can't stringify it as it has circular references
export async function fetchFurret() {
   try {
      const card = await tcgdex.card.get('swsh3-136');
      if (card) {
         console.log(card.name);
         return card.name;
         
      } else {
         console.error('Card not found.');
         return null;
      }
   } catch (error) {
      console.error('Error fetching card:', error);
      return null;
   }
};


export async function getCardById(cardId: string) {
   try {
      const card = await tcgdex.card.get(cardId);
      if (card) {
         return card;
      } else {
         return null;
      }
   } catch (error) {
      console.error('Error fetching card:', error);
      return null;
   }
}


export function openSettings() {
   console.log("tcgTrackerTest.ts: Open settings function called");
   // Here you can implement the logic to open the settings window or dialog
   // For example, you might want to create a new BrowserWindow for settings
   // or navigate to a settings page in your existing window.
   const settingsButton = document.querySelector(".settingsButton");
   if (settingsButton) {
      settingsButton.addEventListener("click", () => {
         console.log("preload: Settings button clicked");
         //window.electron.openSettings(); /??
      });
      return true; // This could be a placeholder for actual logic
   } else {
      console.error("Settings button not found in main.ts");
      return false;
   }
}

export function changeSet() {
   console.log("Change set function called");
   // Implement the logic to change the set here
   // This could involve updating the state or fetching new data based on the selected set
}

export function changeProfile() {
   console.log("Change profile function called");
   // Implement the logic to change the profile here
   // This could involve updating the user profile information or navigating to a profile settings page
}

export function changeView() {
   console.log("Change view function called");
   // Implement the logic to change the view here
   // This could involve switching between different views or layouts in your application
}


