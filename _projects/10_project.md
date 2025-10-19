---
layout: page
title: Thunder Warrior: Genesis (TWG)
description: A comprehensive overview of the open-beta sci-fi action game.
img: assets/img/twg-banner.jpg
importance: 1
category: work
related_publications: true
---

"Thunder Warrior: Genesis" (TWG) is an ambitious, web-based, sci-fi action game currently in an active open beta phase. Players take on the role of a "Thunder Warrior," a powerful combatant in a universe defined by the conflict between the "Empire" and the "Rebellion." The project is built on a robust, custom client-server architecture and features an exceptionally deep level of character customization, a core pillar of its design.

The development team maintains a transparent and community-focused model, actively soliciting player input through multiple feedback channels to refine the game, address bugs, and guide future development.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/twg-menu.jpg" title="Game Menu Screenshot" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/twg-customization.jpg" title="Character Customization Screen" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/twg-shop.jpg" title="In-Game Shop" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The user interface for the main menu, character customization, and shop, all styled with a dark, futuristic sci-fi aesthetic (predominantly dark blues, purples, and grays) and designed to be responsive using `vmin` units.
</div>

### Core Technical Architecture

The game operates on an authoritative client-server model, ensuring a secure and cheat-resistant multiplayer environment.

- **Server-Side:** The backend, managed by `gameServer.js`, is responsible for all core game logic. It creates and manages individual game instances (`NEW_GAME`), runs the simulation in a fixed-rate game loop (`fps`), and handles all state updates for players and projectiles. The server is the single source of truth for all physics, combat, and state management.
- **Client-Side:** The frontend (`client.html`) serves as the user's portal for all pre-game management, including character selection, customization, and shop interactions. It communicates with the server via WebSockets, handled by `clientWebsocket.js`. The client is responsible for sending user input to the server and rendering the game state it receives.
- **Performance Overhaul:** The development team recently completed a major server revamp, migrating client-side data updating functions entirely to the server. This change to a server-authoritative model "practically nonexistant" lag and dramatically reduced the delay between player input and on-screen action, as the client is now focused almost exclusively on rendering.

### The 3D Development Pipeline

A key ongoing development effort is the graphical overhaul of the game, migrating from 2D sprites to a full 3D visual engine. This pipeline is built around the core pillar of customization, ensuring all new 3D assets are compatible with each other.

The 5-step creation process is as follows:

1.  **First Steps:** The character or item concept is developed, ensuring it fits the established lore.
2.  **Design:** Reference images are drawn and collected to guide the 3D modeler.
3.  **Modelling:** The asset is built in 3D modeling software, where it is textured, colored, and animated.
4.  **Customizability:** The 3D model is strategically split into its core components (e.g., head, torso, arms, legs, weapons) so they can be "seperately applied to a Thunderwarrior."
5.  **Implementation:** Thousands of images are rendered from the 3D model, capturing all angles and animation states. These images are then loaded and combined in-game to display the player's unique, customized character.

### Gameplay Mechanics

The core gameplay loop is defined by third-person action combat, deep customization, and objective-based battles across diverse worlds.

#### Character Foundation and Classes

At the start, players choose a **Class** (such as Jedi, Sith, Sabateur, or Infiltrator), which defines their starting **Faction** (Empire or Rebellion), passive traits, and a full set of starting equipment.

The player's character is represented in-game by the `Trooper.js` class, which manages all critical state information, including:

- **Core Stats:** **Health (HP)**, **Stamina** (used for physical abilities and actions), and **Thaumaturgy** (used for supernatural abilities).
- **Physics:** The `Trooper` class handles its own physics, including gravity, acceleration/deceleration, variable-height jumping, and movement speed, which is directly affected by character stats and equipment weight.
- **Combat Stats:** The simulation tracks detailed stats for critical hits, evasion, accuracy, and defense.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/twg-combat-ranged.jpg" title="Ranged Combat" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/twg-combat-melee.jpg" title="Melee Combat" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Combat is split between ranged gunplay and high-risk, high-reward melee combat.
</div>

#### Ranged Combat (`Gun.js`)

Ranged combat is handled by the `Gun.js` class. Each ranged weapon features unique stats for damage, range, projectile speed, and spread. A critical mechanic is **Heat**, which builds as the weapon is fired and must be managed to prevent overheating, which disables the weapon temporarily.

Weapon types include:

- **E-11 Blaster Rifle:** A balanced, all-around rifle (e.g., E-11 Twilight, E-11 Affluent).
- **DLT-19 Repeating Blaster:** A heavy, high-rate-of-fire weapon (e.g., DLT-19 Epitome, DLT-19 Deluge).
- **T-21 Heavy Blaster:** A slow-firing, high-damage rifle (e.g., T-21 Shade, T-21 Vintage).

#### Melee Combat (`Saber.js`)

Players can swap to their melee weapon by pressing 'f'. The `Saber.js` class manages melee mechanics, which are divided into **Striking** and **Blocking**.

- **Striking:** Delivers high damage in a defined arc, at the cost of Stamina.
- **Blocking:** Holding 'shift' initiates a block, which consumes Stamina. Blocking can **reflect projectiles** and **parry** melee attacks within specific angles, staggering the attacker.

Saber types include:

- **Aggressive Sabers:** (e.g., Coral, Amethyst). Focus on high damage and fast attack speed.
- **Defensive Sabers:** (e.g., Tanzanite, Emerald). Focus on wide block/parry angles and low Stamina drain.
- **Balanced Sabers:** (e.g., Topaz, Alabaster). A mix of offensive and defensive capabilities.

#### Game Worlds

The `mapBuilder.js` module defines the obstacles and spawn points for the game's diverse planets:

- **Julix IV:** A "Frozen Wasteland" outpost.
- **Athemorum:** A "Scorching Bleakness" desert deposit.
- **Frin'Sai:** A "Savage Wilds" jungle city.
- **Tralion Catornay:** A "Unending Splendor" valley depot.

### Deep Customization

Customization is the central pillar of Thunder Warrior: Genesis. Players can tune every aspect of their character through a multi-layered equipment and modification system.

#### Equipment and Rarity

All equipment (Helmets, Torso, Legs, L/R Arms, Ranged Weapons, Melee Weapons) is fully interchangeable. Gear is acquired via enemy drops or purchased in the shop using "credits and metal."

All items follow a 7-tier rarity system, which increases their statistics:

1.  **Junk**
2.  **Common**
3.  **Uncommon**
4.  **Rare**
5.  **Epic**
6.  **Legendary**
7.  **Insane**

#### Armor Sets

Armor pieces provide defense, affect character weight, and grant passive stats. Defined sets include:

- **Thunder Warrior Set:** A balanced, standard-issue set.
- **Sith Set:** A heavy set focused on Thaumaturgy stats and melee defense.
- **Shadow Set:** A light set focused on Stamina, evasion, and stealth.
- **Festive Set:** A low-stat set, likely for cosmetic or event purposes.

#### Modification System

The Mod system allows for "incredible customization." Players can equip **Modifications** (which also follow the 7-tier rarity system) into slots on their armor and weapons. Each mod features:

- **One Main Enhancement:** A primary stat increase (e.g., "Defense for armour, or Damage for a weapon").
- **Up to Four Minor Enhancements:** Secondary stats or "Universal Changes" affecting the entire character (e.g., "ability cost" or "time it takes to start healing").
- **Balancing:** Minor enhancements can sometimes be a "slight Decrease," which is an intentional design choice to make the mod's other traits "even more powerful."

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/twg-stamina-ability.jpg" title="Stamina Ability Tree" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/twg-thaum-ability.jpg" title="Thaumaturgy Ability Tree" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Players unlock and equip a wide range of abilities, split between physical Stamina skills and supernatural Thaumaturgy powers.
</div>

### Abilities and Status Effects

The game features a complex ability system, with all logic defined in `AbilityEffect.js`. Abilities are split into two categories based on the resource they consume.

#### Stamina Abilities (Physical)

These abilities generally focus on movement, physical combat, and self-buffs.

- **Mobility:** `Bound` (Jump), `Sprint` (Run), `Dash` (Burst speed), `Leap` (Forward jump).
- **Saber:** `Flurry Of Blows` (Melee speed buff), `Power Strike` (Enhanced saber attack), `Traditional Block` (Standard block).
- **Combat:** `Heal` (Self-heal), `Defensive` (Defense buff), `Annihilation` (Damage buff), `Snipe Shot` (Enhanced ranged shot), `Burst Shot` (Rapid ranged fire).

#### Thaumaturgy Abilities (Supernatural)

These "Force" abilities focus on healing allies, controlling enemies, and powerful debuffs.

- **Buffs:** `Speed Aura` (AoE speed), `Fortification` (AoE defense), `HealAura` (AoE heal).
- **Control (Transpose):** `Push` (Knockback), `Pull` (Reel in), `Repulse` (AoE pull then push), `Hold` (Lift and move target), `Choke` (Lift and pull target).
- **Control (Immobilize):** `Tether` (Slow/Weigh down), `Reversal` (Invert controls), `Inspire Fear` (Force backward run), `Freeze` (Stun).
- **Debuffs/Damage:** `Life Drain` (Damage and self-heal), `Weaken` (Reduce enemy damage), `Expose` (Reduce enemy defense).
- **Domination:** `Mind Control` (Take direct control of an enemy player).

#### Status Effects

Abilities and attacks apply a wide range of status effects, managed by `StatusEffect.js`.

- **Buffs:** `cool` (Heat reduction), `speed`, `defense`, `healOverTime`, `prepared` (All-stat buff).
- **Debuffs:** `knockback`, `slow`, `confuse` (Scramble input), `reverse` (Invert input), `fear`, `expose` (Defense reduction), `heavy` (Weight increase), `frozen` (Stun).

### User Experience and Community

The project is supported by a comprehensive account management and community feedback platform, detailed extensively in over 128 different client-side message files.

#### Account Management System

The game features a secure and robust account lifecycle:

- **Sign Up:** Requires username, email, and password with validation for length, characters, and uniqueness.
- **Confirmation:** A code is sent to the user's email, which must be entered to activate the account.
- **Sign In:** Authenticates the user, with specific errors for unconfirmed, banned, or deleted accounts.
- **Recovery:** Full system for recovering a forgotten username or resetting a password via a one-time-use email link.
- **Management:** A dedicated "Manage" tab allows users to change their username, email, or password, and update game preferences (e.g., graphics, FPS).

#### Interface and User Experience

The website and game UI have undergone several major revamps to improve usability:

- **Web Page:** A persistent navigation bar at the top, a new side menu, and new "About," "How to Play," and "Credits" pages.
- **Home Page:** The main dashboard was remodeled with a central **Character Preview** screen, surrounded by clickable icons for each equipment slot. An "Information Bar" displays resources (Credits, Metal, Experience) and quick-access buttons.
- **In-Game UI:** An "Information Update" was released to show exact numerical values on all status bars (HP, Stamina, etc.) and provide extensive tooltips, including an "extended list of sometimes over twenty diferent stats" for equipment.

#### Community Feedback Channels

The project actively gathers data through four distinct systems:

1.  **Feedback System:** For submitting bugs, ideas, and general comments (rate-limited to one per five minutes).
2.  **Rating System:** A simple 1-5 star rating.
3.  **Review System:** For detailed, titled reviews.
4.  **"Contact Us" Page:** A public-facing form for users who may be locked out of their accounts.
