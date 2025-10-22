---
layout: page
title: "TWG3"
description: A consolidated report analyzing the codebase, game mechanics, and web portal.
img: assets/img/ExoSky.jpeg
importance: 1
category: game developement
related_publications: false
toc:
  sidebar: left
---

# **Abstract**

This report presents a comprehensive, multi-faceted analysis of the "Thunder Warrior: Genesis" (TWG) project, a full-stack, web-based multiplayer game. The analysis is tripartite, examining the project's underlying technical architecture, its detailed game design and asset specifications, and its robust web portal and community infrastructure. The findings reveal a technically sophisticated application built on a client-server model using WebSockets for real-time communication. The codebase demonstrates a modular, object-oriented design for core game simulation (e.g., `Trooper`, `Projectile`, `CollisionDetection`). The game design is defined by an extensive and deeply layered customization system, including numerous equipment sets, weapons, abilities, and a multi-tiered modification system. Finally, the web portal analysis shows a mature, security-conscious, and community-focused infrastructure, featuring detailed account management, multiple user feedback channels, and a transparent development pipeline. This document synthesizes these components to provide a holistic overview of the project's technical scope and complexity.

---

# **Introduction**

The "Thunder Warrior: Genesis" (TWG) project is a sci-fi action game currently in its open beta phase. This report provides an exhaustive technical breakdown of the project, derived from an in-depth analysis of its codebase, game mechanics, and web portal components. The objective is to document the project's architecture, design, and technical features in granular detail.

The analysis is structured into three primary parts:

- **Part I: System Architecture and Codebase Analysis** details the frontend, client-side, and server-side code, including the core game simulation and physics.
- **Part II: Game Mechanics and Asset Specification** provides an exhaustive catalog of all defined game assets, including armor, weapons, abilities, status effects, and modifications.
- **Part III: Web Portal and Community Infrastructure** analyzes the user-facing web application, including account management, UI/UX evolution, and community engagement systems.

---

# **Part I: System Architecture and Codebase Analysis**

This section provides an exhaustive analysis of the provided codebase for the "Thunder Warrior: Genesis" (TWG) game. The analysis covers the frontend structure, client-side logic, server-side game management, and the core game mechanics as implemented in the code.

## **I. Frontend Implementation (`client.html`, CSS)**

The `client.html` file serves as the entry point and primary structure for the game's user interface (UI), specifically the main menu and character management screens.

### **A. HTML Structure and Metadata**

- **Document Type**: Standard HTML5 doctype (`<!DOCTYPE html>`).
- **Head Section**:
  - **Title**: "TWG Menu - Thunder Warrior: Genesis".
  - **Favicons**: A comprehensive set of favicons (`apple-touch-icon`, `icon`, `manifest`, `mask-icon`, `shortcut icon`) and meta tags for platform-specific branding (Microsoft Tile, `theme-color`).
  - **Inline CSS**: A substantial inline `<style>` block defines the application's visual appearance.
  - **JavaScript**: Links to `clientWebsocket.js` and includes a large inline `<script>` block containing the primary client-side menu logic.
- **Body Section**:
  - **Styling and Events**: Sets a dark background (`#010105`) and attaches an `onresize` event handler for dynamic layout adjustments.
  - **Main Containers**: The UI is segmented into several top-level `div` elements, each representing a distinct screen, managed via JavaScript:
    - `loadingPage`: Displays loading indicators.
    - `classSelectionScreen`: Interface for initial attribute allocation.
    - `homeScreen`: The main menu hub.
    - `weaponPage`: Screen for weapon/modification management.
    - `abilityPage`: Screen for ability management.
    - `shopScreen`: Interface for purchasing items.
    - `settingsScreen`: Modal overlay for account/game options.
    - `rewardsScreen`: Modal for displaying earned rewards.
    - `upgradeAbilityScreen`: Modal for level-up ability upgrades.
    - `statsScreen`: Modal for detailed statistics.
    - `gameModeSelectionBackground`/`gameModeSelectionTab`: UI for game mode selection.
    - `tellScreen`: Generic modal for informational messages.
    - `descriptionBackground`: Pop-up element for item tooltips.
  - **Templates**: Utilizes HTML `<template>` tags (`purchaseTemplate`, `paymentScreenTemplate`, etc.) for dynamic generation of repetitive UI elements (e.g., shop items).
  - **Visibility**: Most screens are initially hidden (`visibility: hidden`) and toggled by JavaScript.
  - **IFrame**: Includes an `iframe` with `src='https://thunderwarrior.org/iframe'`, likely for cross-domain authentication or data retrieval.
  - **Form**: Contains a hidden `form` (`startForm`) used to POST data when transitioning to the game client.

### **B. CSS Styling**

- **Units and Responsiveness**: Extensively uses `vmin` (viewport-minimum) for sizing and positioning, enabling proportional scaling of the UI.
- **Layout**: Primarily uses `position: absolute` for screen-level layout within a fixed-size container ($100vmin \times 100vmin$). Flexbox (`display: flex`) is used for alignment within specific components (e.g., `informationBar`).
- **Visual Appearance**:
  - **Color Scheme**: A dark, futuristic/sci-fi palette (dark blues, purples, grays) with highlights (white, yellow, green, red).
  - **Gradients**: Employs `linear-gradient` and `radial-gradient` for buttons and effects.
  - **Borders and Radius**: Heavy use of `border-radius` for rounded and circular elements.
  - **Transparency/Overlays**: Uses `rgba` colors for semi-transparent modal backgrounds.
- **Interactivity & Animation**:
  - **Hover Effects**: Provides visual feedback on `:hover` for interactive elements.
  - **Animations**: Uses CSS `@keyframes` (`spin`, `pulseAnimation`) for loading indicators and UI effects.
  - **Transitions**: Employs CSS `transition` for smooth property changes (e.g., `opacity`).
- **Scrollbars**: Customizes scrollbar appearance using `::-webkit-scrollbar`.
- **User Interaction**: Disables text selection (`user-select: none`) to maintain a game-like interface.

---

## **II. Client-Side Logic (`client.html` `<script>`, `clientWebsocket.js`)**

The client-side JavaScript manages UI state, handles user interactions, and orchestrates WebSocket communication with the server.

### **A. Initialization and Authentication**

1.  **Loading Sequence**: On window load, `runGame` $\rightarrow$ `loadGame` requests account credentials from the `iframe` (`getAccount`).
2.  **Credential Handling**: An `onmessage` handler receives credentials (`username`, `password`) from the iframe. If successful, it stores them and calls `load`.
3.  **WebSocket Connection (`clientWebsocket.js`)**: `load` calls `createWebSocket`.
    - `createWebSocket` establishes the connection and sets up `onopen`, `onerror`, `onmessage`, and `onclose` handlers.
    - `messageWS` handles incoming messages, performing an initial security check (`checkMessage`) involving a key exchange and timestamp verification.
    - Upon a successful check, a `ticket` is stored, and an 'account' message is sent (`sendAccount`) with credentials.
4.  **Data Loading**:
    - The server responds with a 'user' message containing player data (`user`), game `options`, and `status`.
    - `recieveAnyMessage` routes this to `loadAll` (in `client.html`).
    - `loadAll` stores the data in the global `troop` variable, initializes game definitions (equipment, abilities), and begins loading images (`createAllImages`).
5.  **Image Loading**: `createAllImages` tracks image loading progress and updates the `loadStatus` element.
6.  **Final Setup**: Once images are loaded, `continuePageCreationWithLoadedImages` sets up event listeners, updates UI displays, checks if class selection is needed, and finally hides the loading screen.

### **B. UI Management and Navigation**

- **Screen Visibility**: A global `onPage` variable tracks the active screen. Functions like `showHomeScreen` and `hideHomeScreen` manipulate the `visibility` style property to navigate.
- **Dynamic Content**:
  - **Templates**: Uses `<template>` elements to dynamically generate lists (shop items, class selectors).
  - **Resource Display**: `updateResources` updates UI text for currency, experience, etc.
  - **Character Display**: Updates `img` sources and draws the character model onto a canvas (`drawFullCharacter`).
  - **Tooltips**: `showWeaponDescription` and `showAbilityDescription` populate and position the `descriptionBackground` element with item details.

### **C. Core Menu Logic**

- **Class Selection**: Manages the initial attribute point allocation screen (`classSelectionScreen`). `modifyClassOption` handles point distribution, and `selectClass` finalizes the choices, sending them to the server (`saveTraitToServer`).
- **Home Screen**: The central hub displaying character, resources, and equipment. Clickable elements navigate to other screens (Weapon, Ability, Shop).
- **Weapon/Equipment Page (`weaponPage`)**: Displays details for `selectedEquipment`. Allows equipping/deconstructing items and managing equipped modifications (`displayOrHideModOptions`).
- **Ability Page (`abilityPage`)**: Displays the Stamina and Thaumaturgy ability trees. `createAbilityOption` dynamically generates icons. Handles unlocking (`setUnlockButton`), equipping (`equipAbility`), and displaying ability details.
- **Shop Page (`shopScreen`)**: Tabbed interface for different item categories. `setShopScreen` renders purchase options onto canvases. `makePurchase` handles the transaction logic.
- **Starting Game**: `showGameModeSelection` displays game modes. `startGame` packages necessary data (`getGameData`) and uses `sessionStorage` and form submission (`joinGame`) to transition to the game client.

### **D. Data Management**

- **Global `troop` Object**: Holds all player-specific data received from the server.
- **Equipment/Ability Definitions**: Contains extensive static data definitions for all base equipment, modifications, and abilities, including stats, costs, and prerequisites.
- **Calculations**: Includes functions to calculate modified stats based on mods (`getModifiedEquipment`), item power (`getPower`), and dynamic ability descriptions (`getAbilityDescription`).
- **Server Synchronization**: The `saveTraitToServer` function sends updates via WebSocket whenever persistent data changes (e.g., equipping items, unlocking abilities).

---

## **III. Server-Side Logic (`gameServer.js`, `websocket.js`)**

The server manages game instances, handles client communication within games, and runs the core game simulation.

### **A. Game Instance Management (`gameServer.js`)**

- **`NEW_GAME` Constructor**: Represents a single game instance (room). It is initialized with game configuration (`game`), WebSocket utilities (`w`, `wss`), and termination callbacks.
- **Initialization**: Stores map data, creates `Trooper` objects for each player (`buildTroopers`), initializes projectiles, and sets up `CollisionDetection`.
- **Game Loop**:
  - Executes at a fixed tick rate (`fps`).
  - Calculates delta time (`setDeltaTime`).
  - Updates all troopers and projectiles (`updateGame`).
  - Checks for win/end conditions (`checkWin`).
  - Broadcasts the updated state to all clients (`sendUpdate`).
- **Termination**:
  - `checkWin` monitors trooper `alive` status and affiliation counts. If conditions are met (one team remaining, disconnects, timeout), it calls `gameOver` or `endGame`.
  - `gameOver` records the winner and calls the `finishGame` callback.
  - `endGame` stops the game loop (`clearInterval`) and calls the `terminateGame` callback.

### **B. Client Communication (`gameServer.js`, `websocket.js`)**

- **Input Handling**: The `newInput` method receives player input from the WebSocket server and forwards it to the corresponding `Trooper` object.
- **Connection Management**: `disconnect` and `rejoin` methods update the `connected` status of `Trooper` objects.
- **State Synchronization**: `sendUpdate` gathers state data from all `Trooper` and `Projectile` objects (via their `.data` getters) and broadcasts it to the room using `w.sendToRooms`.
- **WebSocket Utilities (`websocket.js`)**: Provides helper functions for sending messages, managing room membership, handling keep-alive pings, and verifying client connections.

### **C. Server-Side Game Logic**

- **Simulation**: The `updateGame` function orchestrates the simulation tick:
  1.  Calls `prepare` on all troopers (updates delta time, processes input, updates status effects/abilities).
  2.  Calls `update` on all troopers (handles movement, combat, physics).
  3.  Calls `update` on all projectiles (movement, collision checks).
  4.  Calls `reset` on all troopers (clears temporary multipliers).
- **Object Management**: Maintains lists of `troopers` and `projectiles`.

---

## **IV. Core Gameplay Object Analysis**

These files define the fundamental objects and rules of the game simulation.

### **A. Character (`Trooper.js`)**

- **Representation**: The central class representing a player in the game world.
- **State**: Maintains extensive state, including position ($x$, $y$, $z$), rotation (`rot`), dimensions ($w$, $h$, $d$), velocity, core stats (HP, Stamina, Thaumaturgy), affiliation, status, equipped weapons, active abilities, status effects, input state, and animation flags.
- **Physics/Movement**: Implements gravity, acceleration/deceleration, jumping (including variable height), running, and collision response (`boxCollision`).
- **Combat**: Handles damage application (`damage` method), defense calculations, critical hits, and evasion. Tracks health and death state. Delegates combat actions to `Gun` and `Saber` instances.
- **Resources**: Manages HP, Stamina, and Thaumaturgy, including current/max values, regeneration rates, and cooldowns.
- **Abilities**: Manages the activation, execution, and cooldown of abilities, interacting with `AbilityEffect.js`.
- **Status Effects**: Manages applied status effects via the `status` array, interacting with `StatusEffect.js` to modify multipliers (`troop.mult`).
- **Data Serialization**: The `.data` getter packages essential state for network synchronization.

### **B. Weapons (`Gun.js`, `Saber.js`, `WeaponBase.js`)**

- **Common Base (`WeaponBase.js`)**: Provides shared logic for firing/action cooldowns (`firingSpeed`), resource management (`heat`), and activation state.
- **Ranged Weapons (`Gun.js`)**:
  - Handles firing logic, heat tracking, firing rate, and spread.
  - Creates `Projectile` instances.
  - Supports special shots activated by abilities.
- **Melee Weapons (`Saber.js`)**:
  - **Striking**: Manages strike cooldowns, delays, and applies damage within an arc using collision detection.
  - **Blocking**: Manages block state, duration, and parry window. Handles projectile reflection (`blockProjectile`) and melee deflection (`blockSaber`) based on angle checks. Consumes stamina.
- **Projectiles (`Projectile.js`)**:
  - Represents individual shots. Moves in a straight line, checks for collisions (`CD.check`), and applies damage with falloff. Expires after exceeding `maxRange`.

### **C. Abilities and Status Effects (`AbilityEffect.js`, `StatusEffect.js`)**

- **Ability Logic (`AbilityEffect.js`)**: Contains the specific server-side implementation for each ability, defining activation logic, per-tick updates, and end conditions.
- **Status Effect Logic (`StatusEffect.js`)**: Defines how temporary buffs and debuffs modify a trooper's state or behavior over time, typically by modifying `troop.mult` properties.

### **D. Physics and Collision (`CollisionDetection.js`, `MathVector.js`)**

- **Collision Detection (`CollisionDetection.js`)**: Provides functions for checking intersections between shapes (AABB boxes, planes, arcs) used for movement, projectiles, and abilities.
- **Vector Math (`MathVector.js`)**: Includes utilities for vector rotation, normalization, and direction calculation.
- **Trooper Physics (`Trooper.js`)**: Implements basic physics, including gravity, acceleration, and collision response.

### **E. Map Generation (`mapBuilder.js`)**

- Defines maps as arrays of obstacle objects and structured spawn position data.
- Selects a map and assigns spawn points to players based on affiliation.

---

## **V. Overall Architecture and Observations**

- **Client-Server Model**: The project follows an authoritative server model. The server (`gameServer.js`) runs the simulation, while clients send input and receive state updates via WebSockets.
- **Modularity**: The codebase is reasonably modular, with separation of concerns (e.g., `Trooper.js`, `Gun.js`, `gameServer.js`, `client.html`).
- **Object-Oriented Elements**: Utilizes constructor functions and prototypes to create classes for game entities.
- **State Management**: State is managed primarily within `Trooper` objects on the server and synchronized. The client menu maintains its own UI state and player data (`troop` object).
- **Data Definitions**: A significant amount of static game data (weapon stats, ability definitions) is defined directly within the JavaScript files. This could be externalized (e.g., to JSON) for easier management.
- **Complexity**: The `Trooper.js`, `client.html` (inline script), and `AbilityEffect.js` files are notably large and complex, handling a wide range of interconnected logic.

---

# **Part II: Game Mechanics and Asset Specification**

This section provides an extensive and detailed description of every Gun, Armor piece, Saber, Ability, Status Effect, and Modification as defined within the project's codebase.

## **I. Armor Specifications**

Armor pieces provide defensive stats, affect weight, and contribute to passive character traits. All listed armor pieces have 3 modification slots.

### **A. Thunder Warrior Set (Default/Balanced)**

- **Class**: Defensive
- **Description**: Standard issue armor, balanced stats.
- **Pieces**: Thunder Warrior Helmet, Torso, Legs, Right Arm, Left Arm.
- **Stats**: Provides balanced contributions across Stamina, Thaumaturgy, Health, and Physical categories. Offers moderate ranged and melee defense.

### **B. Sith Set**

- **Class**: Defensive
- **Description**: Focuses on Thaumaturgy stats and melee defense; heavier than the Thunder Warrior set.
- **Pieces**: Sith Helmet, Torso, Legs, Right Arm, Left Arm.
- **Stats**: High Thaumaturgy resistances, defense, and tenacity. Higher melee defense than ranged.

### **C. Shadow Set**

- **Class**: Defensive
- **Description**: Focuses on Stamina stats, evasion, ranged defense, and stealth; lighter than the Thunder Warrior set.
- **Pieces**: Shadow Helmet, Torso, Legs, Right Arm, Left Arm.
- **Stats**: Very high Stamina evasion, defense, and tenacity. Higher ranged defense than melee. Significant stealth radius contribution.

### **D. Festive Set**

- **Class**: Defensive
- **Description**: Appears to be a lower-stat set, possibly cosmetic or for events.
- **Pieces**: Festive Helmet, Torso, Legs, Right Arm, Left Arm.
- **Stats**: Low, relatively balanced contributions across all stats.

---

## **II. Ranged Weapon Specifications (Guns)**

Guns handle projectile firing, heat management, and contribute to offensive stats. All listed guns have 3 modification slots. Base damage values are multiplied by 3 in the code.

### **A. E-11 Variants (Blaster Rifle - Thunder Warrior Set)**

1.  **E-11 Twilight**: Standard, balanced variant.
    - **Base Damage**: 100
    - **Range**: 10
    - **Firing Speed**: 500ms
    - **Heat (Max/Inc/Wait/Over)**: 2500 / 250 / 3000 / 5000
2.  **E-11 Affluent**: Focuses on critical hits; slower fire rate, less damage, but higher crit stats.
    - **Base Damage**: 80
    - **Range**: 11
    - **Firing Speed**: 600ms
    - **Heat (Max/Inc/Wait/Over)**: 2250 / 200 / 4000 / 6000
3.  **E-11 Viper**: Focuses on burst damage; faster fire rate, higher damage, but lower range and heat capacity.
    - **Base Damage**: 115
    - **Range**: 8.5
    - **Firing Speed**: 350ms
    - **Heat (Max/Inc/Wait/Over)**: 3500 / 437.5 / 2000 / 4500

### **B. DLT-19 Variants (Repeating Blaster - Sith Set)**

1.  **DLT-19 Epitome**: Standard variant. Very high fire rate, low damage/range.
    - **Base Damage**: 30
    - **Range**: 7
    - **Firing Speed**: 200ms
    - **Heat (Max/Inc/Wait/Over)**: 1000 / 25 / 5000 / 4000
2.  **DLT-19 Deluge**: Higher fire rate and heat capacity, but lower damage.
    - **Base Damage**: 20
    - **Range**: 6.5
    - **Firing Speed**: 150ms
    - **Heat (Max/Inc/Wait/Over)**: 1500 / 15 / 7000 / 5500
3.  **DLT-19 Scarlet**: Higher damage, but slower fire rate and less heat capacity.
    - **Base Damage**: 40
    - **Range**: 7.5
    - **Firing Speed**: 250ms
    - **Heat (Max/Inc/Wait/Over)**: 2000 / 80 / 4250 / 5000

### **C. T-21 Variants (Heavy Blaster - Shadow Set)**

1.  **T-21 Shade**: Standard variant. Very high damage and range, very low fire rate.
    - **Base Damage**: 200
    - **Range**: 15
    - **Firing Speed**: 2000ms
    - **Heat (Max/Inc/Wait/Over)**: 4000 / 2670 / 4000 / 2000
2.  **T-21 Vintage**: Even higher damage and range, but slower fire rate.
    - **Base Damage**: 250
    - **Range**: 20
    - **Firing Speed**: 3500ms
    - **Heat (Max/Inc/Wait/Over)**: 6000 / 4800 / 5000 / 3000
3.  **T-21 Amaranthine**: Modified for closer combat. Less damage, but better fire rate and heat capacity.
    - **Base Damage**: 150
    - **Range**: 6
    - **Firing Speed**: 750ms
    - **Heat (Max/Inc/Wait/Over)**: 3000 / 1670 / 4400 / 1500

---

## **III. Melee Weapon Specifications (Sabers)**

Sabers (Plasmablades) handle striking and blocking. All listed sabers have 3 modification slots. Base damage values are multiplied by 3 in the code.

### **A. Aggressive Sabers (Shadow Set)**

- **Focus**: High damage, fast attacks, wide arcs. Low defensive capability.
- **Variants**:
  1.  **Coral Plasmablade (Orange)**: Standard. Damage 300, Delay 0.4s, Wait 1.5s, Cost 200.
  2.  **Amethyst Plasmablade (Purple)**: Slow, heavy-hitting. Damage 500, Delay 0.7s, Wait 2.25s, Cost 350.
  3.  **Garnet Plasmablade (Red)**: Rapid attacks. Damage 235, Delay 0.2s, Wait 0.75s, Cost 150.

### **B. Defensive Sabers (Sith Set)**

- **Focus**: Excellent blocking, long parry windows, low stamina cost for blocking. Low offensive capability.
- **Variants**:
  1.  **Tanzanite Plasmablade (Blue)**: Standard. Parry 1s. Damage 200, Delay 0.8s, Wait 2.5s, Cost 400.
  2.  **Emerald Plasmablade (Green)**: Sustained blocking (very low drain). Parry 1.5s. Damage 220, Delay 1s, Wait 2.75s, Cost 450.
  3.  **Peridot Plasmablade (Lime)**: Quick blocking (very low initial cost). Parry 0.75s. Damage 175, Delay 0.725s, Wait 2.15s, Cost 375.

### **C. Balanced Sabers (Thunder Warrior Set)**

- **Focus**: A mix of offensive and defensive capabilities.
- **Variants**:
  1.  **Topaz Plasmablade (Yellow)**: Standard. Parry 0.5s. Damage 250, Delay 0.6s, Wait 2s, Cost 300.
  2.  **Boracite Plasmablade (Cyan)**: Higher stats, higher costs. Parry 0.7s. Damage 275, Delay 0.5s, Wait 1.75s, Cost 510.
  3.  **Alabaster Plasmablade (White)**: Lower stats, lower costs. Parry 0.4s. Damage 230, Delay 0.725s, Wait 2.125s, Cost 210.

---

## **IV. Ability Specifications**

Abilities are active skills consuming Stamina or Thaumaturgy.

### **A. Stamina Abilities (Partial List)**

- **Bound (`Jump`)**: Standard jump. (Cost: 500 Stamina)
- **Sprint (`Run`)**: Increases speed by 100% (total $2\times$) while held. (Cost: 300 Stamina + 150/sec drain)
- **Expeditious Retreat (`ExpeditiousRetreat`)**: Increases speed by 150% (total $2.5\times$) and defense by 25% while held. (Cost: 400 Stamina + 500/sec drain)
- **Dash (`Dash`)**: Brief burst of speed (total $7\times$) for 0.75s. (Cost: 250 Stamina, 75 Thaumaturgy)
- **Leap (`Leap`)**: Long forward jump. (Cost: 600 Stamina)
- **Change Weapon (`ChangeWeapon`)**: Swaps between ranged and melee. (Cost: 440 Stamina)
- **Flurry Of Blows (`FlurryOfBlows`)**: Increases melee attack speed by 75% for 8.5s. (Cost: 540 Stamina, 25 Thaumaturgy)
- **Power Strike (`PowerStrike`)**: 1 enhanced saber strike ($1.25\times$ damage, applies slow). (Cost: 520 Stamina + $1.5\times$ Strike Cost)
- **Bleed Strike (`BleedStrike`)**: 2 enhanced saber strikes ($1.3\times$ damage, applies bleed). (Cost: 480 Stamina + $1.1\times$ Strike Cost)
- **Traditional Block (`SimpleBlock`)**: Standard saber block. (Cost: Saber Block Costs)
- **Thaumaturgy Block (`ThaumBlock`)**: Blocks all attack types, cannot parry. (Cost: 30 Thaumaturgy + modified Saber Costs)
- **Heal (`Heal`)**: Instantly restores 100 health. (Cost: 1000 Stamina, 50 Thaumaturgy)
- **Preparation (`Preparation`)**: After 15s activation, grants significant boosts to all stats for 10s. (Cost: 900 Stamina, 15 Thaumaturgy)
- **Defensive (`Defensive`)**: Increases defense by 50% for 8s. (Cost: 600 Stamina)
- **Annihilation (`Annihilation`)**: Increases all damage output by 30% for 7s. (Cost: 640 Stamina)
- **Snipe Shot (`SnipeShot`)**: 1 enhanced shot ($1.5\times$ damage, $2\times$ range). (Cost: 380 Stamina + $2\times$ Heat Cost)
- **Triple Shot (`TripleShot`)**: 3 enhanced shots ($1.25\times$ damage, high crit). (Cost: 430 Stamina + $0.7\times$ Heat Cost)

### **B. Thaumaturgy Abilities (Partial List)**

- **Hover (`Hover`)**: (AoE Buff) Reduces weight and fall speed for allies for 11s. (Cost: 140 Stamina, 40 Thaumaturgy)
- **Speed Aura (`SpeedAura`)**: (AoE Buff) Increases movement, melee, and firing speed for allies by 50% for 8s. (Cost: 200 Stamina, 65 Thaumaturgy)
- **Fortification (`Fortification`)**: (AoE Buff) Increases defense for allies by 50% for 7s. (Cost: 95 Thaumaturgy)
- **Recovery (`Recovery`)**: (Self) Instantly restores 500 stamina. (Cost: 70 Thaumaturgy)
- **Cool (`Cool`)**: (AoE Buff - Ultimate) Instantly removes all gun heat and reduces heat buildup for allies for 9.5s. (Cost: 110 Thaumaturgy)
- **HealAura (`HealAura`)**: (AoE Buff) Heals allies for 50 health/sec for 9s. (Cost: 105 Thaumaturgy)
- **Push (`Push`)**: (AoE Damage) Deals 360 Thaumaturgy damage and knocks targets away. (Cost: 120 Stamina, 95 Thaumaturgy)
- **Pull (`Pull`)**: (AoE Damage) Deals 240 Thaumaturgy damage and pulls targets closer. (Cost: 160 Stamina, 115 Thaumaturgy)
- **Life Drain (`LifeDrain`)**: (AoE Damage) Deals 500 Thaumaturgy damage, healing user for 50% of damage dealt. (Cost: 80 Thaumaturgy)
- **Repulse (`Repulse`)**: (AoE Damage - Ultimate) Pulls targets, deals 700 damage, then pushes them away. (Cost: 240 Stamina, 130 Thaumaturgy)
- **Weaken (`Weaken`)**: (AoE Debuff) Deals 450 Thaumaturgy damage, applies 40% damage reduction to enemies for 7.5s. (Cost: 75 Thaumaturgy)
- **Damage Aura (`DamageAura`)**: (AoE Debuff - Ultimate) Deals 120 Thaumaturgy damage/sec and applies 70% slow to enemies for 10s. (Cost: 300 Thaumaturgy)
- **Tether (`Tether`)**: (AoE Debuff) Deals 350 Thaumaturgy damage, applies 100% increased weight and 30% slow for 7s. (Cost: 100 Stamina, 50 Thaumaturgy)
- **Hold (`Hold`)**: (Control) Lifts target, allowing caster to move them for 11s. Deals 30 damage/sec. (Cost: 120 Thaumaturgy)
- **Mind Control (`MindControl`)**: (Control - Ultimate) Takes control of target for 16s. (Cost: 500 Thaumaturgy)
- **Freeze (`Freeze`)**: (Control) Freezes target in place for 3s. (Cost: 120 Thaumaturgy)

---

## **V. Status Effect Specifications (`StatusEffect.js`)**

These are temporary effects that modify trooper stats via multipliers (`troop.mult`).

### **A. Buffs**

- **`cool`**: Reduces gun heat generation.
- **`speed`**: Multiplies `troop.mult.speed`.
- **`defense`**: Multiplies `troop.mult.defense`.
- **`healOverTime`**: Heals periodically.
- **`firingSpeed`**: Multiplies `troop.mult.firing`.
- **`damaging`**: Multiplies `troop.mult.damage`.
- **`meleeSpeed`**: Multiplies `troop.mult.meleeSpeed`.
- **`weightless`**: Multiplies `troop.mult.weight` (less than 1).
- **`hover`**: Multiplies `troop.mult.fallSpeed` (less than 1).
- **`jumping`**: Multiplies `troop.mult.jump`.
- **`prepared`**: Applies multipliers to numerous stats.

### **B. Debuffs**

- **`knockback`**: Applies a decaying directional force.
- **`slow`**: Multiplies `troop.mult.speed` (less than 1).
- **`confuse`**: Randomly swaps input axes.
- **`reverse`**: Inverts input axes.
- **`fear`**: Forces backward movement.
- **`expose`**: Multiplies `troop.mult.defense` (less than 1, increasing damage taken).
- **`heavy`**: Multiplies `troop.mult.weight` (greater than 1).
- **`stun`**: Cancels actions and input.
- **`frozen`**: Cancels actions/input and sets `troop.mult.fallSpeed = 0`.

---

## **VI. Modification (Mod) Specifications**

Mods enhance equipment stats and are defined by a base effect, rarity, and level.

### **A. Major Mods (Base Effect)**

- **Weapon Mods**: Damage, Quick Fire (reduces delays).
- **Melee Mods**: Power (radius/knockback), Deflection (saber blocking), Reflection (projectile blocking), Usage Speed (cooldowns), Slightness (stamina costs), Parry (parry window).
- **Ranged Mods**: Firing Speed, Maximum Spread, Projectile Speed, Cooling Power, Maximum Heat, Range.
- **Armor Mods**: Defense, Weight, Stamina Recovery, Thaumaturgy Recovery, Health Recovery.

### **B. Minor Modifications Traits (`modTraits`)**

- These are secondary stats randomly added to mods based on rarity. They are grouped by weighted chance.
- **Group 1 (Weight 2)**: Specific combat stats (e.g., Thaumaturgy Critical Chance, Physical Evasion Defense).
- **Group 2 (Weight 5)**: Core resource stats (e.g., Max Health, Stamina Recovery).
- **Group 3 (Weight 3)**: General ability stats (e.g., Stamina/Thaumaturgy Duration, Physical Damage).
- **Group 4 (Weight 1)**: Utility stats (e.g., Stealth Radius, Movement Speed, Health on Kill, Knockback Resistance).

---

# **Part III: Web Portal and Community Infrastructure**

This section provides a comprehensive analysis of the project's web portal, based on an extensive review of 128 HTML message and article files from the `homeMessages` directory.

## **I. Overview of Web Portal**

The "Thunder Warrior: Genesis" project is supported by a robust web portal that serves as the central hub for account management, community news, and user feedback. The portal is currently supporting an open beta, with a strong emphasis on community-driven development.

Analysis of the `homeMessages` files reveals a modular client-side notification system. This system uses JavaScript functions (e.g., `setMessage()`, `setArticle()`, `newSection()`) to dynamically load static HTML snippets, which serve as user notifications, error messages, and news articles. This architecture allows for easily updatable, non-blocking user communication.

## **II. User Account Management System**

The project features an exceptionally thorough and secure account management system, with specific error handling for nearly every possible user state.

### **A. Account Sign Up (Registration)**

- **Validation**: Checks for empty fields, password mismatch, password length ($>$7 chars, alphanumeric), and username length ($<$20 chars, alphanumeric).
- **Conflict Handling**: Provides distinct error messages if the username is taken, the email is taken, or if the username is taken but the associated email is unconfirmed.
- **Status Handling**: Blocks registration for usernames associated with banned or deleted accounts.
- **Success**: Informs the user that a confirmation code has been sent.

### **B. Account Sign In (Authentication)**

- **Validation**: Checks for empty fields and incorrect credentials.
- **Account Status**:
  - **Unconfirmed**: Allows sign-in but informs the user a new confirmation code has been sent.
  - **Banned/Deleted**: Blocks sign-in and directs to "Contact Us".
- **One-Time Password (OTP)**: Handles OTPs from password resets, with specific errors for expired ($>$1 hour) or previously used codes.

### **C. Account Confirmation**

- **Validation**: Checks for incorrect, expired, or already-confirmed codes.
- **Resending**: Allows users to request a new code, with validation to ensure it's for a pre-existing account.

### **D. Account Recovery (Forgot Password/Username)**

- **Validation**: Checks for empty fields and non-existent accounts.
- **Status Handling**: Blocks recovery for unconfirmed or banned accounts.
- **Success**:
  - **Username**: Sends the username to the account's email.
  - **Password**: Sends a one-time-use password, valid for one hour, and explicitly instructs the user to change it immediately.

### **E. Account Information Editing**

- **Validation**: Requires correct current credentials. Enforces all password and username rules for new values.
- **Conflict Handling**: Prevents users from changing to an already-taken username or email.
- **Redundancy Check**: Prevents updates if the new information is identical to the old.
- **Email Change**: On successful email change, informs the user they must re-confirm with a new code.

### **F. Account Deletion & Banning**

- **User Deletion**: Allows users to irreversibly delete their own accounts.
- **Banned Status**: A "banned" status prevents all account activity (sign-in, feedback, rating, editing) across the entire portal.
- **Admin Tools**: A "Deletion Code" module exists, suggesting an administrative back-end for account banning.

## **III. Gameplay and Feature Onboarding**

News articles within the portal detail the game's core mechanics for players.

- **Classes**: Players choose a class (e.g., Jedi, Sith, Infiltrator) which defines starting skills (Power, Constitution, Thaumaturgy, etc.), faction (Empire/Rebellion), passive traits, and starting equipment.
- **Equipment**:
  - **Slots**: Helmet, Torso, Legs, Right/Left Arm, Ranged Weapon, Melee Weapon.
  - **Rarity**: A 7-tier system (Junk, Common, Uncommon, Rare, Epic, Legendary, Insane) affects stats.
  - **Acquisition**: Dropped by enemies or acquired from the shop using "credits and metal".
- **Modifications System**: A core customization feature.
  - **Structure**: Mods have one "Main Enhancement" (e.g., Defense) and up to four "Minor Enhancements" (secondary stats or "Universal Changes" like ability cost).
  - **Balancing**: Minor enhancements can be a "slight Decrease" to balance more powerful traits on the same mod.
- **Combat System**:
  - **Melee**: Introduced as a major update. Players press 'f' to swap. Melee attacks are high-damage but slow.
  - **Blocking**: Holding 'shift' with a melee weapon reflects projectiles and staggers melee attackers.
- **Game World**: Gameplay occurs on various planets (Julix IV, Athemorum, Frin'Sai, Tralion Catornay), each with a unique map and environment.

## **IV. User Interface (UI) and User Experience (UX) Analysis**

The news articles document a significant, ongoing effort to refine the UI/UX.

- **Web Page Redesign**: The entire website was "completely revamped" with a new persistent navigation bar, a side menu, and optimized images for reduced loading.
- **Home Page Remodeling**: The main character dashboard was redesigned to feature a central preview of the player's character, surrounded by clickable icons for each equipment slot.
- **In-Game UI ("Information Update")**:
  - **Status Bars**: HP, Stamina, Thaumaturgy, and Heat bars were updated to show exact numerical values (current/max).
  - **Detailed Stats**: A hover-over system shows key stats, while a "detailed view" provides an extended list of "over twenty different stats" for equipment.
- **Game Error Handling**: A dedicated set of messages (`startGameMessage`) handles all game-joining errors, including "not signed in," "banned," "already signed in" (with an option to kick the other session), "failed to rejoin," and "match ended."

## **V. Community Feedback and Engagement Systems**

The project utilizes four distinct systems for data collection and user engagement. All systems (except "Contact Us") require the user to be signed in and confirmed.

1.  **Feedback System**: For bugs, ideas, and general comments.
    - **Validation**: Checks for empty "Topic and Message" fields.
    - **Rate Limiting**: "we only allow one Feedback Message to be sent once per Five Minutes."
    - **Admin Function**: Contains hidden messages ("Failed to reset account," "Successfully reset account") suggesting a debug tool.
2.  **Rating System**: A simple 1-5 star rating. Users can submit, update, or delete their rating.
3.  **Review System**: A more detailed system with a title and message body. Users can submit, update, or delete their review.
4.  **"Contact Us" System**: A public-facing form (First/Last Name, Email, Topic, Message) for users who cannot sign in.

## **VI. Technical Infrastructure and Development Pipeline**

The news articles provide transparent insight into the project's backend architecture and development roadmap.

- **Server Architecture**: A "Server is Completely Revamped" update announced a major architectural shift.
  - **Change**: "We have moved client side data updating function over to the server."
  - **New Model**: The client is now responsible primarily for rendering, while the server handles the authoritative simulation.
  - **Result**: This change "greatly reduced" lag and input delay, signifying a critical move from a client-authoritative to a server-authoritative model.
- **3D Graphics & Animation Pipeline**: The project is undergoing a major graphical overhaul from 2D to 3D. The "How We Create Our Characters" article details their 5-step pipeline:
  1.  **First Steps**: Idea and lore-fitting.
  2.  **Design**: Reference images and concept art.
  3.  **Modelling**: Building, texturing, and animating the 3D model.
  4.  **Customizability**: Splitting the model into interchangeable parts (head, torso, arms, legs, weapons).
  5.  **Implementation**: Capturing thousands of images of the 3D model from all angles, which are composited in-game to create the custom character.
- **Development Status**: The project is in open beta, with developers reporting high community investment and positive feedback. Future work includes an announced UI redesign and ongoing 3D asset integration.

---

# **Conclusion**

The "Thunder Warrior: Genesis" project is a technically ambitious and comprehensive application. The analysis of its codebase reveals a well-architected, authoritative client-server model designed to handle real-time multiplayer simulation. The game's design, captured in its extensive asset specifications, is centered on deep and layered systems of customization, providing a complex matrix of player choices. This technical core is supported by a mature, secure, and user-centric web portal that successfully integrates account management, community engagement, and transparent development communication. The project demonstrates a high-level integration of complex backend, frontend, and game design systems.
