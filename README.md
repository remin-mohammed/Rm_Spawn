# Rm_Spawn[wip]
Fivem - Spawn Selector
a simple standalone spawn selector


![2024-06-1220-32-15-ezgif com-crop](https://github.com/Anxxity/Rm_Spawn/assets/90343571/68d74f5c-1333-47d6-ac51-a2d69a96b6f9)

# 📥 Download 
https://github.com/Anxxity/Rm_Spwan

# Feature

* change ui colors in config.
* Easy to add and remove locations via config
* Trigger the resource via Exports.
* Smooth Camera Transition
* Standalone resource
* Supports non multicharacters too. by editing Config.multicharacters = false
* Supports Custom location like personal      
property, job locations.



# How to use
- this resource can be exported from your eg. multicharacters resource.
```
local lastlocation = {x = coord.x, y = coord.y, z = coord.z, heading = coord.w}
exports.Rm_Spwan:Selector(lastlocation)
```
# Note if resources name is changed

```
local lastlocation = {x = coord.x, y = coord.y, z = coord.z, heading = coord.w}
exports.ResourceName:Selector(lastlocation)
```
- if Config.multicharacters is false. this Spawn Selector will show up when you spawned in the first time using spawnmanager events handler.

# Custom Spawn locations
- you can define custom locations eg. job locations, personal locations
```
local lastlocation = {x = coord.x, y = coord.y, z = coord.z, heading = coord.w}
local options = {
  [1] = { 
             name = 'house',  -- img name
             label = 'Personal Property', 
             coord = vector4(146.86, -267.63, 43.28, 142.27), 
             info = 'My Personal property in grove street.'
   },
}
exports.Rm_Spawn:Selector(lastlocation,options)
```
<details>
<summary> Getting Started for ui </summary>
## Requirements for developing ui
* [Node > v10.6](https://nodejs.org/en/)
* [Yarn](https://yarnpkg.com/getting-started/install) (Preferred but not required)

*A basic understanding of the modern web development workflow. If you don't 
know this yet, React might not be for you just yet.*
 
## Getting Started

First clone the repository or use the template option and place
it within your `resources` folder

### Installation

*The boilerplate was made using `yarn` but is still compatible with
`npm`.*

Install dependencies by navigating to the `web` folder within
a terminal of your choice and type `npm i` or `yarn`.



**Hot Builds In-Game**

When developing in-game, you can use the hot build system by
running the `start:game` script. This is essentially the start
script but it writes to disk. Meaning all that is required is a
resource restart to update the game script

**Usage**
```sh
# yarn
yarn start:game
# npm
npm run start:game
```

**Production Builds**

When you are done with development phase for your resource. You
must create a production build that is optimized and minimized.

You can do this by running the following:

```sh
npm run build
yarn build 
```
</details>

# Disclamer

This is purely not my stuff  
credits:-
 - https://github.com/project-error/fivem-react-boilerplate-lua


- Original Base Code
https://github.com/renzuzu/renzu_spawn
