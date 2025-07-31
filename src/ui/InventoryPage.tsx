import { useEffect, useState } from 'react'
import './inventoryPage.css';

import settingsIcon from './assets/settings_cog_whiteish.png';
import dotIcon from './assets/dot_whiteish.png';
import minusIcon from './assets/minus_whiteish.png';
import plusIcon from './assets/plus_whiteish.png';


export default function InventoryPage() {

  const [currentSet, setSet] = useState<SetData | null>(null);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [inventoryOption, setInventoryOption] = useState<InventoryOptions | null>(null);


  function openProfile() {
    console.log("Profile button clicked");
  }
  function openSet() {
    console.log("Set button clicked");
  }
  function openView() {
    console.log("View button clicked");
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
      // Display profile information in the UI
      var tempButton = document.querySelector(".temp");
      if (tempButton) {
        console.log("\nProfile fetched successfully:", profile, "\n\n");
        tempButton.textContent = `Profile: ${profile.name}`;
        tempButton.after(document.createElement("br"));
        const img = document.createElement("img");
        img.className = "cardImage";
        img.src = profile.collection[0].card.image;
        img.alt = profile.collection[0].card.name;
        tempButton.after(img);
      }
    }
  }






  return (
    <div>
      <img src={settingsIcon} className="settingsIcon" alt="Settings Icon"/>
      <img src={dotIcon} className="dotIcon" alt="Select Cards"/>
      <img src={minusIcon} className="minusIcon" alt="Remove Cards"/>
      <img src={plusIcon} className="plusIcon" alt="Add Cards"/>

      <button className="profileButton" onClick={openProfile}><h3>Profile</h3></button>
      <button className="setButton" onClick={openSet}><h3>Set</h3></button>
      <button className="viewButton" onClick={openView}><h3>View</h3></button>



      <h1>Inventory</h1>
      <p>This is the inventory page.</p>
      <p>Here you can manage your card collection.</p>
      <button className="temp" onClick={() => getProfileByIdUI(0)}>
        Fetch Profile Test
      </button>
    </div>
  );
}