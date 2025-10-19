-----

layout: page
title: Thunder Warrior: Genesis
description: An extensive overview of the web-based sci-fi action game project, detailing its architecture, gameplay mechanics, and deep customization.
img: assets/img/twg\_banner.jpg
importance: 1
category: work
related\_publications: true

---

This document provides an exhaustive overview of the **Thunder Warrior: Genesis (TWG)** project, a web-based, sci-fi action game. This analysis is based on a comprehensive review of the project's complete codebase and a series of detailed reports covering its frontend, backend, core mechanics, itemization, and community-facing features. The project is currently in an **Open Beta** phase, featuring a rich, server-authoritative architecture and deep, multi-layered character customization.

\<div class="row"\>
\<div class="col-sm mt-3 mt-md-0"\>
{% include figure.liquid loading="eager" path="assets/img/1.jpg" title="New Home Page" class="img-fluid rounded z-depth-1" %}
\</div\>
\<div class="col-sm mt-3 mt-md-0"\>
{% include figure.liquid loading="eager" path="assets/img/1.jpg" title="In-Game Arena Combat" class="img-fluid rounded z-depth-1" %}
\</div\>
\<div class="col-sm mt-3 mt-md-0"\>
{% include figure.liquid loading="eager" path="assets/img/1.jpg" title="Shop Interface" class="img-fluid rounded z-depth-1" %}
\</div\>
\</div\>
\<div class="caption"\>
The Thunder Warrior: Genesis interface, featuring the redesigned home page (left) for character management, a view of in-game combat (middle), and the equipment shop (right).
\</div\>

The game places players in the role of a Thunder Warrior, a powerful soldier fighting for one of two factions: the **Empire** or the **Rebellion**. Gameplay spans multiple unique planets, each with its own environment and map.

-----

## **I. Technical Architecture**

The project is built on a robust client-server model designed for a real-time multiplayer experience. A significant "Server is Completely Revamped" update moved the project from a client-authoritative model to a **server-authoritative model**, drastically reducing lag and offloading physics and state calculations to the server.

### **A. Backend (`gameServer.js`, `websocket.js`)**

The server-side logic is managed primarily by `gameServer.js`.

  * **Game Instance (`NEW_GAME`)**: A constructor function that represents a single game room. It initializes all `Trooper` objects for players, manages the `projectiles` array, and sets up `CollisionDetection`.
  * **Game Loop**: The server runs a fixed-rate game loop (controlled by `fps`) that performs the following actions each tick:
    1.  Calculates delta time (`setDeltaTime`).
    2.  Updates all `Trooper` and `Projectile` objects (`updateGame`).
    3.  Checks for win conditions (e.g., one faction remaining) or game end conditions (e.g., timeout, disconnects) (`checkWin`).
    4.  Broadcasts the complete, updated game state to all clients in the room (`sendUpdate`).
  * **Communication**: The server uses a custom WebSocket layer (`websocket.js`) to handle client connections, disconnections (`disconnect`), rejoins (`rejoin`), and room management. It receives player inputs via the `newInput` method, which are then processed by the corresponding `Trooper` object during the next game tick.

### **B. Frontend (`client.html`, `clientWebsocket.js`)**

The client is a single, complex HTML file (`client.html`) that serves as the main menu, character manager, and shop interface before transitioning the player to the game itself.

  * **HTML Structure**: The `body` is organized into multiple full-screen `div` containers, one for each "page" of the menu. JavaScript controls navigation by changing the `visibility` of these containers.
      * `loadingPage`: Displays loading indicators.
      * `classSelectionScreen`: For initial character attribute allocation.
      * `homeScreen`: The main hub, showing the character preview, resources, and navigation.
      * `weaponPage`: For managing weapons and modifications.
      * `abilityPage`: For viewing and unlocking abilities.
      * `shopScreen`: The item purchase interface.
      * `settingsScreen`: A modal for account and game options.
  * **CSS Styling**: The UI extensively uses `vmin` (viewport-minimum) units for sizing, positioning, fonts, and borders. This makes the entire interface scale proportionally to the smaller dimension of the browser window, ensuring a consistent layout across different screen sizes and aspect ratios.
  * **Initialization Sequence**:
    1.  On load, the client messages a sandboxed `iframe` (`https://thunderwarrior.org/iframe`) to request stored account credentials.
    2.  If credentials are received, it calls `createWebSocket` (from `clientWebsocket.js`) to connect to the server.
    3.  A secure handshake (`checkMessage`) involving a key exchange and ticket is performed.
    4.  The client sends an 'account' message, and the server responds with the complete 'user' data packet.
    5.  This data is stored in a global `troop` object, and the client begins populating all UI elements (character preview, resources, equipment, abilities) and pre-loading all necessary game images.
    6.  Once all images are loaded, the `loadingPage` is hidden, revealing the main menu.

### **C. Code Example: Client-Server Data Flow**

The core architecture relies on the client sending minimal input data and the server returning a complete, authoritative game state. The client's main role during gameplay is to render this state.

{% raw %}

```javascript
/* Simplified pseudo-code illustrating the data flow.
    This is not the literal code, but demonstrates the architectural principle.
*/

// --- CLIENT-SIDE (clientWebsocket.js / client.html) ---

// 1. Client captures input and sends it to the server.
document.addEventListener('keydown', (e) => {
    // User presses 'W'
    if (e.key === 'w') {
        let inputPacket = { type: 'input', key: 'w', state: 'down' };
        // 'send' is a wrapper for ws.send()
        send('gameInput', inputPacket); 
    }
});

// 2. Client receives authoritative state update from server.
// 'recieveAnyMessage' routes 'gameUpdate' messages here.
function handleGameUpdate(data) {
    // 'data.troopers' is an array of all trooper states
    // 'data.projectiles' is an array of all projectile states
    
    // Update local representation of all players
    for (let serverTrooper of data.troopers) {
        let localTrooper = getLocalTrooper(serverTrooper.id);
        localTrooper.position = serverTrooper.pos; // Set position directly
        localTrooper.rotation = serverTrooper.rot;
        localTrooper.health = serverTrooper.hp;
        localTrooper.animationState = serverTrooper.anim;
        // ...and so on for all other state variables.
    }
    
    // Render the new state (e.g., in a requestAnimationFrame loop)
    renderGameWorld();
}


// --- SERVER-SIDE (gameServer.js / Trooper.js) ---

// 1. Server receives input from a client.
// 'newInput' is called by the WebSocket message handler.
NEW_GAME.prototype.newInput = function(data, trooperId) {
    let trooper = this.getTrooper(trooperId);
    if (trooper) {
        // Store the input state. It will be processed in the game loop.
        trooper.input[data.key] = data.state;
    }
}

// 2. Server's main game loop processes inputs and simulates physics.
NEW_GAME.prototype.update = function() {
    this.setDeltaTime();
    
    // 2a. Process inputs, abilities, status effects
    for (let trooper of this.troopers) {
        trooper.prepare(this.deltaTime); // Reads trooper.input
    }
    
    // 2b. Update movement, physics, combat
    for (let trooper of this.troopers) {
        trooper.update(this.deltaTime, this.CD); // Moves trooper, checks collisions
    }

    // 2c. Update projectiles
    for (let projectile of this.projectiles) {
        projectile.update(this.deltaTime, this.CD);
    }
    
    // 2d. Send the new authoritative state to all clients
    this.sendUpdate();
}

// 3. Server packages and broadcasts the complete game state.
NEW_GAME.prototype.sendUpdate = function() {
    let statePacket = {
        troopers: this.troopers.map(t => t.data), // .data is a getter for sync'd state
        projectiles: this.projectiles.map(p => p.data)
    };
    
    // 'w.sendToRooms' broadcasts to all clients in this game instance
    this.w.sendToRooms(this.room, 'gameUpdate', statePacket);
}
```

{% endraw %}

-----

## **II. Core Gameplay Mechanics**

The game's combat is built on the `Trooper.js` class, which manages all character state, physics, and resource interactions.

### **A. Character Physics (`Trooper.js`)**

  * **Movement**: The `Trooper` class implements its own physics for gravity, acceleration, deceleration, and jumping.
  * **Jumping**: Includes logic for a variable-height jump based on how long the key is held, and a delayed jump to feel more "weighty".
  * **State**: Manages `onGround` vs. `in-air` states, which affect movement and ability usage.
  * **Weight**: Character stats and equipped armor contribute to `weight`, which inversely affects movement speed and the cost of mobility-based Stamina abilities.

### **B. Resources (HP, Stamina, Thaumaturgy)**

  * **Health (HP)**: The character's life pool. Regenerates after a delay.
  * **Stamina**: Used for physical actions: sprinting, jumping, saber strikes, saber blocking, and all Stamina-based abilities. Regenerates after a delay.
  * **Thaumaturgy**: Used for supernatural abilities (the "Force"). Regenerates after a delay.
  * **Weapon Heat**: A fourth resource, specific to Ranged Weapons.

### **C. Ranged Combat (`Gun.js`, `Projectile.js`)**

Ranged combat is handled by the `Gun.js` class, a state machine that manages firing and heat.

  * **Firing**: When the player fires, the `Gun` class checks its `firingSpeed` cooldown. If ready, it creates a new `Projectile.js` instance, applying stats like `damage`, `range`, `projectileSpeed`, and `spreadMax`.
  * **Projectiles**: The `Projectile` moves in a straight line, checking for collisions (`CD.check`) against the map and other troopers. Damage falls off (`getDistanceTravelledMult`) after exceeding the weapon's base `range`.
  * **Heat System**: Firing generates `heat.increase`. The weapon begins cooling after a `heat.coolWaitTime` delay. If `heat.max` is reached, the weapon enters an `heat.overheatTime` duration where it cannot be fired.

### **D. Melee Combat (`Saber.js`)**

Melee combat, introduced as a "revolution" to the game, is managed by the `Saber.js` class and is split into two modes: striking and blocking.

  * **Striking**:
      * Initiating a strike incurs a `strike.delay` before damage is applied.
      * Damage is dealt in a wide arc (`strike.angle`) up to a certain distance (`strike.radius`).
      * It applies `strike.knockback` and costs `strike.cost` Stamina.
      * After striking, the weapon enters a `strike.wait` cooldown.
  * **Blocking (Hold Shift)**:
      * Consumes Stamina (`continualDrain`, `imediateDrain`).
      * **Projectile Reflection**: Reflects all projectiles within a `block.projectileAngle`.
      * **Melee Deflection**: Blocks melee attacks within a `block.stabAngle`, applying `block.stun` and `block.knockback` to the attacker.
      * **Parry Window**: A short `block.parryTime` at the start of a block grants enhanced deflection effects.
      * **Thaumaturgy Block**: Specific abilities can enable blocking of Thaumaturgy attacks.

-----

## **III. Deep Customization**

Customization is the central pillar of Thunder Warrior: Genesis. Players have extensive control over their character's stats, abilities, and appearance.

### **A. Initial Class Choice**

When creating a character, players choose a class (e.g., Jedi, Sith, Sabateur, Infiltrator). This choice defines:

1.  **Starting Skills**: Base values for Power, Constitution, Thaumaturgy, Stamina, Speed, and Utility.
2.  **Faction**: Allegiance to the Empire or Rebellion.
3.  **Passive Traits**: e.g., "Gain health on kill."
4.  **Starting Equipment**: A full set of armor and one ranged/melee weapon.

### **B. Equipment System**

All equipment is fully interchangeable across **7 slots**: Helmet, Torso, Legs, Right Arm, Left Arm, Ranged Weapon, and Melee Weapon.

  * **Rarity**: All equipment and mods follow a 7-tier rarity system, which increases their stats: **Junk, Common, Uncommon, Rare, Epic, Legendary, and Insane**.
  * **Acquisition**: Gear is found via enemy drops or unlocked in the Shop using **Credits** and **Metal**.

#### **Armor Sets (Examples from Report 3)**

  * **Thunder Warrior Set**: The balanced, standard-issue set.
  * **Sith Set**: A heavy set focused on **Thaumaturgy** stats and **Melee Defense**.
  * **Shadow Set**: A light set focused on **Stamina** stats, Evasion, Ranged Defense, and **Stealth**.
  * **Festive Set**: A lower-stat set, likely for cosmetic or event purposes.

#### **Ranged Weapons (Examples from Report 3)**

  * **E-11 Variants (Blaster Rifle)**: The all-around, balanced rifle.
  * **DLT-19 Variants (Repeating Blaster)**: High fire rate, low damage, and large heat capacity.
  * **T-21 Variants (Heavy Blaster)**: Extremely high damage and range, but very slow fire rate.

#### **Melee Weapons (Examples from Report 3)**

  * **Aggressive Sabers (e.g., Coral, Amethyst)**: High damage, fast attacks, wide arcs. Poor defensive stats.
  * **Defensive Sabers (e.g., Tanzanite, Emerald)**: Low damage, slow attacks. Excellent blocking stats (wide block angle, long parry window, low stamina cost).
  * **Balanced Sabers (e.g., Topaz, Boracite)**: A mix of offensive and defensive capabilities.

\<div class="row justify-content-sm-center"\>
\<div class="col-sm-8 mt-3 mt-md-0"\>
{% include figure.liquid path="assets/img/1.jpg" title="Weapon Management Screen" class="img-fluid rounded z-depth-1" %}
\</div\>
\<div class="col-sm-4 mt-3 mt-md-0"\>
{% include figure.liquid path="assets/img/1.jpg" title="Modification Slots" class="img-fluid rounded z-depth-1" %}
\</div\>
\</div\>
\<div class="caption"\>
The Weapon Page (left) allows for equipping items and mods. The Modification system (right) allows for deep stat customization.
\</div\>

### **C. Modifications System**

This system allows for "incredible customization" by socketing **Mods** into equipment. Mods also follow the 7-tier rarity system.

  * **Mod Structure**:
      * **1 Main Enhancement**: A primary stat buff (e.g., `+Damage` for weapons, `+Defense` for armor).
      * **Up to 4 Minor Enhancements**: Secondary stats that can be general (e.g., `+Max Health`, `+Stamina Recovery`) or highly-specific "Universal Changes" (e.g., `-Ability Cooldown`, `+Stealth Detection`).
  * **Balancing**: Minor Enhancements can sometimes roll as a "slight Decrease" (e.g., `-Movement Speed`). This is intentional, as it makes the other positive traits on the mod even more powerful.

-----

## **IV. Abilities & Status Effects**

Players unlock and equip a wide range of active abilities, which are organized into two main trees and consume resources.

### **A. Stamina Abilities (Physical)**

  * **Mobility**:
      * **Bound**: Standard jump.
      * **Sprint**: Increases movement speed while draining Stamina.
      * **Dash**: A brief, extremely fast burst of speed.
      * **Leap**: A long-distance forward jump.
  * **Saber**:
      * **Flurry Of Blows**: Increases melee attack speed.
      * **Power Strike**: A single, enhanced saber strike that deals extra damage and applies a **Slow** debuff.
      * **Bleed Strike**: Two strikes that apply a **Damage Over Time** (DoT) debuff.
      * **Critical Strike**: Two strikes that apply an **Expose** debuff (defense reduction).
      * **Traditional Block**: The standard saber block ability.
  * **Combat & Buffs**:
      * **Heal**: Instantly restores HP.
      * **Oneness**: Reduces character weight, increasing speed and agility.
      * **Defensive**: Temporarily increases defense.
      * **Fast Fire**: Temporarily increases ranged firing speed.
      * **Snipe Shot**: An enhanced, high-damage ranged shot.

\<div class="row"\>
\<div class="col-sm mt-3 mt-md-0"\>
{% include figure.liquid loading="eager" path="assets/img/1.jpg" title="Stamina Ability Tree" class="img-fluid rounded z-depth-1" %}
\</div\>
\<div class="col-sm mt-3 mt-md-0"\>
{% include figure.liquid loading="eager" path="assets/img/1.jpg" title="Thaumaturgy Ability Tree" class="img-fluid rounded z-depth-1" %}
\</div\>
\</div\>
\<div class="caption"\>
Players unlock abilities in the Stamina (left) and Thaumaturgy (right) trees.
\</div\>

### **B. Thaumaturgy Abilities (Force)**

  * **Buffs (Aura/Allies)**:
      * **Hover**: Reduces weight and fall speed for allies.
      * **Speed Aura**: Increases movement, melee, and firing speed for nearby allies.
      * **Fortification**: Increases defense for allies.
      * **HealAura**: Heals nearby allies over time.
      * **Cool**: Instantly removes all weapon heat for nearby allies and reduces heat buildup.
  * **Combat & Transpose (Enemy)**:
      * **Push**: Knocks enemies away.
      * **Pull**: Pulls enemies closer.
      * **Life Drain**: Deals damage to an enemy and heals the caster for 50% of the damage dealt.
      * **Repulse**: An Ultimate ability that pulls enemies in, damages them, and then violently pushes them away.
  * **Control & Debuff (Enemy)**:
      * **Weaken**: Reduces enemy damage output.
      * **Tether**: Applies **Heavy** (increased weight) and **Slow** debuffs.
      * **Hold / Choke**: Lifts an enemy, cancels their actions, and allows the caster to move them.
      * **Freeze**: Freezes an enemy in place, preventing all actions.
      * **Reversal / Confusion**: Reverses or scrambles enemy movement and mouse controls.
      * **Mind Control**: An Ultimate ability that lets the caster take full control of an enemy player for a short time.

### **C. Status Effects (`StatusEffect.js`)**

Abilities and strikes apply temporary status effects, which are managed by the `Trooper` class.

  * **Buffs**: `cool`, `speed`, `defense`, `healOverTime`, `damaging`, `prepared` (all-stats buff).
  * **Debuffs**: `knockback`, `slow`, `confuse` (randomized controls), `reverse` (inverted controls), `fear` (forced backward movement), `expose` (defense reduction), `heavy` (weight increase), `stun`, and `frozen`.

-----

## **V. Project Features & Development**

The project is supported by a comprehensive account management system and a transparent development pipeline.

### **A. Secure Account Management**

The project features a complete, secure account lifecycle with robust validation and error handling for every possible user state.

  * **Sign Up**: Includes checks for empty fields, password length, password match, and alphanumeric characters. Provides specific errors for "Username Taken," "Email Taken," and even "Username Taken but Unconfirmed."
  * **Sign In**: Blocks sign-in for "Unconfirmed," "Banned," or "Deleted" accounts.
  * **Account Confirmation**: A system for confirming email via a time-sensitive code.
  * **Account Recovery**: Allows users to retrieve a forgotten username or receive a one-time-use password (valid for one hour).
  * **Account Editing**: Allows users to change their username, password, or email. Changing an email re-triggers the confirmation process.

### **B. UI/UX Evolution**

The project has undergone several major UI revisions based on community feedback.

1.  **"Completely Rebuilt" Webpage**: The entire website was revamped with a persistent top navigation bar and a new account menu.
2.  **"New Home Page"**: The character management screen was remodeled to feature a central character preview surrounded by clickable equipment icons.
3.  **"Information Update"**: The in-game UI was updated to show exact numerical values (e.g., "100/100") on resource bars and to provide extensive, multi-level tooltips for all equipment.

### **C. Community Feedback Systems**

The project actively solicits user data through four distinct channels:

1.  **Feedback System**: For submitting bugs, ideas, and general feedback (rate-limited to one per five minutes).
2.  **Rating System**: A simple 1-5 star rating.
3.  **Review System**: For detailed, long-form reviews with a title and message body.
4.  **"Contact Us" Form**: A public-facing form for users who may be locked out of their accounts.

### **D. 3D Asset Pipeline**

The team has been transparent about its ongoing graphical overhaul, moving from 2D sprites to 3D models. Their "How We Create Our Characters" article details a 5-step pipeline:

1.  **First Steps**: Idea generation.
2.  **Design**: Concept art and reference images.
3.  **Modelling**: Building, texturing, and animating the 3D model.
4.  **Customizability**: The model is split into interchangeable parts (head, torso, arms, legs).
5.  **Implementation**: Thousands of images are rendered from the 3D model, which are then stitched together in-game to display the player's unique, customized character.

### **E. Game World**

The game features multiple planets, each with a unique map:

  * **Julix IV (Frozen Wasteland)**: Emperial Outpost in Canar Hun.
  * **Athemorum (Scorching Bleakness)**: Uncovered Resource Deposit in the Anakoran Desert.
  * **Frin'Sai (Savage Wilds)**: Overrun City of Make'Tui.
  * **Tralion Catornay (Unending Splendor)**: Secret Rebel Depot in Fernackie's Valley.
