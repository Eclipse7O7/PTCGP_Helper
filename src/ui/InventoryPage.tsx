import { useEffect, useState } from 'react'
import './inventoryPage.css';

import settingsIcon from './assets/settings_cog_whiteish.png';
import dotIcon from './assets/dot_whiteish.png';
import minusIcon from './assets/minus_whiteish.png';
import plusIcon from './assets/plus_whiteish.png';


export default function InventoryPage() {

  const [profileIDs, setProfileIDs] = useState<number>(0);
  const [currentProfile, setCurrentProfile] = useState<string | null>(null);

  // Fetch number of profiles
  // Find the profiles.json "currentProfile" and set it as the current profile

  async function fetchProfiles() {
    const allProfileIDs = await window.appMethods.getNumOfProfiles();
    setProfileIDs(allProfileIDs);
    const currentProfile = await window.appMethods.getCurrentProfile();
    setCurrentProfile(currentProfile);
  }
  fetchProfiles();


  




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

  function openProfile() {
    console.log("Profile button clicked");
    toggleProfile();

  }
  function openSet() {
    console.log("Set button clicked");
    toggleSet();

  }
  function openView() {
    console.log("View button clicked");
    toggleView();
  
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


  // Not final functionality - for testing purposes only !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  async function getProfileByIdUI(profileId: number) {
    const profile = await window.appMethods.getProfileById(profileId);
    if (profile) {
      return profile;
    }
  }

  async function func() {
    const profile = await getProfileByIdUI(1);
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
      pageContainer.textContent = `Profile: ${profile.name}`;
      for (const collectionCard of profile.collection) {
        const img = document.createElement("img");
        img.className = "cardImage";
        img.src = collectionCard.card.image;
        img.alt = collectionCard.card.name;
        pageContainer.appendChild(img);
      }
      pageContainer.appendChild(document.createElement("br"));
    }
  }






  return (
    <div>
      <img src={settingsIcon} className="settingsIcon" alt="Settings Icon"/>
      <img src={dotIcon} className="dotIcon" alt="Select Cards"/>
      <img src={minusIcon} className="minusIcon" alt="Remove Cards"/>
      <img src={plusIcon} className="plusIcon" alt="Add Cards"/>

      <button className="profileButton" onClick={openProfile}><h3>Profile</h3></button>
      <div className="profileMenuContainer"><p>This finally displayyys!</p></div>
      <button className="setButton" onClick={openSet}><h3>Set</h3></button>
      <div className="setMenuContainer"></div>
      <button className="viewButton" onClick={openView}><h3>View</h3></button>
      <div className="viewMenuContainer"></div>


      <div className="inventoryPageContainer">
        <h1>Inventory</h1>
        <p>This is the inventory page.</p>
        <p>Here you can manage your card collection.</p>
      </div>
      <button className="temp" onClick={() => func()}>
        Fetch Profile Test
      </button>
    </div>
  );
}