---
layout: page
title: Thunder Warrior: Genesis
description: An in-depth analysis of a sci-fi action game featuring deep customization, an authoritative server, and a 3D graphics pipeline.
img: assets/img/twg/twg-banner.jpg
importance: 1
category: work
---

**Thunder Warrior: Genesis (TWG)** is an ambitious, web-based sci-fi action game currently in an open beta phase. This project, built around warring factions of the "Empire" and "Rebellion," places players in the role of a highly customizable "Thunder Warrior."

The project's architecture is defined by three core pillars:

1.  **Deep, Multi-Layered Customization:** A central design philosophy allowing players to fine-tune every aspect of their character, from class and skills to a 7-tier rarity system for equipment and a complex "Modifications" system.
2.  **Robust Technical Infrastructure:** The game runs on a secure, authoritative server model using WebSockets for real-time communication. It has undergone a significant server revamp to move all client-side processing to the server, dramatically reducing lag.
3.  **Active, Transparent Development:** The team is currently executing a major graphical overhaul, replacing all 2D assets with 3D models and animations, and actively solicits community input via four distinct feedback systems.

This project page provides an exhaustive breakdown of the game's mechanics, content, technical architecture, and user-facing features, based on a comprehensive analysis of the project's codebase and client-facing documentation.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/twg/ui-home-remodel.jpg" title="Remodeled Home Page" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/twg/ui-ingame-info.jpg" title="In-Game Information Update" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/twg/ui-web-redesign.jpg" title="Website Redesign" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    A look at the completely redesigned UI/UX. Left: The remodeled Home Page with character preview and equipment icons. Middle: The "Information Update" showing exact values on status bars (HP, Stamina, Heat). Right: The revamped website navigation.
</div>

---

## **I. Core Gameplay Mechanics**

The in-game simulation is driven by a series of robust, object-oriented modules. The `gameServer.js` file manages all game instances, while the `Trooper.js` class represents the central player character, handling all state, physics, and combat logic.

### **Character Creation & Skills**

Upon creating an account, players choose a **Class** (e.g., Jedi, Sith, Sabateur, Infiltrator). This choice is foundational, defining:

- **Starting Skills:** Base values for Power, Constitution, Thaumaturgy, Stamina, Speed, and Utility.
- **Faction:** Alignment with either the Empire or Rebellion.
- **Passive Traits:** Unique abilities, such as gaining health or stamina on a kill.
- **Starting Equipment:** A full set of armor and one melee and ranged weapon.

The primary character skills include:

- **Passive Skills:**
  - **Power:** Increases damage.
  - **Constitution:** Increases health and healing effectiveness.
  - **Speed:** Governs movement and action speed.
- **Ability Skills:**
  - **Stamina:** A resource pool for "natural" abilities (e.g., sprinting, saber strikes).
  - **Thaumaturgy:** A resource pool for "supernatural" powers (e.g., Force-like abilities).
  - **Utility:** Governs other useful actions.

### **Physics & Movement**

The `Trooper.js` class implements a complete physics and movement system:

- **State:** Manages position (`x`, `y`, `z`), rotation (`rot`), velocity, and dimensions (`w`, `h`,`d`).
- **Movement:** Handles acceleration, deceleration, running, and gravity.
- **Jumping:** Features a variable-height jump based on key-hold duration, as well as a delayed jump mechanic.
- **Collision:** Utilizes `CollisionDetection.js` to perform AABB (Axis-Aligned Bounding Box) checks for environmental collision, setting `onGround` status and managing collision responses.
- **Weight:** Movement speed and agility costs are directly affected by the character's total weight, derived from stats and equipped armor.

### **Combat System**

Combat is a real-time system split between ranged and melee. Players can swap weapons at any time by pressing 'f'.

**Ranged Combat (`Gun.js`)**

- **Firing:** Manages firing projectiles, tracking weapon heat, and managing firing rate.
- **Projectiles:** Spawns `Projectile.js` instances that travel in a straight line, check for collisions, and apply damage.
- **Mechanics:** Features projectile spread (`spreadMax`), damage falloff based on range (`getDistanceTravelledMult`), and an optional overheat system (`heat` object in `WeaponBase.js`).

**Melee Combat (`Saber.js`)**

- **Striking:** Manages strike cooldowns, delays, and stamina costs. Applies damage within a defined arc (`angle` and `radius`) using collision detection.
- **Blocking:** Allows players to hold 'shift' to block. This action:
  - **Reflects Projectiles:** All projectiles within the saber's `projectileAngle` are reflected.
  - **Staggers Enemies:** Staggers melee attackers.
  - **Parries:** A `parryTime` window at the start of a block provides additional benefits.
  - **Resource Management:** Blocking consumes stamina, with different costs for initial activation, holding the block, blocking projectiles, and blocking melee strikes.

---

## **II. The Arsenal: Deep Customization**

Customization is the central pillar of Thunder Warrior: Genesis. All equipment and modifications use a 7-tier rarity system: **Junk, Common, Uncommon, Rare, Epic, Legendary, and Insane**. Rarity increases an item's statistics and modification potential. Equipment can be acquired from enemy drops or purchased in the Shop using "credits and metal".

### **Ranged Weapons (Guns)**

Ranged weapons are defined by their damage, range, firing speed, heat mechanics, and projectile speed. All base gun models have 3 modification slots.

- **E-11 Variants (Blaster Rifle - Thunder Warrior Set):**
  - **E-11 Twilight:** The standard, balanced rifle. Good all-around stats.
  - **E-11 Affluent:** A critical-hit focused model with more heat capacity but less base damage.
  - **E-11 Viper:** A burst-damage variant with a faster firing speed but less range and heat capacity.
- **DLT-19 Variants (Repeating Blaster - Sith Set):**
  - **DLT-19 Epitome:** Standard model with a very high fire rate, low damage, and low range.
  - **DLT-19 Deluge:** An even higher fire rate and heat capacity, but with minimal damage per shot.
  - **DLT-19 Scarlet:** A heavy-hitting variant with higher damage but a slower fire rate.
- **T-21 Variants (Heavy Blaster - Shadow Set):**
  - **T-21 Shade:** The standard heavy blaster. Very high damage and range, but a very slow fire rate. Excellent base crit and accuracy.
  - **T-21 Vintage:** An even higher damage and range "sniper" model with a painfully slow fire rate.
  - **T-21 Amaranthine:** A closer-quarters version with less damage than the Shade but a better fire rate and heat capacity.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/twg/gun-e11.jpg" title="E-11 Blaster Rifle" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/twg/gun-dlt19.jpg" title="DLT-19 Repeating Blaster" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/twg/gun-t21.jpg" title="T-21 Heavy Blaster" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The three primary classes of ranged weapons: the balanced E-11 (left), the rapid-fire DLT-19 (middle), and the high-damage T-21 (right).
</div>

### **Melee Weapons (Plasmablades / Sabers)**

Melee weapons are defined by their offensive `strike` stats (damage, delay, radius, cost) and defensive `block` stats (parry time, block angles, stamina drain). All base saber models have 3 modification slots.

- **Aggressive Sabers (Shadow Set):** High damage, fast attacks, wide arcs, but poor defensive capabilities and high stamina costs.
  - **Coral Plasmablade (Orange):** Standard aggressive saber.
  - **Amethyst Plasmablade (Purple):** Hits extremely hard but is very slow.
  - **Garnet Plasmablade (Red):** Very fast, rapid-attack saber with lower individual damage.
- **Defensive Sabers (Sith Set):** Excellent blocking, wide block angles, long parry windows, and low stamina drain, but very slow, low-damage attacks.
  - **Tanzanite Plasmablade (Blue):** Standard defensive saber with a very long parry window.
  - **Emerald Plasmablade (Green):** Focused on sustained blocking with almost zero continuous drain.
  - **Peridot Plasmablade (Lime):** Focused on quick-blocking actions with a low initial cost.
- **Balanced Sabers (Thunder Warrior Set):** A mix of offensive and defensive stats, representing the middle ground.
  - **Topaz Plasmablade (Yellow):** The classic, perfectly balanced saber.
  - **Boracite Plasmablade (Cyan):** A high-risk, high-reward "balanced" saber with stronger stats but much higher stamina costs.
  - **Alabaster Plasmablade (White):** A high-efficiency "balanced" saber with weaker stats but very low stamina costs.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/twg/sabers-all-colors.jpg" title="Plasmablade Variants" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/twg/saber-block.jpg" title="Saber Blocking" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Left: The variety of Plasmablade colors, including Amethyst, Garnet, Tanzanite, and Topaz. Right: A 3D render of a Thunder Warrior demonstrating the saber blocking stance, which can reflect projectiles.
</div>

### **Armor Sets**

Armor is split across five slots: **Helmet, Torso, Legs, Right Arm, and Left Arm**. Each piece provides defense, weight, and contributions to passive stats. All base armor pieces have 3 modification slots.

- **Thunder Warrior Set:** Standard issue, balanced defensive stats.
- **Sith Set:** A heavier set focused on Thaumaturgy stats and high Melee Defense.
- **Shadow Set:** A lightweight set focused on Stamina stats, evasion, Ranged Defense, and stealth.
- **Festive Set:** A low-stat, likely cosmetic or event-based set.

### **Modifications System**

The modification system allows for "incredible customization." Mods are items that can be slotted into equipment to provide powerful bonuses. They follow the same 7-tier rarity system.

- **Mod Structure:**

  1.  **Main Enhancement:** One primary stat increase (e.g., "Defense" for armor, "Damage" for weapons).
  2.  **Minor Enhancements:** Up to four secondary enhancements. These can be "Universal Changes" affecting the entire character (e.g., ability cost, healing time) and may sometimes roll as a "slight Decrease" to provide an even larger boost to other traits.

- **Examples of Major Mods:**

  - **Weapon:** Damage, Quick Fire (reduce delays).
  - **Melee:** Power (radius/knockback), Deflection (saber blocking), Reflection (projectile blocking), Slightness (reduce stamina costs).
  - **Ranged:** Firing Speed, Maximum Spread (reduction), Projectile Speed, Cooling Power, Maximum Heat, Range.
  - **Armor:** Defense, Weight (reduction), Stamina/Thaumaturgy/Health Recovery.

- **Examples of Minor Traits:**
  - Thaumaturgy Critical Chance/Damage
  - Stamina Evasion Chance
  - Physical Accuracy
  - Max Health/Stamina/Thaumaturgy
  - Ability Cooldown/Duration/Activation Time
  - Stealth Radius / Stealth Detection
  - Knockback Resistance

---

## **III. Abilities & Status Effects**

Active skills are defined in `AbilityEffect.js` and are split into two main resource trees: Stamina and Thaumaturgy.

### **Stamina Abilities (Natural)**

- **Mobility:**
  - **Bound:** The standard jump.
  - **Sprint:** Increases speed while draining stamina.
  - **Dash:** A brief, extremely fast burst of speed.
  - **Leap:** A long-distance forward jump.
- **Saber:**
  - **Change Weapon:** Swaps between ranged and melee.
  - **Flurry Of Blows:** Increases melee attack speed.
  - **Power Strike:** An enhanced saber strike that applies a slow.
  - **Bleed Strike:** Two strikes that apply a damage-over-time bleed.
  - **Traditional Block:** The standard saber block.
- **Combat & Buffs:**
  - **Heal:** Instantly restores health on a long cooldown.
  - **Oneness:** Reduces character weight by 50%.
  - **Preparation:** A long-cast buff that grants massive boosts to all stats.
  - **Defensive:** Temporarily increases defense.
  - **Fast Fire:** Increases ranged firing speed.
  - **Snipe Shot:** A single, enhanced, high-damage ranged shot.
  - **Burst Shot:** Fires 10 rapid, low-damage shots.

### **Thaumaturgy Abilities (Supernatural / Force)**

- **Buff (Aura):**
  - **Hover:** Affects allies, reducing their weight and fall speed.
  - **Speed Aura:** Increases movement, melee, and firing speed for nearby allies.
  - **Fortification:** Increases defense for nearby allies.
  - **HealAura:** Heals allies within a radius over time.
  - **Cool:** (Ultimate) Instantly removes all gun heat for allies and reduces heat buildup.
- **Combat & Transpose:**
  - **Push:** Knocks enemies away.
  - **Pull:** Pulls enemies closer.
  - **Life Drain:** Damages an enemy and heals the user for 50% of the damage.
  - **Repulse:** (Ultimate) Pulls enemies in, then blasts them far away.
- **Control & Debuff:**
  - **Weaken:** Reduces enemy damage output.
  - **Tether:** Applies "heavy" (increased weight) and "slow" status effects.
  - **Hold:** Lifts an enemy, allowing the caster to move them.
  - **Choke:** (Ultimate) Lifts an enemy and pulls them toward the caster, dealing damage over time.
  - **Reversal:** Reverses enemy movement and mouse controls.
  - **Freeze:** (Ultimate) Freezes enemies in place, preventing all actions.
  - **Mind Control:** (Ultimate) Takes control of an enemy, changing their affiliation and giving the caster their camera view.

### **Status Effects (`StatusEffect.js`)**

The ability system applies a wide range of status effects:

- **Buffs:** `cool` (heat reduction), `speed`, `defense`, `healOverTime`, `damaging`, `weightless`, `hover`, `jumping`, `prepared`.
- **Debuffs:** `knockback`, `slow`, `confuse` (scrambled input), `reverse` (inverted input), `fear` (forced backward movement), `expose` (take more damage), `heavy` (increased weight), `stun`, `frozen`.

---

## **IV. The World: Planets & Maps**

The game takes place across multiple planets, each with a unique environment. The `mapBuilder.js` file procedurally selects a map, defines its obstacles, and assigns spawn points to players based on their affiliation.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/twg/planet-julix.jpg" title="Julix IV" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/twg/planet-athemorum.jpg" title="Athemorum" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Two of the battlefields: Julix IV, a "Frozen Wasteland" (left), and Athemorum, a "Scorching Bleakness" (right).
</div>

- **Julix IV:** A "Frozen Wasteland," featuring the "Emperial Outpost in Canar Hun."
- **Athemorum:** A "Scorching Bleakness," featuring an "Uncovered Resource Deposit In the Anakoran Desert."
- **Frin'Sai:** A "Savage Wilds," featuring the "Overrun City of Make'Tui."
- **Tralion Catornay:** A world of "Unending Splendor," featuring a "Secret Rebel Depot Hidden in Fernackie's Valley."

---

## **V. Technical Architecture & Development**

The project is built on a modern, robust client-server model and is undergoing active, transparent development.

### **Client-Server Model**

- **Authoritative Server:** The `gameServer.js` file runs the entire game simulation. It creates a `NEW_GAME` instance for each room, runs a fixed-rate game loop, updates all `Trooper` and `Projectile` objects, and checks for win conditions.
- **WebSocket Communication:** The server uses `websocket.js` and `clientWebsocket.js` for real-time, two-way communication. The server serializes and broadcasts the game state (`sendUpdate`) to all clients, who simply render the result. This model was the result of a **"Server is Completely Revamped"** update, which moved all processing from the client to the server to eliminate lag.
- **Client Frontend:** The `client.html` file serves as the primary UI entry point, managing the main menu, character customization, shop, and settings screens. The CSS extensively uses `vmin` units for a responsive, scalable layout.

### **3D Graphics & Animation Pipeline**

The development team is in the process of a massive graphical overhaul, moving from 2D sprites to a full 3D pipeline. Their 5-step character creation process is as follows:

1.  **First Steps:** Brainstorming ideas that fit the game's lore.
2.  **Design:** Creating reference images and drawings.
3.  **Modelling:** Building the character in 3D software, adding textures, colors, and animations.
4.  **Customizability:** The 3D model is strategically split into parts (head, torso, arms, legs, weapons) to ensure they can all fit together and be "seperately applied to a Thunderwarrior."
5.  **Implementation:** The 3D model is rendered into thousands of 2D images from every angle and animation state, which are then loaded and combined in-game to create the final, customized character.

### **Account Management & UI/UX**

The project features an exceptionally thorough and secure account management system, with specific, clear error messages for every possible user state.

- **Modules:** Full UI and backend logic for:
  - Sign Up (with full validation)
  - Sign In (with checks for banned/unconfirmed)
  - Email Confirmation
  - Account Recovery (Forgot Password & Forgot Username)
  - Information Editing (Username, Email, Password)
  - Preferences Management (Graphics Quality, FPS Limits)
  - Account Deletion & Banning
- **Community Feedback Systems:** The project actively collects data via four distinct channels:
  1.  **Feedback System:** For bugs and ideas (with a 5-minute rate limit).
  2.  **Rating System:** A 1-5 star rating.
  3.  **Review System:** For detailed (title + message) commentary.
  4.  **"Contact Us" System:** A public-facing form for users who cannot log in.
