import { useEffect, useState } from 'react'
import './inventoryPage.css';

import settingsIcon from './assets/settings_cog_whiteish.png';
import dotIcon from './assets/dot_whiteish.png';
import minusIcon from './assets/minus_whiteish.png';
import plusIcon from './assets/plus_whiteish.png';


export default function InventoryPage() {

  const [profileIDs, setProfileIDs] = useState<number>(0);
  var [currentProfile, setCurrentProfile] = useState<number | 0>(0);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

 
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



  const [currentSet, setSet] = useState<SetData | null>(null);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [inventoryOption, setInventoryOption] = useState<InventoryOptions | null>(null);



  function toggleProfile() {
    if (! document.querySelector(".openProfile")) {
      document.querySelector(".profileMenuContainer")?.classList.add("openProfile");
    } else {
      document.querySelector(".profileMenuContainer")?.classList.remove("openProfile");
    }
  }

  function toggleSet() {
    if (! document.querySelector(".openSet")) {
      document.querySelector(".setMenuContainer")?.classList.add("openSet");
    } else {
      document.querySelector(".setMenuContainer")?.classList.remove("openSet");
    }
  }

  function toggleView() {
    if (! document.querySelector(".openView")) {
      document.querySelector(".viewMenuContainer")?.classList.add("openView");
    } else {
      document.querySelector(".viewMenuContainer")?.classList.remove("openView");
    }
  }

  /* Attempt to use react state to manage profile menu open/close instead of direct DOM manipulation

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
 
 // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! this needs to change to use react state instead of direct DOM manipulation
  // But idk how rn as it needs to toggle the class of the profile menu container
  // and I don't know how to do that with react state
  function openProfile() {
    setProfileMenuOpen(true);
    //setProfileMenuOpen((open) => !open);
    toggleProfile();
  }

  // useEffect(() => {
  //   console.log("Profile menu open state changed:", profileMenuOpen);
  // }, [profileMenuOpen]); // This useEffect only runs when profileMenuOpen changes


  function openSet() {
    console.log("Set button clicked");
    toggleSet();
    // setSetMenuOpen(true);
    // setSetMenuOpen((open) => !open);

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  }

  function openView() {
    console.log("View button clicked");
    toggleView();
    // setViewMenuOpen(true);
    // setViewMenuOpen((open) => !open);
  
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  }

  document.querySelector(".settingsIcon")?.addEventListener("click", () => {
    console.log("Settings icon clicked");
  });
  document.querySelector(".dotIcon")?.addEventListener("click", () => {
    // Toggle the inventory option for selecting cards if not already selected
    inventoryOption === InventoryOptions.SELECT_CARD ? setInventoryOption(null) : setInventoryOption(InventoryOptions.SELECT_CARD);
    console.log("Select Cards icon clicked");
  });
  document.querySelector(".minusIcon")?.addEventListener("click", () => {
    // Toggle the inventory option for removing cards if not already selected
    inventoryOption === InventoryOptions.REMOVE_CARD ? setInventoryOption(null) : setInventoryOption(InventoryOptions.REMOVE_CARD);
    console.log("Remove Cards icon clicked");
  });  
  document.querySelector(".plusIcon")?.addEventListener("click", () => {
    // Toggle the inventory option for adding cards if not already selected
    inventoryOption === InventoryOptions.ADD_CARD ? setInventoryOption(null) : setInventoryOption(InventoryOptions.ADD_CARD);
    console.log("Add Cards icon clicked");
  });


  async function getProfileByIdUI(profileId: number) {
    const profile = await window.appMethods.getProfileById(profileId);
    if (profile) {
      return profile;
    }
  }

  // Not final functionality !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

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
      <img src={settingsIcon} className="settingsIcon" alt="Settings Icon"/>
      <img src={dotIcon} className="dotIcon" alt="Select Cards"/>
      <img src={minusIcon} className="minusIcon" alt="Remove Cards"/>
      <img src={plusIcon} className="plusIcon" alt="Add Cards"/>

      <button className="profileButton" onClick={openProfile}><h3>Profile</h3></button>
      {profileMenuOpen && (
        <div className="profileMenuContainer">
          {[...Array(profileIDs)].map((_, i) => (
            <button key={i} onClick={() => {
                setCurrentProfile(i)
              }}>
              Profile {i}
            </button>
          ))}
        </div>
      )}
      <button className="setButton" onClick={openSet}><h3>Set</h3></button>
      <div className="setMenuContainer"></div>
      <button className="viewButton" onClick={openView}><h3>View</h3></button>
      <div className="viewMenuContainer"></div>


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