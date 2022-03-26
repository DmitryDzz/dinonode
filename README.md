## Introduction

Dinonode is an old school terminal platform open source game.
The game protagonist is Google T-Rex in absolutely terrible apocalyptic circumstances.
The goal is to save the world, of course. The dinosaur world.

## Keyboard controls

* **[Left arrow], [a]:** run left
* **[Right arrow], [d]:** run right
* **[Up arrow], [w]:** jump
* **[Down arrow], [s]:** dodge and accelerate
* **[p]:** pause/unpause
* **[Escape], [Ctrl+C], [q]:** quit

## Cloning the project

```shell
cd <your work directory>
git clone git@github.com:DmitryDzz/dinonode.git
cd dinonode
```

## Install dependencies

```shell
npm install
```

## Project scripts

### Build
```shell
npm run build
```

### Run tests
```shell
npm run test
```

### Check for circular dependencies
```shell
npm run madge
```

### Build and run
```shell
npm run start
```

Or run with command line parameters:
```shell
npm run start -- --difficulty hard --maxScore 25
```

Check the version:
```shell
npm run start -- --version
```

Output help:
```shell
npm run start -- --help
```

### Make executables
```shell
npm run deploy
```
The executables will be stored in `exec/` directory.

## Ready to run executables

### Linux

To run the game in Linux terminal (x64):
```shell
./dinonode-linux
```

Read help for command line arguments:
```shell
./dinonode-linux --help
```

### Windows

To run the game in Windows Terminal (x64):
```shell
./dinonode-win.exe
```

Read help for command line arguments:
```shell
./dinonode-win.exe --help
```

There are two issues with Windows Terminal:
1. It has only 16 colors, so the game is not that pretty in Windows.
2. The default font doesn't display all unicode characters correctly. You have to set the font that is more suitable for unicode. `Cascadia Mono` or `Source Code Pro` work fine.