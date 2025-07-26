import { useEffect, useState } from 'react'
import './App.css'
import TCGDex from '@tcgdex/sdk';

export default function TestPage() {
  const [count, setCount] = useState(0)
  const [card, setCard] = useState<any>(null);
  const [set, setSet] = useState<any>(null);

  async function getFurret() {
    const result : CardData | null = await window.appMethods.fetchFurret();
    //console.log("getFurret called, result:", result);
    if (result) {
      console.log("Furret fetched successfully:", result);
      setCard(result);

    } else {
      console.error("Failed to fetch Furret.");
    }
  }

  async function getCardById(cardId: string) {
    try {
      const card : CardData | null = await window.appMethods.getCardById(cardId);
      if (card) {
        console.log("Card fetched successfully:", card);
        setCard(card);
      } else {
        console.error("Card not found.");
      }
    } catch (error) {
      console.error("Error fetching card by ID:", error);
    }
  }

  async function getSetById(setId: string) {
    try {
      const set = await window.appMethods.getSetById(setId);
      if (set) {
        console.log(`Set fetched: ${set.name}`);
        setSet(set);
        // Display names of cards in the set in frontend console
        for (const card of set.cards) {
          console.log(`Card: ${card.name}, ID: ${card.id}`);
        }
      } else {
        console.error("Set not found.");
      }
    } catch (error) {
      console.error("Error fetching set by ID:", error);
    }
  }

  return (
    <>
      <header className="appHeader">
        <button className="settingsButton test_button" onClick={() => {
          //window.appMethods.openSettings();
          openSettings();
          // function for opening settings
          console.log("Open settings button clicked");
        }}></button>
        <img src="../../../desktopIconERApp.png" className="logo" alt="PTCGP Helper logo"/>
        <button className="setButton test_button" onClick={getFurret}>
          {card ? card.name + "!" : "Click to fetch"}
        </button>
        <div className="card">
          {card && <img src={card.image} alt={card.name} />}
        </div>
      </header>


      <h1>PTCGP Helper Testing Page</h1>

      <button className='test_button' onClick={() => getSetById("A1")}>Show Set A1</button>

      <div className="card">
        <button className='test_button' onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      
      <div className="card">
        <input type="text" placeholder="Enter card ID" id="cardIdInput" />

        <button className='test_button' onClick={() => {
          const cardIdInput = document.getElementById("cardIdInput") as HTMLInputElement;
          const cardId = cardIdInput.value.trim();
          if (cardId) {
            getCardById(cardId);
          } else {
            console.error("Please enter a valid card ID.");
          }
        }}>
          Fetch Card
        </button>

        <button className='test_button' onClick={() => getCardById("swsh7-1")}>
          Get Card by ID Pinsir
        </button>
      </div>

      <p className="read-the-docs">
        This is uh, a thing i guess - might become a "Press to start" kinda page?
      </p>
    </>
  )
}


function openSettings() {
  console.log("App.tsx: Open settings function called");
   // Here you can implement the logic to open the settings window or dialog
   // For example, you might want to create a new BrowserWindow for settings
   // or navigate to a settings page in your existing window.
   const settingsButton = document.querySelector(".settingsButton");
   if (settingsButton) {
      settingsButton.addEventListener("click", () => {
         console.log("preload: Settings button clicked");
      });
   } else {
      console.error("Settings button not found in main.ts");
   }
}
