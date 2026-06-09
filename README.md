# iOS WebKit Debug Kit

A streamlined and unified toolkit for running the [WebKit Inspector UI](https://github.com/WebKit/WebKit/tree/main/Source/WebInspectorUI) side-by-side with [ios_webkit_debug_proxy](https://github.com/google/ios-webkit-debug-proxy) for debugging ~~Safari~~ WebKit pages running on iOS devices. Technically, most browsers in iOS including Safari are based on WebKit engine.

https://github.com/user-attachments/assets/737b3fa3-9484-4e86-bb78-95d24d8277df

---

### Background

```bash
egrep 'src=|href=' WebKit/Source/WebInspectorUI/UserInterface/Main.html | wc -l
928
```

The copy of WebInspectorUI provided by [WebKit's official repository](https://github.com/WebKit/WebKit) references around **928 JS/CSS resources** from the `Main.html` page alone — all of which must be served locally for the interface to load properly. This process is **slow** and **error-prone**.

To address this, the source code is patched **on the fly** to maintain the dependency chain and is then bundled into a minimal set of optimized, minified files using [esbuild](https://esbuild.github.io/).

Additionally, fixes and optimizations from past projects — such as [ios-safari-remote-debug](https://git.gay/besties/ios-safari-remote-debug) and [ios-safari-remote-debug-kit](https://github.com/HimbeersaftLP/ios-safari-remote-debug-kit) which may have worked in the past but no longer function flawlessly today — have been adopted for a smoother, snappier debugging experience.

---

### Features

- [x] Build and bundle the WebKit Inspector UI from the latest stable release or a specific tag (one-time task).
- [x] Serve the UI using a multi-threaded Node.js web server for to your iOS version.
- [x] Run [ios_webkit_debug_proxy](https://github.com/google/ios-webkit-debug-proxy) within the same server CLI, with multiplexed IO.
- [x] Optionally launch a browser pointing to the device index listing your devices and inspectable pages.
- [x] And yes — it actually works, no excuses. 😉

---

## Prerequisites

1. [Git](https://gitforwindows.org/) for Windows
1. [Node.js](https://nodejs.org/)
1. An iPhone paired with iTunes or [Apple Devices](https://apps.microsoft.com/detail/9np83lwlpz9k) (Windows App). WiFi pairing optional.
1. [`ios_webkit_debug_proxy`](https://github.com/google/ios-webkit-debug-proxy) installed and available in your system `PATH` **or** under `./node_modules/.bin/` for convenience.

---

## Usage Guide

1. Ensure `git`, `npm`, and `node` are installed and working correctly in your shell.

2. Clone this repository and open a terminal inside the cloned folder.

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the bootstrap script:

   ```bash
   npm run prepare -- --tag wpewebkit-2.50.6
   ```

   (Performs a sparse checkout of the WebKit repository and initializes submodules)

5. Build the optimized Inspector UI from WebKit sources:

   ```bash
   npm run build
   ```

   Example output:

   ```
   ✓ In-memory JS entry with 661 imports
   ✓ In-memory CSS entry with 246 imports
   ✓ Final JS written to Main.min.js
   ✓ Injected 103 image variable(s) into in-memory CSS
   ✓ Final CSS written to Main.min.css
   ✓ Rewrote HTML: Main.min.html
   ✓ All builds complete
   ```

6. Start the web server and launch `ios_webkit_debug_proxy`:

   ```bash
   npm run serve -- -v 26.0 -b cromite
   ```

   Example output:

   ```
   Primary 21184 is running
   Listing devices on :9221
   Worker (http) 17812 started on port 9920
   ...
   Worker (http) 8844 started on port 9920
   ▷ WebKit Frontend: http://localhost:9920/Main.html
   ▷ iOS Debug Proxy: http://localhost:9221 ◁ Start Here
   Launching browser: C:\Users\ItsYou!\AppData\Local\Scoop\shims\cromite.EXE
   Connected :9222 to Your iPhone (xxxxx-yyyyyyyy)
   ```

7. For all available options, see the help command:

   ```bash
   npm run serve -- --help
   ```

   ```
   Usage: serve.js [-v 18.4] [-p 9220] [-t 4]

   Options:
       --version   Show version number                          [boolean]
   -v, --proto     iOS protocol version
         [choices: "18.4", "18.2", ..., "13.0"]                 [default: "18.4"]
   -p, --port      Port number to serve frontend on             [default: 9920]
   -t, --threads   Number of worker threads                     [default: 4]
   -x, --proxy     Full path to ios_webkit_debug_proxy
   -b, --browser   Browser executable to launch automatically
       --help      Show help                                    [boolean]
   ```

8. Connect your iOS device via USB or WiFi and visit [http://localhost:9221/](http://localhost:9221/) where each of your connected devices shall be listed. If you cannot find your device here, then fix your connectivity (USB or WiFi) first and verify with running ios_webkit_debug_proxy alone.

   <img width="1668" height="871" alt="Screenshot 2025-07-30 184203" src="https://github.com/user-attachments/assets/bd833390-7d94-4fd5-8272-c7848c24259a" />

   Debug UI should be up and running if all steps were followed right.

9. > Don’t forget to ⭐ Star the repository, share it with your peers, and leave feedback or improvement suggestions in the [Issues](../../issues) section.

---

## License

This project makes use of source code from [WebKit](https://github.com/WebKit/WebKit), [ios_webkit_debug_proxy](https://github.com/google/ios-webkit-debug-proxy), and [ios-safari-remote-debug](https://git.gay/besties/ios-safari-remote-debug), each under their respective licenses.
