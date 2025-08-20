import { useEffect, useState, useRef } from 'react'
import './inventoryPage.css';

import settingsIcon from './assets/settings_cog_whiteish.png';
import dotIcon from './assets/dot_whiteish.png';
import minusIcon from './assets/minus_whiteish.png';
import plusIcon from './assets/plus_whiteish.png';

// 'Importing' the InventoryOptions enum as ones in types.d.ts only exist at compile-time not runtime
const InventoryOptions = {
  SELECT_CARD: "SELECT_CARD",
  REMOVE_CARD: "REMOVE_CARD",
  ADD_CARD: "ADD_CARD",
} as const;
type InventoryOptions = (typeof InventoryOptions)[keyof typeof InventoryOptions];



export default function InventoryPage() {

  const [profileIDs, setProfileIDs] = useState<number>(0);
  var [currentProfile, setCurrentProfile] = useState<number | 0>(0);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [setMenuOpen, setSetMenuOpen] = useState(false);
  const [viewMenuOpen, setViewMenuOpen] = useState(false);
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);


  async function fetchProfiles() {
    const allProfileIDs = await window.appMethods.getNumOfProfiles();
    setProfileIDs(allProfileIDs);
    const jsonCurrentProfile = await window.appMethods.getCurrentProfile();
    setCurrentProfile(jsonCurrentProfile);
  }
  
  useEffect(() => {
    console.log("Fetching profiles...");
    fetchProfiles();
  }, []); // Fetch profiles on component mount (only once)
  
  async function getProfileByIdUI(profileId: number) {
    const profile = await window.appMethods.getProfileById(profileId);
    if (profile) {
      return profile;
    }
  }
  

  const [currentSet, setSet] = useState<SetData | null>(null);
  const [setInfoList, setSetInfoList] = useState<any[]>([]);

  const prependRunRef = useRef(false);
  

  useEffect(() => {
    console.log("Fetching sets info...");
    window.appMethods.getSetsInfo().then((sets) => {
      if (sets) {
        console.log("Sets info fetched successfully:");
        console.log(sets);
        setSetInfoList(JSON.parse(sets));
        // This doesn't log as the variable is not updated immediately I think?
        //console.log(setInfoList);
        prependRunRef.current = true;
      } else {
        console.error("Failed to fetch sets info.");
        //console.log(sets)
      }
    });
  }, []); // Fetch sets on component mount (only once)
  


  useEffect(() => {
    console.log("Set info list updated");
    if (prependRunRef.current) {
      prependSetInfoList();
      prependRunRef.current = false; // Reset the ref to prevent multiple prepends
    }

  }, [setInfoList]); // This useEffect runs whenever setInfoList changes -> but only
  // want it to run the prepending once, so using a ref to track that

  async function prependSetInfoList() {
    const newSetInfoList = [...setInfoList];
    newSetInfoList.unshift({ id: "All", name: "All Sets", cardCount: -1 });
    console.log("Prepending 'All Sets' to setInfoList");
    //console.log(newSetInfoList);
    setSetInfoList(newSetInfoList);
  }
  
  
  
  
  
  

  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [inventoryOption, setInventoryOption] = useState<InventoryOptions | null>(null);
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


  /* Now using react state to manage profile menu open/close instead of direct DOM manipulation

  function openProfile() {
    console.log("Profile button clicked");
    toggleProfile();

    // for each profile that exists, create a button that will set the current profile to that profile
    const profileMenuContainer = document.querySelector(".profileMenuContainer");
    if (profileMenuContainer) {
      profileMenuContainer.innerHTML = ""; // Clear existing buttons
      for (let i = 0; i < profileIDs; i++) {
        const button = document.createElement("button");
        button.textContent = `Profile ${i}`;
        button.addEventListener("click", () => {
          setCurrentProfile(i);
          //changeProfile();
          
        });
        profileMenuContainer.appendChild(button);
      }
    }
  }
  */


  function openProfile() {
    setProfileMenuOpen((open) => !open);
  }

  function openSet() {
    setSetMenuOpen((open) => !open);
    console.log(setInfoList);
  }

  function openView() {
    setViewMenuOpen((open) => !open);
  
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  }

  

  function openSettings() {
    console.log("Settings icon clicked");
    setSettingsMenuOpen((open) => !open);
  }
  function selectCards() {
    // Toggle the inventory option for selecting cards if not already selected
    (inventoryOption === InventoryOptions.SELECT_CARD) ? setInventoryOption(null) : setInventoryOption(InventoryOptions.SELECT_CARD);
    console.log("Select Cards icon clicked");
  }
  function removeCards() {
    // Toggle the inventory option for removing cards if not already selected
    (inventoryOption === InventoryOptions.REMOVE_CARD) ? setInventoryOption(null) : setInventoryOption(InventoryOptions.REMOVE_CARD);
    console.log("Remove Cards icon clicked");
  }
  function addCards() {
    // Toggle the inventory option for adding cards if not already selected
    (inventoryOption === InventoryOptions.ADD_CARD) ? setInventoryOption(null) : setInventoryOption(InventoryOptions.ADD_CARD);
    console.log("Add Cards icon clicked");
  }





  // Not final functionality !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // Also uses DOM manipulation instead of React state, which is not ideal

  async function changeProfile() {
    const profile = await getProfileByIdUI(currentProfile);
    if (!profile) {
      console.error("Profile not found");
      return;
    }
    
    // Log the profile to the console
    console.log("Profile fetched successfully:", profile);
    // Display profile information in the UI
    var pageContainer = document.querySelector(".inventoryPageContainer");
    if (pageContainer) {
      console.log("\nProfile fetched successfully:", profile, "\n\n");
      pageContainer.innerHTML = ""; // Clear existing content
      const profileHeading = document.createElement("h2");
      profileHeading.textContent = `Profile: ${profile.name}`;
      pageContainer.appendChild(profileHeading);
      for (const collectionCard of profile.collection) {
        const img = document.createElement("img");
        img.className = "cardImage";
        img.src = collectionCard.card.image;
        img.alt = collectionCard.card.name;
        pageContainer.appendChild(img);
      }
      const tempP = document.createElement("p");
      tempP.textContent = "This content is inside a div with an inline style that causes scrolling when content overflows. This content is inside a div with an inline style that causes scrolling when content overflows. This content is inside a div with an inline style that causes scrolling when content overflows. This content is inside a div with an inline style that causes scrolling when content overflows. This content is inside a div with an inline stylethat causes scrolling when content overflows. This content is inside a div with an inline style that causes scrolling when content overflows.";
      pageContainer.appendChild(tempP);
      pageContainer.appendChild(document.createElement("br"));
    }
  }


  useEffect(() => {
  console.log("Current profile changed:", currentProfile);
  changeProfile();
  }, [currentProfile]); // This useEffect only runs when currentProfile changes




  return (
    <div className="wholeInventoryPage">
      <button className="settingsIconButton" onClick={openSettings}><img src={settingsIcon} className="settingsIcon" alt="Settings Icon"/></button>
      <button className="dotIconButton" onClick={selectCards}><img src={dotIcon} className="dotIcon" alt="Select Cards"/></button>
      <button className="minusIconButton" onClick={removeCards}><img src={minusIcon} className="minusIcon" alt="Remove Cards"/></button>
      <button className="plusIconButton" onClick={addCards}><img src={plusIcon} className="plusIcon" alt="Add Cards"/></button>

      <div className={`settingsContainer${settingsMenuOpen ? " openSettings" : ""}`}>
        {
          // React State based Settings menu content here
          <>
            <div className="settingItem">
              <input type="checkbox" id="set1" name="set1" value="set1" />
              <label htmlFor="set1">Show Empty Card Slots</label>
            </div>
            <div className="settingItem">
              <input type="checkbox" id="set2" name="set2" value="set2" />
              <label htmlFor="set2">Display Collection In Order</label>
            </div>
          </>
        }
      </div>


      <button className="profileButton" onClick={openProfile}><h3>Profile</h3></button>
      <div className={`profileMenuContainer${profileMenuOpen ? " openProfile" : ""}`}>
          {[...Array(profileIDs)].map((_, i) => (
            <button key={i} onClick={() => {
                setCurrentProfile(i)
                // !!!!!!!!!!!!!!!!!!!!!!!!!
                // will need to make this also set the inventoryPageContainer to the profile's collection
                //think currently this is changed in 
              }}>
              Profile {i}
            </button>
          ))}
      </div>
      
      <button className="setButton" onClick={openSet}><h3>Set</h3></button>
      <div className={`setMenuContainer${setMenuOpen ? " openSet" : ""}`}>
        {[...Array(setInfoList.length)].map((_, i) => (
            <button key={i} onClick={() => {
                console.log("Set button clicked for set:", setInfoList[i].name);
                // !!!!!!!!!!!!!!!!!!!!!!!!!
                // will need to make this also set the inventoryPageContainer to the set's cards,
                //  using the currently selected profile's cards
              }}>
              {setInfoList[i].id}
            </button>
          ))}
      </div>
      <button className="viewButton" onClick={openView}><h3>View</h3></button>
      <div className={`viewMenuContainer${viewMenuOpen ? " openView" : ""}`}>
        {/* view menu content here */}
      </div>

      <div className="inventoryPageContainer">
        <h1>Inventory</h1>
        <p>This is the inventory page.</p>
        <p>Here you can manage your card collection.</p>
      </div>
      <button className="temp" onClick={() => changeProfile()}>
        Fetch Profile Test
      </button>
      <button className="temp" onClick={() => {
        console.log(currentProfile);
      }}>
        Log Current Profile
      </button>
    </div>
  );
}