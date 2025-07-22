import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import TCGDex from '@tcgdex/sdk';


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



function App() {
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



  useEffect(() => {
    window.electron.resource_update((stats) => {
      console.log(stats);
    });
  }, []);
  

  return (
    <>
      <header className="appHeader">
        <button className="settingsButton" onClick={() => {
          //window.appMethods.openSettings();
          openSettings();
          // function for opening settings
          console.log("Open settings button clicked");
        }}></button>
        <img src="../../../desktopIconERApp.png" className="logo" alt="PTCGP Helper logo"/>
        <button className="setButton" onClick={getFurret}>
          {card ? card.name + "!" : "Click to fetch"}
        </button>
        <div className="card">
          {card && <img src={card.image} alt={card.name} />}
        </div>
      </header>


      <h1>PTCGP Helper Testing Page</h1>
      <button onClick={() => getSetById("A1")}>Show Set A1</button>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      
      <div className="card">
        <input type="text" placeholder="Enter card ID" id="cardIdInput" />

        <button onClick={() => {
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
        
        <button onClick={() => getCardById("swsh7-1")}>
          Get Card by ID Pinsir
        </button>
      </div>

      <p className="read-the-docs">
        This is uh, a thing i guess - might become a "Press to start" kinda page?
      </p>
    </>
  )


  /*
  return (
    <>
      <div>
				<div id="info-content">
					<div id="info-text">
						<h2>LOLA-ROSE GOOCH</h2>
					
						<p>A highly organised, committed, adaptable student perchance? who strives to achieve her best and improve while she does it. Undergoing an integrated masters in Computing Sciences until 2028.</p>

						<h3><a href="blog">MY BLOG</a></h3>
						<p>Interested in what I'm getting up to? Consider checking out my blog! I write about some of the things I'm working on, how I did it, and other things I have discovered.</p>
						
						
					</div>
					<div id="profile">
					</div>
					<div id="socials">
					</div>
				</div>
			</div>
      <div style={{
        borderLeft: "50vw solid transparent",
        borderRight: "50vw solid transparent",
        borderBottom: "8vw solid rgb(7, 10, 7)",
        transform: "translateY(100vh)"
      }}></div>
			<div id="content">
				<h2>MY SKILLS</h2>
				<ul id="skills">
					
				</ul>
				
				<h2>EDUCATION</h2>
				<ul id="education">
					
          <div>
            pretend this mapping iterable worked with real values...
            <h3>website, location</h3>
            <h4>experience</h4>
            
            <p>startdate - enddate</p>
            wowee so cool so much experience
          </div>
				</ul>
      </div>
    </>
  )

  */



  /*
  return (
    <>
      <div>
        Test for GitHub

        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )

*/

}
export default App
