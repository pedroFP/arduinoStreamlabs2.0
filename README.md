# electron-serialport
An example of how to use serialport in an electron app

**Clone and run for a quick way to see Electron and Serialport in action.**

This is a minimal Electron application based on the [Quick Start Guide](http://electron.atom.io/docs/tutorial/quick-start) within the Electron documentation.

**Use this app along with the [Electron API Demos](http://electron.atom.io/#get-started) app for API code examples to help you get started.**

A basic Electron application needs just these files:

- `package.json` - Points to the app's main file and lists its details and dependencies.
- `main.js` - Starts the app and creates a browser window to render HTML. This is the app's **main process**.
- `index.html` - A web page to render. This is the app's **renderer process**.

You can learn more about each of these components within the [Quick Start Guide](http://electron.atom.io/docs/tutorial/quick-start).

## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/johnny-five-io/electron-serialport.git
# Go into the repository
cd electron-serialport
# Install dependencies
npm install
# Run the app
npm start
```

Learn more about Electron and its API in the [documentation](http://electron.atom.io/docs/).

## Other Example Apps

For more example apps, see the
[list of boilerplates](http://electron.atom.io/community/#boilerplates)
created by the awesome electron community.

#### License [CC0 1.0 (Public Domain)](LICENSE.md)

## Add Electron Forge
`$ npx @electron-forge/cli import`
Electron Forge is a complete tool for creating, publishing, and installing modern Electron applications.

## Create a distributable:
`$ npm run make`

Electron-forge creates the out folder where your package will be located:

https://www.electronjs.org/docs/tutorial/quick-start#package-and-distribute-the-application

## Arduino
For the arduino setup there is a file in the `arduino_lcd/` folder where you can upload the sketch to your arduino

## If you prefer to just download the app
### [Here is the google docs .zip file](https://drive.google.com/file/d/1VaTkC9PiNnGABIZN9o1oCkHJENxNbmFu/view?usp=sharing)
![img](images/DriveZipFile.png)

### You just need to download it and open the `ArduTwitch.exe` file