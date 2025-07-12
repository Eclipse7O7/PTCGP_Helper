import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'


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
        }}>
        </button>
        <img src="../../../desktopIconERApp.png" className="logo" alt="PTCGP Helper logo"/>
        <button className="setButton" onClick={() => {
          //function for changing set
        }}>
        </button>
      </header>
      <div>
        Test
 
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
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
