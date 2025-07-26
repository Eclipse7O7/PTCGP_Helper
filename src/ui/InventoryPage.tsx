import './inventoryPage.css';

export default function InventoryPage() {

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
    console.log("Select Cards icon clicked");
  });
  document.querySelector(".minusIcon")?.addEventListener("click", () => {
    console.log("Remove Cards icon clicked");
  });
  document.querySelector(".plusIcon")?.addEventListener("click", () => {
    console.log("Add Cards icon clicked");
  });


  return (
    <div>
      <img src="src/ui/assets/settings_cog_whiteish.png" className="settingsIcon" alt="Settings Icon"/>
      <img src="src/ui/assets/dot_whiteish.png" className="dotIcon" alt="Select Cards"/>
      <img src="src/ui/assets/minus_whiteish.png" className="minusIcon" alt="Remove Cards"/>
      <img src="src/ui/assets/plus_whiteish.png" className="plusIcon" alt="Add Cards"/>

      <button className="profileButton" onClick={openProfile}><h3>Profile</h3></button>
      <button className="setButton" onClick={openSet}><h3>Set</h3></button>
      <button className="viewButton" onClick={openView}><h3>View</h3></button>



      <h1>Inventory</h1>
      <p>This is the inventory page.</p>
      <p>Here you can manage your card collection.</p>
    </div>
  );
}