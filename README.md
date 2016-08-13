# a11y Viewer

**Emulate visual imparity, color blindness and inability to use a pointer.**


## Demo

Checkout the [live demo!](https://voorhoede.github.io/a11y-viewer/)

Note: The online demo is restricted to HTTPS and web pages allowed inside an iframe.
If you [install the a11y-viewer](#install) locally, you don't have these restrictions.


## Install

The a11y-viewer is written in [Node.js](http://nodejs.org/) and can be installed via [npm](https://npmjs.org/):

```bash
npm install a11y-viewer
```

## Command Line usage

You can start the a11y-viewer directly from the command line:

```bash
a11y-viewer [url] [--port number] [--open]
```

### Options

All options are optional.

#### `url`

If you provide a URL for a specific web page (e.g. `https://www.voorhoede.nl`), the a11y-viewer will start on this page.

#### `--port number`

Port number to start a11y-viewer on (e.g. `--port 3000`). Defaults to `1119` ("a11y" in T9).

#### `--open`

If you pass this option, the a11y-viewer will start and open in your default browser.


### Help

You can view all options at any time using `--help`:

```bash
a11y-viewer --help
```

### Examples

**Start a11y-viewer** with default index:

```bash
a11y-viewer
```

Start a11y-viewer **for specific web page**:

```bash
a11y-viewer https://www.voorhoede.nl
```

Start a11y-viewer **on specific port**:

```bash
a11y-viewer https://www.voorhoede.nl --port 3000
```

Start a11y-viewer and **open in browser**:

```bash
a11y-viewer https://www.voorhoede.nl --port 3000 --open
```