// Attempt 2
// Will change to typescript eventually but using js for now
import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { ipcMainHandle, isDev } from "./util.js";
import { getStaticData, pollRescources } from "./rescourceManagerTest.js";
import { getPreloadedPath } from "./pathresolver.js";
import { openSettings } from "./tcgTrackerTest.js";

//type test = string;


// dist-react is the output directory for the React app once it is built

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // Using a preload script as it is better for security reasons than enabling nodeIntegration
      nodeIntegration: false,
      preload: getPreloadedPath()
    },
  });
  if (isDev()) {
    mainWindow.loadURL("http://localhost:5017");
    //mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }
  console.log("App is ready");

  pollRescources(mainWindow);
  
  // This is a non-generalised solution
  /*
  handleGetStaticData(()=> {
    return getStaticData();
  });
  */
  // This is the generalised solution for type safety, using the 
  // wrapper function ipcHandle
  ipcMainHandle("getStaticData", () => {
    return getStaticData();
  });

  ipcMain.handle("openSettings", () => {
    // Your logic to open the settings window goes here
    const found = openSettings();
    console.log("openSettings called in main.ts, found: ", found);
  });
  
});

// This is a non-generalised solution
/*
function handleGetStaticData(callback: () => StaticData) {
  ipcMain.handle("getStaticData", callback);
};
*/

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});









