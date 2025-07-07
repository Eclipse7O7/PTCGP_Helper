// Attempt 2
// Will change to typescript eventually but using js for now
import { app, BrowserWindow } from "electron";
import path from "path";
import { isDev } from "./util.js";
import { pollRescources } from "./rescourceManagerTest.js";
import { getPreloadedPath } from "./pathresolver.js";
import {  } from "./tcgTrackerTest.js";

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
  pollRescources();
});



/*
// Attempt 1
const {app, BrowswerWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowswerWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  const startUrl = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`;

  mainWindow.loadURL(startUrl);

  mainWindow.on('closed', () => { mainWindow = null; });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
*/