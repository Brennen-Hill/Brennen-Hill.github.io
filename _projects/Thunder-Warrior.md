---
layout: page
title: "TWG3-struc"
description: A consolidated report analyzing the codebase, game mechanics, and web portal.
img: assets/img/TWG.png
importance: 1
category: game developement
related_publications: false
toc:
  sidebar: left
---

## Section 1: Project Overview & Architecture

This section provides a high-level summary of the Thunder Warrior: Genesis project, its overall architecture, and key observations.

### I. Executive Summary

This report provides an exhaustive analysis of the web-based game project "Thunder Warrior: Genesis." The analysis is derived from a collection of 128 HTML files located within the project's `homeMessages` directory, as well as the core codebase for the game client, server, and web portal. These files and scripts collectively paint an incredibly detailed picture of the game's features, technical architecture, development status, and community engagement strategies.

The project is a sci-fi action game, currently in an open beta phase, which places players in the role of a "Thunder Warrior." The game is built on a universe with warring factions (the "Empire" and the "Rebellion") and features gameplay across multiple planets.

Key findings from the analysis include:

1.  **Robust Account Management:** The system features a comprehensive and secure account management lifecycle, including detailed validation for sign-up, sign-in, email confirmation, and password/username recovery.
2.  **Deep Customization:** This is a core pillar of the game. Players can customize their Thunder Warrior through a multi-layered class system, fully interchangeable equipment (armor, melee weapons, ranged weapons), and a complex "Modifications" system for fine-tuning gear.
3.  **Authoritative Server Model:** The project uses an authoritative server to run the game simulation, with clients sending input and receiving state updates. This is crucial for a multiplayer action game.
4.  **Multi-Faceted Community Engagement:** The project actively solicits user input through three distinct systems: a "Feedback" system for bugs and ideas, a 1-5 "Rating" system, and a "Review" system for detailed commentary.

### II. Project Overview: Thunder Warrior: Genesis

"Thunder Warrior: Genesis" is a web-based game that has recently entered an open beta, inviting players to create an account and join the testing phase. The development team is actively encouraging feedback to identify bugs and guide improvement, indicating a community-focused development model. The game has been received positively by game testers, which has encouraged the team to continue development with "more vigor than ever before".

The web portal functions by loading small, static HTML files containing JavaScript commands to display modular and easily updatable user notifications.

- **`setMessage(...)`:** This function is used to display status, error, and success messages to the user across all account and feedback modules.
- **`setArticle(...)` & `newSection(...)`:** These functions are used to dynamically build and display news articles on the game's home page, keeping the community informed of updates.

### III. Overall Architecture and Observations

- **Client-Server Model**: The project follows a typical authoritative server model. The server (`gameServer.js`) runs the game simulation, and clients (`client.html`, `clientWebsocket.js`) send input and receive game state updates via WebSockets.
- **Modularity**: The codebase is reasonably modular, with separate files for distinct concerns like weapons (`Gun.js`, `Saber.js`), characters (`Trooper.js`), abilities (`AbilityEffect.js`), server logic (`gameServer.js`), client UI (`client.html`), networking (`websocket.js`, `clientWebsocket.js`), physics utilities (`CollisionDetection.js`, `MathVector.js`), etc.
- **Object-Oriented Elements**: Uses constructor functions and prototypes (implicit in the `module.exports = ClassName; function ClassName(...) {...}` pattern) to create classes like `Trooper`, `Gun`, `Saber`, `Projectile`, `WeaponBase`.
- **State Management**: State is primarily managed within the `Trooper` objects on the server and synchronized to clients. The client menu (`client.html`) maintains its own UI state and player data (`troop` object), synchronizing changes back to the server.
- **Data Definitions**: Significant portions of the code involve defining static data for game elements like weapons, armor, mods, and abilities directly within the JavaScript files (`client.html`, `Trooper.js`). This could potentially be externalized to JSON or a database for easier management.
- **Responsiveness**: The frontend CSS heavily relies on `vmin` units, indicating a strong focus on making the UI scale across different screen sizes, although testing would be needed to confirm effectiveness.
- **Complexity**: The `Trooper.js`, `client.html`, `AbilityEffect.js`, and `StatusEffect.js` files are particularly large and complex, handling a wide range of interconnected game mechanics and UI elements.
- **Potential Areas for Refinement**:
  - Externalizing static game data (weapons, abilities, etc.) from code files.
  - Potentially breaking down the large inline `<script>` in `client.html` into more focused modules.
  - More robust error handling, especially around WebSocket communication and game state transitions.
  - Further optimization of collision detection if performance becomes an issue.
  - Adding comments to explain complex logic sections.

---

## Section 2: Gameplay, Mechanics, & Assets

This section details the user-facing gameplay features and provides a comprehensive catalog of all defined assets, including armor, weapons, abilities, and modifications.

### I. Gameplay & Features (User-Facing)

The `newsArticle` files provide a rich, detailed look into the game's mechanics, features, and development roadmap.

**A. Core Concept & Onboarding**

- **Classes:** Upon creation, players choose a class (e.g., Jedi, sabateur, sith, infiltrator).
- **Class Defines:**
  1.  **Starting Skills:** (Power, Constitution, Thaumaturgy, Stamina, Speed, Utility).
  2.  **Faction:** (Empire or Rebellion).
  3.  **Passive Traits:** (e.g., gaining health/stamina on kill).
  4.  **Starting Equipment:** (Full armor set, one melee weapon, one ranged weapon).
- **Skills Breakdown:**
  - **Passive Skills:** Power (damage), Constitution (health/healing), Speed (movement/action speed), Stamina (powers some abilities).
  - **Ability Skills:** Thaumaturgy (supernatural powers), Stamina (natural abilities), Utility (other useful actions).

**B. Character Customization: Equipment**

Customization is a central theme. The game features fully interchangeable equipment.

- **Equipment Slots:** Helmets, Torso pieces, Leg pieces, Right Arm pieces, Left Arm pieces, Ranged Weapons, and Melee Weapons.
- **Rarity System:** A 7-tier rarity system is in place: **Junk, Common, Uncommon, Rare, Epic, Legendary, and Insane**. Rarity increases the equipment's statistics.
- **Acquisition:**
  1.  **Enemy Drops:** Killing an enemy provides a chance to earn their equipment. The dropped item will either match the enemy's rarity or be one tier lower.
  2.  **Shop:** Players can use "credits and metal" to unlock new equipment in the shop.
- **Leveling:** Equipment is unlocked at the player's current level; higher-level Thunder Warriors get more powerful gear.
- **Optimization:** A dedicated article guides players on "Picking the Right Equipment," advising them to think about how gear works together to "achieve a certian goal" (e.g., high damage and low weight for "hit and run tacktics").

**C. Character Customization: Modifications System**

A deep modification system allows for "incredible customization" on top of base equipment.

- **Rarity & Acquisition:** Mods follow the same 7-tier rarity system and are acquired from enemy drops or the shop.
- **Mod Structure:**
  1.  **Main Enhancement:** One primary stat increase (e.g., "Defense for armour, or Damage for a weapon").
  2.  **Minor Enhancements:** Up to four secondary enhancements. These can be smaller stat changes or "Universal Changes" affecting the entire character (e.g., "ability cost" or "time it takes to start healing").
- **Balancing:** Minor enhancements can sometimes be a "slight Decrease." This is an intentional design choice, as it "meens that the other traits of the mod will be even more powerful".
- **Equipping:** Players equip mods by clicking a weapon's icon on the home screen, then clicking the weapon's image or the empty mod slots beneath it.

**D. Combat System**

The game features both ranged and melee combat.

- **Melee Weapons:** Introduced as a major update, melee weapons "revolutionize combat".
- **Swapping:** Players press 'f' to swap between ranged and melee weapons.
- **Melee Attack:** Higher damage, less range, and lower rate of fire than ranged weapons. Players are "unable to block while stabbing."
- **Melee Block:** By holding 'shift', players can block. This "reflects all projectiles" within a specific angle and can "stagger enemeies who attack you with a ranged weapon" (this seems to mean _stagger enemies who attack you with a melee weapon_).

**E. Game World & Locations**

Players fight on various planets, each with a unique location and environment.

- **Julix IV:** A "Frozen Wasteland." The map is an "Emperial Outpost in Canar Hun."
- **Athemorum:** A "Scorching Bleakness." The map is an "Uncovered Resource Deposit In the Anakoran Desert."
- **Frin'Sai:** A "Savage Wilds." The map is the "Overrun City of Make'Tui."
- **Tralion Catornay:** A world of "Unending Splendor." The map is a "Secret Rebel Depot Hidden in Fernackie's Valley."
- **Future Locations:** The team is "constantly adding new planets" and is open to suggestions via the feedback tab.

**F. Shop System**

The Shop is the primary way to acquire equipment and mods using in-game resources.

- **Unlocks:** Players can pay for a _type_ of item (e.g., weapon, armor) and aim for a specific rarity, but the "rarity will vary".
- **Purchases:** A separate system allows players to "pay more resources to make a purchase at a higher ratiy as well", suggesting both a random (unlock) and a guaranteed (purchase) acquisition method.

### II. Asset Catalog: Armor

Armor pieces provide defensive stats, affect weight, and contribute to various passive character traits. They are defined within the `loadEquipment` function in `game/client.html`. Each piece belongs to a set and has base stats that are further modified by rarity, level, mods, and character attributes. All initially defined armor pieces have 3 modification slots.

**Base Stats Categories:**

- **Defense**: Base damage reduction value.
- **Weight**: Affects movement speed and agility costs.
- **Stamina/Thaumaturgy/Physical**: Contributions to critical resistance/defense, evasion chance/defense, base defense, and tenacity (for Stamina/Thaumaturgy).
- **Health**: Contribution to health regeneration (`regen`).
- **Ranged/Melee Defense**: Specific defense modifiers against these attack types.
- **Stealth Radius/Detection**: Modifiers affecting stealth mechanics.

---

**A. Thunder Warrior Set (Default/Balanced)**

- **Class**: Defensive
- **Description**: Standard issue armor, balanced stats.

1.  **Thunder Warrior Helmet**
    - **Base Defense**: 2.5
    - **Weight**: 9
    - **Description**: 'Description'
    - **Slot**: Helmet
    - **Stats Contributions**: Provides balanced contributions across Stamina, Thaumaturgy, Health, and Physical categories, including resistances, evasion, defense, and regen. Offers moderate ranged and melee defense.
2.  **Thunder Warrior Torso**
    - **Base Defense**: 3
    - **Weight**: 15
    - **Description**: 'Decription' (Typo in source code)
    - **Slot**: Torso
    - **Stats Contributions**: Similar balanced contributions as the helmet, likely slightly higher due to being a larger piece.
3.  **Thunder Warrior Legs**
    - **Base Defense**: 2.5
    - **Weight**: 12
    - **Description**: 'Description'
    - **Slot**: Legs
    - **Stats Contributions**: Balanced contributions.
4.  **Thunder Warrior Right Arm**
    - **Base Defense**: 2
    - **Weight**: 7
    - **Description**: 'Description'
    - **Slot**: Right Arm
    - **Stats Contributions**: Balanced contributions.
5.  **Thunder Warrior Left Arm**
    - **Base Defense**: 2
    - **Weight**: 7
    - **Description**: 'Description'
    - **Slot**: Left Arm
    - **Stats Contributions**: Balanced contributions.

---

**B. Sith Set**

- **Class**: Defensive
- **Description**: Focuses on Thaumaturgy stats and melee defense, heavier than Thunder Warrior set.

1.  **Sith Helmet**
    - **Base Defense**: 2.083
    - **Weight**: 13.5
    - **Description**: 'Description'
    - **Slot**: Helmet
    - **Stats Contributions**: High Thaumaturgy resistances, defense, tenacity, and regen. Moderate Physical/Stamina stats. Higher melee defense than ranged. Lower stealth radius contribution compared to Thunder Warrior.
2.  **Sith Torso**
    - **Base Defense**: 2.5
    - **Weight**: 22.5
    - **Description**: 'Decription' (Typo in source code)
    - **Slot**: Torso
    - **Stats Contributions**: Similar focus as the helmet, higher base values.
3.  **Sith Legs**
    - **Base Defense**: 2.083
    - **Weight**: 18
    - **Description**: 'Description'
    - **Slot**: Legs
    - **Stats Contributions**: Similar focus as the helmet.
4.  **Sith Right Arm**
    - **Base Defense**: 1.667
    - **Weight**: 10.5
    - **Description**: 'Description'
    - **Slot**: Right Arm
    - **Stats Contributions**: Similar focus as the helmet.
5.  **Sith Left Arm**
    - **Base Defense**: 1.667
    - **Weight**: 10.5
    - **Description**: 'Description'
    - **Slot**: Left Arm
    - **Stats Contributions**: Similar focus as the helmet.

---

**C. Shadow Set**

- **Class**: Defensive
- **Description**: Focuses on Stamina stats, evasion, ranged defense, and stealth. Lighter than Thunder Warrior set.

1.  **Shadow Helmet**
    - **Base Defense**: 1.25
    - **Weight**: 5.4
    - **Description**: 'Description'
    - **Slot**: Helmet
    - **Stats Contributions**: Very high Stamina evasion, defense, tenacity, and regen. High Physical evasion. Moderate resistances. Low Thaumaturgy stats. Higher ranged defense than melee. Significant stealth radius contribution (negative effect reduction) but lower detection.
2.  **Shadow Torso**
    - **Base Defense**: 1.5
    - **Weight**: 9
    - **Description**: 'Decription' (Typo in source code)
    - **Slot**: Torso
    - **Stats Contributions**: Similar focus as the helmet, higher base values.
3.  **Shadow Legs**
    - **Base Defense**: 1.25
    - **Weight**: 7.2
    - **Description**: 'Description'
    - **Slot**: Legs
    - **Stats Contributions**: Similar focus as the helmet.
4.  **Shadow Right Arm**
    - **Base Defense**: 1
    - **Weight**: 4.2
    - **Description**: 'Description'
    - **Slot**: Right Arm
    - **Stats Contributions**: Similar focus as the helmet.
5.  **Shadow Left Arm**
    - **Base Defense**: 1
    - **Weight**: 4.2
    - **Description**: 'Description'
    - **Slot**: Left Arm
    - **Stats Contributions**: Similar focus as the helmet.

---

**D. Festive Set**

- **Class**: Defensive
- **Description**: Appears to be a lower-stat set, possibly cosmetic or for events. Generally low contributions across the board compared to other sets.

1.  **Festive Helmet**
    - **Base Defense**: 1.0415
    - **Weight**: 7.65
    - **Description**: 'Description'
    - **Slot**: Helmet
    - **Stats Contributions**: Low, relatively balanced contributions to all stats, regen, and defenses.
2.  **Festive Torso**
    - **Base Defense**: 1.25
    - **Weight**: 12.75
    - **Description**: 'Decription' (Typo in source code)
    - **Slot**: Torso
    - **Stats Contributions**: Low, balanced contributions.
3.  **Festive Legs**
    - **Base Defense**: 1.0415
    - **Weight**: 10.2
    - **Description**: 'Description'
    - **Slot**: Legs
    - **Stats Contributions**: Low, balanced contributions.
4.  **Festive Right Arm**
    - **Base Defense**: 0.8335
    - **Weight**: 5.95
    - **Description**: 'Description'
    - **Slot**: Right Arm
    - **Stats Contributions**: Low, balanced contributions.
5.  **Festive Left Arm**
    - **Base Defense**: 0.8335
    - **Weight**: 5.95
    - **Description**: 'Description'
    - **Slot**: Left Arm
    - **Stats Contributions**: Low, balanced contributions.

---

### III. Asset Catalog: Ranged Weapons (Guns)

Guns are defined in the `loadEquipment` function in `game/client.html`. They handle projectile firing, heat management, and contribute to offensive stats. All initially defined guns have 3 modification slots. The `Gun.js` file handles their in-game logic.

**Base Stats:**

- **initTime**: Delay after equipping before the weapon can be used.
- **damage**: Base damage per projectile hit (modified by distance, mods, level, rarity). Base values listed are multiplied by 3 in the code.
- **range**: Effective range where projectiles deal maximum damage. Damage falls off up to 3x this range.
- **firingSpeed**: Time (in ms) between shots. Lower is faster.
- **projectileSpeed**: Velocity of the projectile.
- **heat**: Object defining heat mechanics:
  - `max`: Maximum heat capacity / Time (ms) to cool from max heat.
  - `increase`: Heat generated per shot (ms).
  - `coolWaitTime`: Delay (ms) after firing before cooling starts.
  - `overheatTime`: Duration (ms) the weapon is disabled when overheated.
- **src**: Image source file name.
- **projectileColor**: Color identifier for the projectile visual.
- **type**: Display name of the weapon.
- **spreadMax**: Maximum projectile spread angle (degrees).
- **class**: Weapon category (e.g., 'Blaster Rifle').
- **set**: The equipment set it belongs to.
- **description**: In-game text description.
- **criticalChance/Damage**: Base physical critical hit stats (%).
- **accuracy/accuracyDamage**: Base physical accuracy stats (%).
- **precision**: Base physical precision value.
- **Stamina/Thaumaturgy/Health/Physical Contributions**: Base percentage contributions to various offensive character stats (crit, accuracy, precision, damage, onKill/onDamage gain, drain, ability duration/activation/cooldown).
- **equipTime**: Time it takes to switch _to_ this weapon (defined as 2s for all listed guns).
- **delay**: Delay before the _first_ shot after pulling the trigger (defined as 0.5s for all listed guns).

---

**A. E-11 Variants (Blaster Rifle - Thunder Warrior Set)**

1.  **E-11 Twilight**
    - **Description**: The standard, balanced E-11. Good all-around stats but excels in no specific area.
    - **Base Damage**: 100 (x3 = 300)
    - **Range**: 10
    - **Firing Speed**: 500ms
    - **Projectile Speed**: 5
    - **Spread**: 10
    - **Heat**: Max 2500, Increase 250, Wait 3000, Overheat 5000
    - **Crit Chance/Dmg**: 12.5% / 15%
    - **Accuracy/Acc Dmg**: 2.5% / 5%
    - **Precision**: 2
    - **Init Time**: 0.5s
2.  **E-11 Affluent**
    - **Description**: Focuses on critical hits. More heat capacity and higher crit stats than Twilight, but less base damage and slower firing speed.
    - **Base Damage**: 80 (x3 = 240)
    - **Range**: 11
    - **Firing Speed**: 600ms
    - **Projectile Speed**: 5.5
    - **Spread**: 11
    - **Heat**: Max 2250, Increase 200, Wait 4000, Overheat 6000
    - **Crit Chance/Dmg**: 25% / 15%
    - **Accuracy/Acc Dmg**: 3.5% / 6%
    - **Precision**: 4
    - **Init Time**: 0.6s
3.  **E-11 Viper**
    - **Description**: Focuses on burst damage. Faster firing speed and cooling than Twilight, but lower range and less heat capacity (fewer shots before overheat).
    - **Base Damage**: 115 (x3 = 345)
    - **Range**: 8.5
    - **Firing Speed**: 350ms
    - **Projectile Speed**: 4.75
    - **Spread**: 9
    - **Heat**: Max 3500, Increase 437.5, Wait 2000, Overheat 4500
    - **Crit Chance/Dmg**: 10% / 14%
    - **Accuracy/Acc Dmg**: 2.25% / 4.75%
    - **Precision**: 1.75
    - **Init Time**: 0.4s

---

**B. DLT-19 Variants (Repeating Blaster - Sith Set)**

1.  **DLT-19 Epitome**
    - **Description**: Standard DLT-19. Very high fire rate, low damage/range. Slow initial cooling but cools quickly once started.
    - **Base Damage**: 30 (x3 = 90)
    - **Range**: 7
    - **Firing Speed**: 200ms
    - **Projectile Speed**: 4
    - **Spread**: 12.5
    - **Heat**: Max 1000, Increase 25, Wait 5000, Overheat 4000
    - **Crit Chance/Dmg**: 8.5% / 10%
    - **Accuracy/Acc Dmg**: 1.5% / 2.5%
    - **Precision**: 1.2
    - **Init Time**: 1.5s
2.  **DLT-19 Deluge**
    - **Description**: Even higher fire rate and heat capacity than Epitome, but lower damage.
    - **Base Damage**: 20 (x3 = 60)
    - **Range**: 6.5
    - **Firing Speed**: 150ms
    - **Projectile Speed**: 2.5
    - **Spread**: 14
    - **Heat**: Max 1500, Increase 15, Wait 7000, Overheat 5500
    - **Crit Chance/Dmg**: 7.5% / 9%
    - **Accuracy/Acc Dmg**: 1.25% / 2.25%
    - **Precision**: 1
    - **Init Time**: 1.35s
3.  **DLT-19 Scarlet**
    - **Description**: Higher damage than Epitome, but slower fire rate and less heat capacity.
    - **Base Damage**: 40 (x3 = 120)
    - **Range**: 7.5
    - **Firing Speed**: 250ms
    - **Projectile Speed**: 3.5
    - **Spread**: 11.5
    - **Heat**: Max 2000, Increase 80, Wait 4250, Overheat 5000
    - **Crit Chance/Dmg**: 7% / 12%
    - **Accuracy/Acc Dmg**: 2% / 4%
    - **Precision**: 1.5
    - **Init Time**: 2s

---

**C. T-21 Variants (Heavy Blaster - Shadow Set)**

1.  **T-21 Shade**
    - **Description**: Standard T-21. Very high damage and range, very low fire rate. Great crit, accuracy, and precision.
    - **Base Damage**: 200 (x3 = 600)
    - **Range**: 15
    - **Firing Speed**: 2000ms
    - **Projectile Speed**: 5.5
    - **Spread**: 5
    - **Heat**: Max 4000, Increase 2670, Wait 4000, Overheat 2000
    - **Crit Chance/Dmg**: 27.5% / 25%
    - **Accuracy/Acc Dmg**: 5% / 7.5%
    - **Precision**: 5
    - **Init Time**: 1s
2.  **T-21 Vintage**
    - **Description**: Even higher damage and range than Shade, but slower fire rate and less accurate.
    - **Base Damage**: 250 (x3 = 750)
    - **Range**: 20
    - **Firing Speed**: 3500ms
    - **Projectile Speed**: 6
    - **Spread**: 6
    - **Heat**: Max 6000, Increase 4800, Wait 5000, Overheat 3000
    - **Crit Chance/Dmg**: 35% / 30%
    - **Accuracy/Acc Dmg**: 4% / 5.5%
    - **Precision**: 7
    - **Init Time**: 1.15s
3.  **T-21 Amaranthine**
    - **Description**: Modified for closer combat. Less damage than Shade, but better fire rate and heat capacity (more shots before overheat). Shorter range.
    - **Base Damage**: 150 (x3 = 450)
    - **Range**: 6
    - **Firing Speed**: 750ms
    - **Projectile Speed**: 5
    - **Spread**: 7
    - **Heat**: Max 3000, Increase 1670, Wait 4400, Overheat 1500
    - **Crit Chance/Dmg**: 22.5% / 20%
    - **Accuracy/Acc Dmg**: 6% / 8.5%
    - **Precision**: 5.5
    - **Init Time**: 0.8s

---

### IV. Asset Catalog: Melee Weapons (Sabers)

Sabers (Plasmablades) are defined in the `getLaserSwords` function within `loadEquipment` in `game/client.html`. They handle striking and blocking mechanics. All initially defined sabers have 3 modification slots. The `Saber.js` file handles their in-game logic.

**Base Stats:**

- **initTime**: Delay after equipping before the weapon can be used.
- **block**: Object containing blocking stats:
  - `minTime`: Minimum duration a block must be held.
  - `parryTime`: Duration of the parry window at the start of a block.
  - `wait`: Cooldown after blocking before another action can be taken.
  - `stun`: Duration target is stunned when their melee attack is blocked.
  - `knockback`: Force applied to target when their melee attack is blocked.
  - `stabAngle`: Angle (degrees) within which melee attacks can be blocked.
  - `projectileAngle`: Angle (degrees) within which projectiles can be blocked/reflected.
  - `reflectionRange`: Range of reflected projectiles.
  - `reflectionSpread`: Spread angle (degrees) of reflected projectiles.
  - `reflectionDrain`: Stamina cost for blocking a projectile.
  - `enemyStabDrain`: Stamina drained from attacker when their melee attack is blocked.
  - `ownStabDrain`: Stamina cost for blocking a melee attack.
  - `thaumAngle`: Angle (degrees) within which Thaumaturgy effects can be blocked (if applicable).
  - `enemyThaumDrain`: Stamina drained from attacker when their Thaumaturgy effect is blocked.
  - `ownThaumDrain`: Stamina cost for blocking a Thaumaturgy effect.
  - `continualDrain`: Stamina drained per second while holding block.
  - `imediateDrain`: Initial stamina cost to start blocking.
- **strike**: Object containing striking stats:
  - `delay`: Time between initiating strike and damage being applied.
  - `wait`: Cooldown after a strike before another action can be taken.
  - `damage`: Base damage per strike hit (modified by mods, level, rarity). Base values listed are multiplied by 3 in the code.
  - `knockback`: Force applied to target hit by a strike.
  - `angle`: Angle (degrees) of the strike arc.
  - `radius`: Range/radius of the strike arc.
  - `cost`: Stamina cost per strike.
  - `duration`: Total animation time for a strike (defined as 1s for all sabers).
- **criticalChance/Damage**: Base physical critical hit stats (%).
- **accuracy/accuracyDamage**: Base physical accuracy stats (%).
- **precision**: Base physical precision value.
- **src**: Image source file name.
- **type**: Display name of the weapon.
- **class**: Saber category (e.g., 'Aggressive').
- **set**: The equipment set it belongs to.
- **description**: In-game text description.
- **Stamina/Thaumaturgy/Health/Physical Contributions**: Base percentage contributions to various offensive character stats.
- **equipTime**: Time it takes to switch _to_ this weapon (defined as 2s for all listed sabers).

---

**A. Aggressive Sabers (Shadow Set)**

1.  **Coral Plasmablade (Orange)**
    - **Description**: Focuses on pure offensive potential. Standard aggressive saber.
    - **Strike**: Damage 300 (x3=900), Delay 0.4s, Wait 1.5s, Radius 5, Angle 75, Knockback 1.5, Cost 200.
    - **Block**: Parry 0.25s, Min Time 1s, Wait 1s, Stun 0.1s, Knockback 0.25, Proj Angle 45, Stab Angle 60, Cont Drain 450, Init Drain 650.
    - **Crit Chance/Dmg**: 10% / 30%
    - **Accuracy/Acc Dmg**: 4% / 7.5%
    - **Precision**: 3
    - **Init Time**: 1s
2.  **Amethyst Plasmablade (Purple)**
    - **Description**: Focuses on pure offensive potential. Attacks slowly but hits hard, punishing enemies effectively.
    - **Strike**: Damage 500 (x3=1500), Delay 0.7s, Wait 2.25s, Radius 7, Angle 90, Knockback 2.5, Cost 350.
    - **Block**: Parry 0.3s, Min Time 1.25s, Wait 1.5s, Stun 0.15s, Knockback 0.3, Proj Angle 40, Stab Angle 55, Cont Drain 495, Init Drain 715.
    - **Crit Chance/Dmg**: 12.5% / 45%
    - **Accuracy/Acc Dmg**: 6% / 9%
    - **Precision**: 4.5
    - **Init Time**: 1.25s
3.  **Garnet Plasmablade (Red)**
    - **Description**: Focuses on pure offensive potential via ferocious, rapid attacks.
    - **Strike**: Damage 235 (x3=705), Delay 0.2s, Wait 0.75s, Radius 4.25, Angle 65, Knockback 1.3, Cost 150.
    - **Block**: Parry 0.2s, Min Time 0.75s, Wait 0.8s, Stun 0.075s, Knockback 0.2, Proj Angle 50, Stab Angle 50, Cont Drain 400, Init Drain 600.
    - **Crit Chance/Dmg**: 15% / 25%
    - **Accuracy/Acc Dmg**: 5% / 6%
    - **Precision**: 5
    - **Init Time**: 0.85s

---

**B. Defensive Sabers (Sith Set)**

1.  **Tanzanite Plasmablade (Blue)**
    - **Description**: Focuses on pure defensive potential. Standard defensive saber with a long parry window.
    - **Strike**: Damage 200 (x3=600), Delay 0.8s, Wait 2.5s, Radius 3, Angle 35, Knockback 0.75, Cost 400.
    - **Block**: Parry 1s, Min Time 0.25s, Wait 0.25s, Stun 0.5s, Knockback 2, Proj Angle 75, Stab Angle 90, Cont Drain 200, Init Drain 350. (Very low stamina usage for blocking).
    - **Crit Chance/Dmg**: 3.5% / 10%
    - **Accuracy/Acc Dmg**: 2% / 3.5%
    - **Precision**: 1.75
    - **Init Time**: 0.5s
2.  **Emerald Plasmablade (Green)**
    - **Description**: Focuses on pure defensive potential through sustained blocking with very low stamina drain. Long parry window.
    - **Strike**: Damage 220 (x3=660), Delay 1s, Wait 2.75s, Radius 3.125, Angle 40, Knockback 0.9, Cost 450.
    - **Block**: Parry 1.5s, Min Time 1.5s, Wait 0.35s, Stun 0.4s, Knockback 1.75, Proj Angle 70, Stab Angle 80, Cont Drain 50, Init Drain 500. (Extremely low continuous drain).
    - **Crit Chance/Dmg**: 3.25% / 12.5%
    - **Accuracy/Acc Dmg**: 1.75% / 4%
    - **Precision**: 2
    - **Init Time**: 0.65s
3.  **Peridot Plasmablade (Lime)**
    - **Description**: Focuses on pure defensive potential through quick blocking actions. Good parry window and high effectiveness when blocking.
    - **Strike**: Damage 175 (x3=525), Delay 0.725s, Wait 2.15s, Radius 2.75, Angle 30, Knockback 0.6, Cost 375.
    - **Block**: Parry 0.75s, Min Time 0.75s, Wait 0.15s, Stun 0.6s, Knockback 2.25, Proj Angle 85, Stab Angle 100, Cont Drain 325, Init Drain 100. (Very low initial cost).
    - **Crit Chance/Dmg**: 3.75% / 8.5%
    - **Accuracy/Acc Dmg**: 2.25% / 3%
    - **Precision**: 1.5
    - **Init Time**: 0.4s

---

**C. Balanced Sabers (Thunder Warrior Set)**

1.  **Topaz Plasmablade (Yellow)**
    - **Description**: The classic, balanced plasmablade, mixing offense and defense.
    - **Strike**: Damage 250 (x3=750), Delay 0.6s, Wait 2s, Radius 4, Angle 50, Knockback 1.25, Cost 300.
    - **Block**: Parry 0.5s, Min Time 0.5s, Wait 0.5s, Stun 0.25s, Knockback 1.25, Proj Angle 60, Stab Angle 75, Cont Drain 300, Init Drain 450.
    - **Crit Chance/Dmg**: 5% / 15%
    - **Accuracy/Acc Dmg**: 2.5% / 5%
    - **Precision**: 2.25
    - **Init Time**: 0.75s
2.  **Boracite Plasmablade (Cyan)**
    - **Description**: A less efficient but stronger version of the Topaz, suited for high-Stamina builds. Balanced capabilities with higher costs.
    - **Strike**: Damage 275 (x3=825), Delay 0.5s, Wait 1.75s, Radius 4.5, Angle 60, Knockback 1.4, Cost 510.
    - **Block**: Parry 0.7s, Min Time 0.7s, Wait 0.35s, Stun 0.35s, Knockback 1.5, Proj Angle 65, Stab Angle 82.5, Cont Drain 510, Init Drain 765. (High costs).
    - **Crit Chance/Dmg**: 7.5% / 27.5%
    - **Accuracy/Acc Dmg**: 3% / 6.75%
    - **Precision**: 2.75
    - **Init Time**: 0.35s
3.  **Alabaster Plasmablade (White)**
    - **Description**: A more efficient but weaker version of the Topaz, suited for low-Stamina builds. Balanced capabilities with lower costs.
    - **Strike**: Damage 230 (x3=690), Delay 0.725s, Wait 2.125s, Radius 3.5, Angle 45, Knockback 1.1, Cost 210.
    - **Block**: Parry 0.4s, Min Time 0.4s, Wait 0.65s, Stun 0.2s, Knockback 1, Proj Angle 55, Stab Angle 70, Cont Drain 225, Init Drain 365. (Low costs).
    - **Crit Chance/Dmg**: 4% / 12.5%
    - **Accuracy/Acc Dmg**: 2.3% / 4.25%
    - **Precision**: 1.9
    - **Init Time**: 1.5s

---

### V. Asset Catalog: Abilities

Abilities are active skills triggered by player input, consuming Stamina or Thaumaturgy. They are defined in the `constructAbilities` function in `game/client.html` and their logic is implemented in `game/AbilityEffect.js`.

**Common Properties (Defined in `client.html`)**:

- **name**: Display name.
- **refrence**: Key used to link to the logic in `AbilityEffect.js`.
- **activationTime**: Delay (seconds) before the ability takes effect. 0 is instant.
- **duration**: How long the ability's effect lasts (seconds). 0 is instant. Can be descriptive (e.g., "Until Released").
- **cooldown**: Time (seconds) after use before it can be activated again.
- **solo**: Boolean, if `true`, cannot be active concurrently with other solo abilities.
- **staminaCost**: Base stamina cost to activate (multiplied by 20 in code). Mobility abilities may scale with weight.
- **thaumaturgyCost**: Base thaumaturgy cost to activate (multiplied by 10 in code).
- **staminaDrain**: Stamina cost per second for sustained abilities.
- **ultimate**: Boolean, if `true`, it's a powerful ability; activating it might put other ultimates on cooldown.
- **class**: Broad category (e.g., "Mobility", "Saber", "Combat", "Buff", "Control").
- **subclass**: More specific category (e.g., "Jump", "Run", "Strike", "Block", "Heal", "Transpose"). Used for activation conflicts.
- **unlockCost**: Skill points required to unlock.
- **creditCost**: Credits required to unlock.
- **prerequisites**: Array of `name` strings of abilities that must be unlocked first.
- **abilityType**: "stamina" or "force" (Thaumaturgy).
- **description**: In-game text, often with placeholders like `<prop>duration</prop>` which are dynamically filled.
- **Effect-Specific Properties**: Many abilities have unique properties defining damage, range, angle, multipliers, effect durations, etc.

---

**A. Stamina Abilities**

1.  **Bound (`Jump`)**
    - **Class/Subclass**: Mobility / Jump
    - **Effect**: Standard jump ability. Propels the user vertically and horizontally. Can hold jump key for slightly increased height (`keepJumping`).
    - **Activation/Duration/Cooldown**: 0.2s / Until Landed / 2s
    - **Cost**: 500 Stamina
    - **Prerequisites**: None
2.  **Sprint (`Run`)**
    - **Class/Subclass**: Mobility / Run
    - **Effect**: Doubles movement speed while active. Drains stamina over time. Active as long as the key is held and stamina permits.
    - **Activation/Duration/Cooldown**: 0.15s / Until Released / 1s
    - **Cost**: 300 Stamina (initial) + 150 Stamina/sec (drain, scales with weight)
    - **Prerequisites**: Bound
3.  **Expeditiouse Retreat (`ExpeditiouseRetreat`)**
    - **Class/Subclass**: Mobility / Run
    - **Effect**: Increases movement speed by 150% (total 2.5x) and defense by 25% while active. Drains stamina over time.
    - **Activation/Duration/Cooldown**: 0.15s / Until Released / 7s
    - **Cost**: 400 Stamina (initial) + 500 Stamina/sec (drain, scales with weight)
    - **Prerequisites**: Sprint
4.  **Accelerating Dart (`SpeedRun`)**
    - **Class/Subclass**: Mobility / Run
    - **Effect**: Increases movement speed while active. Starts at +25% and ramps up to +400% over 12 seconds. Drains stamina over time (drain also ramps up).
    - **Activation/Duration/Cooldown**: 1s / Until Released / 3s
    - **Cost**: 200 Stamina (initial) + 50 Stamina/sec (drain, scales with weight, ramps up to 200/sec)
    - **Prerequisites**: Expeditiouse Retreat
5.  **Speed (`Speed`)**
    - **Class/Subclass**: Mobility / Boost
    - **Effect**: Increases movement speed by 100% (total 2x) for 5 seconds. Applies "speed" status effect.
    - **Activation/Duration/Cooldown**: 1s / 5s / 15s
    - **Cost**: 350 Stamina
    - **Prerequisites**: Bound
6.  **Dash (`Dash`)**
    - **Class/Subclass**: Mobility / Boost
    - **Effect**: Brief burst of speed. Increases movement speed by 600% (total 7x) for 0.75 seconds. Applies "speed" status effect.
    - **Activation/Duration/Cooldown**: 0.1s / 0.75s / 10s
    - **Cost**: 250 Stamina, 75 Thaumaturgy
    - **Prerequisites**: Speed, Sprint
7.  **Launch (`Launch`)**
    - **Class/Subclass**: Mobility / Jump
    - **Effect**: High vertical jump (2x jump height modifier).
    - **Activation/Duration/Cooldown**: 1.5s / Instant / 25s
    - **Cost**: 700 Stamina, 50 Thaumaturgy
    - **Prerequisites**: Bound
8.  **Leap (`Leap`)**
    - **Class/Subclass**: Mobility / Jump
    - **Effect**: Long forward jump. Provides significant initial horizontal velocity (15 units) but slightly reduced jump height (0.75x modifier).
    - **Activation/Duration/Cooldown**: 0.5s / Instant / 20s
    - **Cost**: 600 Stamina
    - **Prerequisites**: Launch, Sprint
9.  **Change Weapon (`ChangeWeapon`)**
    - **Class/Subclass**: Saber / Utility
    - **Effect**: Switches between the equipped ranged and melee weapons. The switch takes time defined by the weapons themselves.
    - **Activation/Duration/Cooldown**: 0s / Until Switched / 10s
    - **Cost**: 440 Stamina
    - **Prerequisites**: None
10. **Flurry Of Blows (`FlurryOfBlows`)**
    - **Class/Subclass**: Saber / Offense
    - **Effect**: Increases melee attack speed by 75% for 8.5 seconds. Applies "meleeSpeed" status effect.
    - **Activation/Duration/Cooldown**: 0.8s / 8.5s / 29s
    - **Cost**: 540 Stamina, 25 Thaumaturgy
    - **Prerequisites**: Change Weapon
11. **Power Strike (`PowerStrike`)**
    - **Class/Subclass**: Saber / Strike
    - **Effect**: Performs 1 enhanced saber strike. Deals 1.25x damage, 1.4x radius, 1.6x knockback. Hits apply a 40% slow ("slow" status) for 3.5 seconds. Uses weapon's crit/accuracy stats modified by ability multipliers (e.g., 0.8x Crit Chance, 1.6x Crit Dmg). Costs 1.5x normal strike stamina.
    - **Activation/Duration/Cooldown**: 0.3s / Saber Speed / 17.5s
    - **Cost**: 520 Stamina + 1.5x Saber Strike Cost
    - **Prerequisites**: Flurry Of Blows
12. **Bleed Strike (`BleedStrike`)**
    - **Class/Subclass**: Saber / Strike
    - **Effect**: Performs 2 enhanced saber strikes. Deals 1.3x damage, 1.2x radius. Hits apply a bleed ("damageOverTime" status) dealing 100 damage/sec for 4 seconds (damage scales with stats). Modifies weapon crit/accuracy. Costs 1.1x normal strike stamina.
    - **Activation/Duration/Cooldown**: 0.5s / Saber Speed / 20s
    - **Cost**: 480 Stamina + 1.1x Saber Strike Cost
    - **Prerequisites**: Power Strike
13. **Critical Strike (`CriticalStrike`)**
    - **Class/Subclass**: Saber / Strike
    - **Effect**: Performs 2 enhanced saber strikes. Deals 1.2x damage. Hits apply 67% defense reduction ("expose" status) for 7 seconds. Greatly enhanced crit/accuracy stats (e.g., 1.9x Crit Chance, 1.4x Crit Dmg). Costs 0.8x normal strike stamina.
    - **Activation/Duration/Cooldown**: 0.2s / Saber Speed / 15s
    - **Cost**: 440 Stamina + 0.8x Saber Strike Cost
    - **Prerequisites**: Power Strike
14. **Swift Strike (`SwiftStrike`)**
    - **Class/Subclass**: Saber / Strike
    - **Effect**: Performs 4 rapid saber strikes. Deals 0.6x damage, 0.9x radius, 0.5x knockback. Hits apply 70% damage reduction ("weakness" status) for 3 seconds. Reduced crit/accuracy stats. Costs 0.6x normal strike stamina. Has 0.5x strike cooldown multiplier.
    - **Activation/Duration/Cooldown**: 0.25s / Saber Speed / 25s
    - **Cost**: 560 Stamina + 0.6x Saber Strike Cost
    - **Prerequisites**: Power Strike
15. **Traditional Block (`SimpleBlock`)**
    - **Class/Subclass**: Saber / Block
    - **Effect**: Standard saber block. Can block projectiles and melee strikes. Can parry. Uses saber's base blocking stats. Active while key is held (respecting saber's min block time).
    - **Activation/Duration/Cooldown**: 0s / Until Released / 10s
    - **Cost**: Saber Block Costs
    - **Prerequisites**: Change Weapon
16. **Thaumaturgy Block (`ThaumBlock`)**
    - **Class/Subclass**: Saber / Block
    - **Effect**: Blocks projectiles, melee, AND Thaumaturgy attacks. Cannot parry. Increased stamina costs (1.25x cost mult, 1.5x drain mult based on saber stats). Active while key is held.
    - **Activation/Duration/Cooldown**: 0s / Until Released / 5s
    - **Cost**: 30 Thaumaturgy + Saber Block Costs (modified)
    - **Prerequisites**: Traditional Block
17. **Parrying Thaumaturgy Block (`ThaumBlockParry`)**
    - **Class/Subclass**: Saber / Block
    - **Effect**: Blocks projectiles, melee, and Thaumaturgy. Can parry (with 0.5x parry time multiplier based on saber stat). Significantly increased stamina costs (1.5x cost mult, 2x drain mult). Active while key is held.
    - **Activation/Duration/Cooldown**: 0s / Until Released / 30s
    - **Cost**: 120 Thaumaturgy + Saber Block Costs (modified)
    - **Prerequisites**: Thaumaturgy Block, Swift Strike
18. **Heal (`Heal`)**
    - **Class/Subclass**: Combat / Heal
    - **Effect**: Instantly restores 100 health. Cannot be used at full health.
    - **Activation/Duration/Cooldown**: 2s / Instant / 90s
    - **Cost**: 1000 Stamina, 50 Thaumaturgy
    - **Prerequisites**: None
19. **Oneness (`Oneness`)**
    - **Class/Subclass**: Combat / Buff
    - **Effect**: Reduces character weight by 50% for 24 seconds. Applies "weightless" status effect.
    - **Activation/Duration/Cooldown**: 6s / 24s / 52s
    - **Cost**: 800 Stamina, 10 Thaumaturgy
    - **Prerequisites**: Heal
20. **Preparation (`Preparation`)**
    - **Class/Subclass**: Combat / Buff
    - **Effect**: After a long activation time, grants significant boosts (1.5x multiplier) to defense, firing speed, melee speed, cooling, jump, movement speed, and damage for 10 seconds. Applies "prepared" status effect.
    - **Activation/Duration/Cooldown**: 15s / 10s / 38s
    - **Cost**: 900 Stamina, 15 Thaumaturgy
    - **Prerequisites**: Oneness
21. **Heal Over Time (`HealOverTime`)**
    - **Class/Subclass**: Combat / Heal
    - **Effect**: Heals 25 health per second for 10 seconds. Applies "healOverTime" status effect.
    - **Activation/Duration/Cooldown**: 2s / 10s / 75s
    - **Cost**: 700 Stamina, 35 Thaumaturgy
    - **Prerequisites**: Heal
22. **Defensive (`Defensive`)**
    - **Class/Subclass**: Combat / Defense
    - **Effect**: Increases defense by 50% for 8 seconds. Applies "defense" status effect.
    - **Activation/Duration/Cooldown**: 0.6s / 8s / 17s
    - **Cost**: 600 Stamina
    - **Prerequisites**: Heal Over Time, Oneness
23. **Shield (`Shield`)**
    - **Class/Subclass**: Combat / Defense
    - **Effect**: Greatly increases defense by 200% (3x total) for a brief 2 seconds. Applies "defense" status effect.
    - **Activation/Duration/Cooldown**: 0s / 2s / 23s
    - **Cost**: 560 Stamina
    - **Prerequisites**: Defensive
24. **Fast Fire (`FastFire`)**
    - **Class/Subclass**: Combat / Offense
    - **Effect**: Increases ranged weapon firing speed by 100% (2x) for 12 seconds. Applies "firingSpeed" status effect.
    - **Activation/Duration/Cooldown**: 4s / 12s / 32s
    - **Cost**: 520 Stamina, 15 Thaumaturgy
    - **Prerequisites**: Heal
25. **Annihilation (`Annihilation`)**
    - **Class/Subclass**: Combat / Offense
    - **Effect**: Increases all damage output by 30% for 7 seconds. Applies "damaging" status effect.
    - **Activation/Duration/Cooldown**: 0.5s / 7s / 35s
    - **Cost**: 640 Stamina
    - **Prerequisites**: Fast Fire
26. **Snipe Shot (`SnipeShot`)**
    - **Class/Subclass**: Combat / Shot
    - **Effect**: Fires 1 enhanced shot from the equipped ranged weapon. Deals 1.5x damage, 2x range, 1.6x projectile speed, 0.7x spread. Enhanced crit/accuracy (e.g., 1.5x Crit Chance, 1.35x Crit Dmg). Costs 2x heat. Slower fire rate (1.45x firing speed multiplier). Deals base 8 Stamina damage.
    - **Activation/Duration/Cooldown**: 0.25s / Instant / 32s
    - **Cost**: 380 Stamina + 2x Gun Heat Cost
    - **Prerequisites**: Annihilation
27. **Triple Shot (`TripleShot`)**
    - **Class/Subclass**: Combat / Shot
    - **Effect**: Fires 3 enhanced shots. Deals 1.25x damage, 1.15x range, 1.4x projectile speed, 0.8x spread. Greatly enhanced crit (e.g., 1.75x Crit Chance, 1.9x Crit Dmg). Costs 0.7x heat. Faster fire rate (0.7x firing speed mult). Deals base 4 Stamina damage per shot.
    - **Activation/Duration/Cooldown**: 0.35s / Instant / 23s
    - **Cost**: 430 Stamina + 0.7x Gun Heat Cost (per shot)
    - **Prerequisites**: Fast Fire
28. **Burst Shot (`BurstShot`)**
    - **Class/Subclass**: Combat / Shot
    - **Effect**: Fires 10 rapid shots. Deals 0.25x damage, 0.6x range, 0.65x projectile speed, 1.2x spread. Reduced crit/accuracy. Costs 0.2x heat. Much faster fire rate (0.25x firing speed mult). Deals base 2 Stamina damage per shot.
    - **Activation/Duration/Cooldown**: 0.15s / Instant / 27s
    - **Cost**: 460 Stamina + 0.2x Gun Heat Cost (per shot)
    - **Prerequisites**: Triple Shot, Annihilation

---

**B. Thaumaturgy Abilities (Force)**

1.  **Hover (`Hover`)**
    - **Class/Subclass**: Buff / Movement
    - **Effect**: Affects allies in a 90° cone up to 14.5 range. Reduces weight by 50% ("weightless" status) and fall speed by 75% ("hover" status) for 11 seconds.
    - **Activation/Duration/Cooldown**: 0.5s / Instant / 23s
    - **Cost**: 140 Stamina, 40 Thaumaturgy
    - **Prerequisites**: None
2.  **Speed Aura (`SpeedAura`)**
    - **Class/Subclass**: Buff / Movement
    - **Effect**: Affects allies in a 360° radius of 12.5. Increases movement speed, melee speed, and firing speed by 50% for 8 seconds via "speed", "meleeSpeed", "firingSpeed" status effects.
    - **Activation/Duration/Cooldown**: 0.3s / 8s / 22s
    - **Cost**: 200 Stamina, 65 Thaumaturgy
    - **Prerequisites**: Hover
3.  **Jump Boost (`JumpBoost`)**
    - **Class/Subclass**: Buff / Movement
    - **Effect**: Affects allies in a 75° cone up to 13.5 range. Increases jump height by 50% for 8 seconds via "jumping" status effect.
    - **Activation/Duration/Cooldown**: 0.3s / Instant / 16s
    - **Cost**: 170 Stamina, 45 Thaumaturgy
    - **Prerequisites**: Speed Aura
4.  **Swiftness (`Swiftness`)**
    - **Class/Subclass**: Buff / Movement
    - **Effect**: Affects allies in a 75° cone up to 9.5 range. Increases movement speed by 75% for 6 seconds via "speed" status effect.
    - **Activation/Duration/Cooldown**: 0.2s / Instant / 15s
    - **Cost**: 300 Stamina, 70 Thaumaturgy
    - **Prerequisites**: Speed Aura
5.  **Fortification (`Fortification`)**
    - **Class/Subclass**: Buff / Defense
    - **Effect**: Affects allies in a 90° cone up to 11.5 range. Increases defense by 50% for 7 seconds via "defense" status effect.
    - **Activation/Duration/Cooldown**: 0.9s / Instant / 22.5s
    - **Cost**: 95 Thaumaturgy
    - **Prerequisites**: Hover
6.  **Recovery (`Recovery`)**
    - **Class/Subclass**: Buff / Support
    - **Effect**: Instantly restores 500 stamina to the user.
    - **Activation/Duration/Cooldown**: 5s / Instant / 20s
    - **Cost**: 70 Thaumaturgy
    - **Prerequisites**: Fortification
7.  **Cool (`Cool`)**
    - **Class/Subclass**: Buff / Support
    - **Effect**: Affects allies in 360° radius of 11. Instantly removes all heat from ranged weapons ("cool" status `activate`). Reduces heat buildup by 75% ("cool" status `update`) for 9.5 seconds. Ultimate ability.
    - **Activation/Duration/Cooldown**: 0.25s / Instant / 28s
    - **Cost**: 110 Thaumaturgy
    - **Prerequisites**: Recovery
8.  **Group Preparation (`GroupPrep`)**
    - **Class/Assisted Subclass**: Buff / Support
    - **Effect**: Affects allies in a 60° cone up to 9 range. After activation time, grants boosts (2x multiplier) to various stats ("prepared" status) for 5 seconds.
    - **Activation/Duration/Cooldown**: 8s / Instant / 17.5s
    - **Cost**: 125 Thaumaturgy
    - **Prerequisites**: Fortification
9.  **HealAura (`HealAura`)**
    - **Class/Subclass**: Buff / Heal
    - **Effect**: Affects allies in 360° radius of 9. Heals 50 health per second for 9 seconds ("healOverTime" logic applied in `AbilityEffect`).
    - **Activation/Duration/Cooldown**: 1.25s / 9s / 26s
    - **Cost**: 105 Thaumaturgy
    - **Prerequisites**: Group Preparation
10. **Push (`Push`)**
    - **Class/Subclass**: Combat / Transpose
    - **Effect**: Affects enemies in a 75° cone up to 7 range. Deals 360 Thaumaturgy damage. Knocks targets away (force 3.5, y-force 0.75).
    - **Activation/Duration/Cooldown**: 0.3s / Instant / 13s
    - **Cost**: 120 Stamina, 95 Thaumaturgy
    - **Prerequisites**: None
11. **Pull (`Pull`)**
    - **Class/Subclass**: Combat / Transpose
    - **Effect**: Affects enemies in a 60° cone up to 9 range. Deals 240 Thaumaturgy damage. Pulls targets closer (force 3, y-force 0.5).
    - **Activation/Duration/Cooldown**: 0.2s / Instant / 15s
    - **Cost**: 160 Stamina, 115 Thaumaturgy
    - **Prerequisites**: Push
12. **Life Drain (`LifeDrain`)**
    - **Class/Subclass**: Combat / Heal
    - **Effect**: Affects enemies in a 90° cone up to 12.5 range. Deals 500 Thaumaturgy damage. Heals the user for 50% of the damage dealt. Solo ability.
    - **Activation/Duration/Cooldown**: 0.3s / Instant / 24s
    - **Cost**: 80 Thaumaturgy
    - **Prerequisites**: Pull
13. **Repulse (`Repulse`)**
    - **Class/Subclass**: Combat / Transpose
    - **Effect**: Affects enemies in 360° radius of 14. Initially pulls targets closer (force 2.5, y-force 0.5) and deals 700 Thaumaturgy damage over 0.25s activation. Then, after 2.5s duration, pushes targets far away (force 6, y-force 0.9). Solo and Ultimate ability.
    - **Activation/Duration/Cooldown**: 0.175s / 2.5s / 32s
    - **Cost**: 240 Stamina, 130 Thaumaturgy
    - **Prerequisites**: Life Drain
14. **Weaken (`Weaken`)**
    - **Class/Subclass**: Control / Debuff
    - **Effect**: Affects enemies in a 75° cone up to 9 range. Deals 450 Thaumaturgy damage. Applies 40% damage reduction ("weakness" status) for 7.5 seconds.
    - **Activation/Duration/Cooldown**: 0.3s / Instant / 21s
    - **Cost**: 75 Thaumaturgy
    - **Prerequisites**: Push
15. **Punish (`Punish`)**
    - **Class/Subclass**: Combat / Damage
    - **Effect**: Affects enemies in a 60° cone up to 10.5 range. Deals 360 Thaumaturgy damage. Solo ability.
    - **Activation/Duration/Cooldown**: 0.65s / Instant / 14s
    - **Cost**: 75 Thaumaturgy
    - **Prerequisites**: Weaken
16. **Damage Aura (`DamageAura`)**
    - **Class/Subclass**: Combat / Damage
    - **Effect**: Affects enemies in 360° radius of 12 for 10 seconds. Deals 120 Thaumaturgy damage per second and applies 70% slow ("slow" status) each second. Solo and Ultimate ability.
    - **Activation/Duration/Cooldown**: 1.5s / 10s / 40s
    - **Cost**: 300 Thaumaturgy
    - **Prerequisites**: Punish
17. **Expose (`Expose`)**
    - **Class/Subclass**: Combat / Debuff
    - **Effect**: Affects enemies in a 45° cone up to 7.5 range. Deals 400 Thaumaturgy damage. Applies 30% increased damage taken ("expose" status, 1/1.3 defense mult) for 6 seconds. Solo ability.
    - **Activation/Duration/Cooldown**: 0.6s / Instant / 22s
    - **Cost**: 80 Thaumaturgy
    - **Prerequisites**: Punish
18. **Tether (`Tether`)**
    - **Class/Subclass**: Control / Immobalize
    - **Effect**: Affects enemies in a 90° cone up to 12 range. Deals 350 Thaumaturgy damage. Applies 100% increased weight ("heavy" status) and 30% reduced speed ("slow" status) for 7 seconds.
    - **Activation/Duration/Cooldown**: 0.4s / Instant / 20s
    - **Cost**: 100 Stamina, 50 Thaumaturgy
    - **Prerequisites**: None
19. **Hold (`Hold`)**
    - **Class/Subclass**: Control / Transpose
    - **Effect**: Affects enemies in a 90° cone up to 13 range. Deals 280 Thaumaturgy damage initially. Lifts targets off the ground and allows caster to move them slightly using `moveAway` logic for 11 seconds. Deals 30 Thaumaturgy damage per second while held. Cancels target's actions. Solo ability.
    - **Activation/Duration/Cooldown**: 0.55s / 11s / 24s
    - **Cost**: 120 Thaumaturgy
    - **Prerequisites**: Tether
20. **Choke (`Choke`)**
    - **Class/Subclass**: Control / Transpose
    - **Effect**: Affects enemies in a 75° cone up to 11 range. Deals 320 Thaumaturgy damage initially. Lifts targets, pulls them closer using `moveTorwards` logic for 13 seconds. Deals 70 Thaumaturgy damage per second while held. Cancels target's actions. Solo and Ultimate ability.
    - **Activation/Duration/Cooldown**: 0.45s / 13s / 26s
    - **Cost**: 130 Thaumaturgy
    - **Prerequisites**: Hold
21. **Reversal (`Reversal`)**
    - **Class/Subclass**: Control / Immobalize
    - **Effect**: Affects enemies in 360° radius of 15. Deals 240 Thaumaturgy damage. Reverses target's movement and mouse controls ("reverse" status) for 6.5 seconds.
    - **Activation/Duration/Cooldown**: 0.5s / Instant / 35s
    - **Cost**: 70 Thaumaturgy
    - **Prerequisites**: Tether
22. **Confusion (`Confusion`)**
    - **Class/Subclass**: Control / Immobalize
    - **Effect**: Affects enemies in a 75° cone up to 13 range. Deals 200 Thaumaturgy damage. Randomly scrambles target's movement and mouse controls ("confuse" status) for 4 seconds. Solo ability.
    - **Activation/Duration/Cooldown**: 1s / Instant / 23.5s
    - **Cost**: 110 Thaumaturgy
    - **Prerequisites**: Reversal
23. **Inspire Fear (`InspireFear`)**
    - **Class/Subclass**: Control / Immobalize
    - **Effect**: Affects enemies in a 90° cone up to 14 range. Deals 300 Thaumaturgy damage. Forces targets to run backwards at 1.35x speed ("fear" status) for 5 seconds.
    - **Activation/Duration/Cooldown**: 0.75s / Instant / 26s
    - **Cost**: 90 Thaumaturgy
    - **Prerequisites**: Reversal
24. **Mind Control (`MindControl`)**
    - **Class/Subclass**: Control / Domminance
    - **Effect**: Affects enemies in a 60° cone up to 23 range. Deals 250 Thaumaturgy damage initially. Takes control of targets for 16 seconds. Caster's input is redirected to control the targets, their affiliation is temporarily changed, and the caster's own trooper is uncontrollable but gets the target's camera view. Solo and Ultimate ability.
    - **Activation/Duration/Cooldown**: 0.25s / 16s / 60s
    - **Cost**: 500 Thaumaturgy
    - **Prerequisites**: Confusion, Inspire Fear
25. **Overheat (`Overheat`)**
    - **Class/Subclass**: Control / Debuff
    - **Effect**: Affects enemies in 360° radius of 8. Deals 60 Thaumaturgy damage. Instantly forces the target's ranged weapon into an overheated state (`troop.overheatGun`). Solo ability.
    - **Activation/Duration/Cooldown**: 0.75s / Instant / 30s
    - **Cost**: 100 Thaumaturgy
    - **Prerequisites**: Tether
26. **Freeze (`Freeze`)**
    - **Class/Subclass**: Control / Immobalize
    - **Effect**: Affects enemies in a 45° cone up to 6.5 range. Deals 70 Thaumaturgy damage. Freezes targets in place ("frozen" status), preventing all actions and movement for 3 seconds. Solo ability.
    - **Activation/Duration/Cooldown**: 0.6s / Instant / 29s
    - **Cost**: 120 Thaumaturgy
    - **Prerequisites**: Overheat

---

### VI. Asset Catalog: Status Effects (Buffs & Debuffs)

These are temporary effects applied to Troopers, defined in `game/StatusEffect.js`. They modify trooper behavior or stats over time.

**A. Buffs (`this.buff = true`)**

1.  **`cool`**: Instantly removes gun heat on activation. Reduces subsequent heat generation by `ammount` (e.g., 0.25 means 75% reduction). Duration: `time`.
2.  **`speed`**: Multiplies `troop.mult.speed` by `ammount`. Duration: `time`.
3.  **`defense`**: Multiplies `troop.mult.defense` by `ammount`. Duration: `time`.
4.  **`healOverTime`**: Heals `ammount` health periodically (seems fixed at 25/sec in implementation) over `time` duration.
5.  **`damageOverTime`**: Deals `damage` of `damageType` periodically over `time` duration, applying source's offensive stats (`crit`, `accuracy`, `precision`). Note: Marked as `buff=true` likely because it originates from an ally's Life Drain or similar effect, though it harms the recipient.
6.  **`firingSpeed`**: Multiplies `troop.mult.firing` by `ammount`. Duration: `time`.
7.  **`damaging`**: Multiplies `troop.mult.damage` by `ammount`. Duration: `time`.
8.  **`weakness`**: Multiplies `troop.mult.damage` by `ammount` (less than 1). Logically a debuff, but potentially marked `buff=true` if applied via a self-inflicted balancing mechanic? Duration: `time`.
9.  **`meleeSpeed`**: Multiplies `troop.mult.meleeSpeed` by `ammount`. Duration: `time`.
10. **`weightless`**: Multiplies `troop.mult.weight` by `ammount` (less than 1). Duration: `time`.
11. **`hover`**: Multiplies `troop.mult.fallSpeed` by `ammount` (less than 1). Duration: `time`.
12. **`jumping`**: Multiplies `troop.mult.jump` by `ammount`. Duration: `time`.
13. **`prepared`**: Multiplies several stats by `ammount` (defense, firing, meleeSpeed, speed, damage) and divides others (cooling, jump) for `time` duration.

**B. Debuffs (`this.buff = false`)**

1.  **`knockback`**: Applies a decaying force (`force`) in direction (`x`, `z`, `y`) over time, resisted by `troop.knockbackResistance` and weight. `strong` flag calls `troop.release()`.
2.  **`slow`**: Multiplies `troop.mult.speed` by `ammount` (less than 1). Duration: `time`.
3.  **`confuse`**: Randomly swaps input axes (movement, mouse) using `troop.modifyInput`. Duration: `time`.
4.  **`reverse`**: Inverts input axes using `troop.modifyInput`. Duration: `time`.
5.  **`fear`**: Forces backward running using `troop.modifyInput`. Duration: `time`.
6.  **`expose`**: Multiplies `troop.mult.defense` by `ammount` (less than 1, increasing damage taken). Duration: `time`.
7.  **`heavy`**: Multiplies `troop.mult.weight` by `ammount` (greater than 1). Duration: `time`.
8.  **`stun`**: Cancels trooper actions (`activate`) and cancels input (`update`). Duration: `time`.
9.  **`frozen`**: Cancels actions (`activate`), cancels input (`update`), and sets `troop.mult.fallSpeed = 0` (`update`). Duration: `time`.

---

### VII. Asset Catalog: Modifications (Mods)

Mods enhance equipment stats. They have a base effect, a rarity, a level, and can have Minor Modifications. Defined as global variables in `game/client.html`.

**A. Major Mods**

Categorized by the type of equipment they can be applied to. Each has a base effect percentage (`increase` or `decrease`).

1.  **Weapon Mods (Apply to Ranged & Melee)**
    - **Damage**: Increases weapon damage (`increase`: 1.5%).
    - **Quick Fire**: Decreases delay before use/after actions and initial shot delay (`decrease`: 2.5%).
2.  **Melee Mods (Apply to Melee Only)**
    - **Power**: Increases attack radius and knockback (`increase`: 2.5%).
    - **Deflection**: Enhances blocking vs sabers (angle, knockback, stun, stamina drain) (`increase`: 2.5%).
    - **Reflection**: Enhances blocking vs projectiles (angle, accuracy, range) (`increase`: 2.5%).
    - **Usage Speed**: Reduces cooldown after blocking/striking, reduces min block time (`increase`: 2.5%).
    - **Slightness**: Reduces stamina costs for all saber actions (`increase`: 0.25 - Note: this seems high, might be a typo and intended `0.025`).
    - **Parry**: Increases the parry window duration (`increase`: 2.5%).
3.  **Ranged Mods (Apply to Ranged Only)**
    - **Firing Speed**: Decreases delay between shots (`decrease`: 2.5%).
    - **Maximum Spread**: Decreases weapon spread (`decrease`: 2.5%).
    - **Projectile Speed**: Increases projectile speed (`increase`: 2.5%).
    - **Cooling Power**: Increases cooling rate (reduces `coolWaitTime`, `overheatTime`) (`increase`: 2.5%).
    - **Maximum Heat**: Increases max heat capacity (`increase`: 2.5%).
    - **Range**: Increases weapon range (`increase`: 2.5%).
4.  **Armour Mods (Apply to Armor Only)**
    - **Defense**: Increases armor defense (`increase`: 1.5%).
    - **Weight**: Decreases armor weight (`decrease`: 2.5%).
    - **Stamina Recovery**: Increases stamina regen rate (`increase`: 1.5%).
    - **Thaumaturgy Recovery**: Increases thaumaturgy regen rate (`increase`: 1.5%).
    - **Health Recovery**: Increases health regen rate (`increase`: 1.5%).

**B. Minor Modifications Traits (`modTraits`)**

These are randomly generated secondary stats added to mods based on the mod's rarity. Higher rarity mods get more minor traits. Each trait has a base effect (`increase` or `decrease`) which scales with mod rarity and level. They can also roll as `negative` (inverting the effect) and `specific` (applying a larger bonus but only under specific conditions, not fully implemented/clear).

- **Group 1 (Chance Weight 2)**: Focus on specific Ability vs. Ability interactions.
  - Thaumaturgy Critical Chance/Damage/Resistance/Defense
  - Thaumaturgy Evasion Chance/Defense
  - Thaumaturgy Accuracy/Accuracy Damage
  - Thaumaturgy Precision
  - Stamina Critical Chance/Damage/Resistance/Defense
  - Stamina Evasion Chance/Defense
  - Stamina Accuracy/Accuracy Damage
  - Stamina Precision
  - Physical Critical Chance/Damage/Resistance/Defense
  - Physical Evasion Chance/Defense
  - Physical Accuracy/Accuracy Damage
  - Physical Precision
  - Ranged Defense (Bonus vs. Ranged)
  - Melee Defense (Bonus vs. Melee)
- **Group 2 (Chance Weight 5)**: Focus on core resource stats.
  - Max Health/Stamina/Thaumaturgy
  - Health/Stamina/Thaumaturgy Recovery (Regen Rate)
  - Health/Stamina/Thaumaturgy Delay (Regen Delay Reduction)
- **Group 3 (Chance Weight 3)**: Focus on general Ability stats and defenses/offenses.
  - Stamina/Thaumaturgy/Physical Defense
  - Stamina/Thaumaturgy/Physical Damage
  - Stamina/Thaumaturgy Activation Time (Reduction)
  - Stamina/Thaumaturgy Duration (Increase)
  - Stamina/Thaumaturgy Cooldown (Reduction)
  - Stamina/Thaumaturgy Tenacity (Enemy Effect Duration Reduction)
- **Group 4 (Chance Weight 1)**: Focus on miscellaneous/utility stats.
  - Stealth Radius (Reduction) / Stealth Detection (Increase)
  - Movement Speed (Increase)
  - Health/Stamina/Thaumaturgy on Damage (Life/Resource Steal)
  - Health/Stamina/Thaumaturgy on Kill (Gain on Kill)
  - Stamina/Thaumaturgy Drain (Enemy Resource Drain on Hit)
  - Health Drain (% Max Health Damage Bonus)
  - Knockback Resistance (Increase)
  - Acceleration/Deceleration Time (Reduction)

---

## Section 3: Technical Implementation Analysis

This section provides a detailed analysis of the project's codebase, examining the server-side game logic, the core mechanics implementation, and the frontend web portal.

### I. Server-Side Logic (`gameServer.js`, `websocket.js`)

The server-side code manages game instances, handles client connections and communication within a game, and runs the core game simulation.

**A. Game Instance Management (`gameServer.js`):**

- **`NEW_GAME` Constructor**: Represents a single game instance/room. It's initialized with game configuration (`game` - including map, players), WebSocket utilities (`w`, `wss`), and callbacks for termination (`terminateGame`, `finishGame`).
- **Initialization**: Stores game map data, creates `Trooper` objects for each player (`buildTroopers`), initializes projectiles array, sets up `CollisionDetection`. Starts the game loop after a delay (`startGame`, `update`).
- **Game Loop**:
  - Runs at a fixed rate (`fps`).
  - Calculates delta time (`setDeltaTime`).
  - Updates the state of all troopers and projectiles (`updateGame`).
  - Checks for win conditions or game end conditions (`checkWin`).
  - Sends the updated state to all clients in the room (`sendUpdate`).
- **Termination**:
  - `checkWin` monitors trooper `alive` status and affiliation counts (`countAffiliation`). If only one affiliation remains, calls `gameOver`.
  - `checkWin` also checks for disconnected players (`countAffiliation`) or game timeout (`maxMinutes`). If conditions met, calls `endGame`.
  - `gameOver` records the winner, notifies troopers, and calls the `finishGame` callback.
  - `endGame` stops the game loop (`clearInterval`) and calls the `terminateGame` callback.

**B. Client Communication (`gameServer.js`, `websocket.js`):**

- **Input Handling**: `newInput` method receives player input from the WebSocket server and forwards it to the corresponding `Trooper` object using `getTrooper`.
- **Connection Management**: `disconnect` and `rejoin` methods update the `connected` status of `Trooper` objects. `check` verifies if a player is allowed to rejoin.
- **State Synchronization**: `sendUpdate` gathers data from all `Trooper` and `Projectile` objects (using their `.data` getters) and broadcasts it to all connected clients in the game's room using `w.sendToRooms`.
- **WebSocket Utilities (`websocket.js`)**: Provides helper functions for sending messages (`send`, `broadcast`, `sendToRooms`), managing room membership (`joinRoom`, `inRoom`, `leaveRoom`), handling keep-alive pings (`startPing`), and verifying client connections (`checkMessage`).

**C. Server-Side Game Logic (`gameServer.js` relies on `Trooper.js`, `Projectile.js`, `CollisionDetection.js`):**

- **Simulation**: The core `updateGame` function orchestrates the simulation tick:
  1.  Calls `prepare` on all troopers (updates delta time, processes input, updates status effects/abilities).
  2.  Calls `update` on all troopers (handles movement, combat, physics).
  3.  Calls `update` on all projectiles (moves them, checks collisions). Removes projectiles that hit or expire.
  4.  Calls `reset` on all troopers (clears temporary multipliers).
- **Object Management**: Maintains lists of `troopers` and `projectiles`.
- **Collision**: Utilizes the `CollisionDetection` instance (`CD`) passed to troopers and projectiles for checking interactions.

### II. Core Game Mechanics (Code Implementation)

These files define the fundamental objects and rules of the game world.

**A. Character (`Trooper.js`):**

- **Representation**: The central class representing a player character in the game world.
- **State**: Maintains extensive state including position (`x`, `y`, `z`), rotation (`rot`), dimensions (`w`, `h`, `d`), velocity (`velocity`, `speed`), core stats (HP, Stamina, Thaumaturgy objects), affiliation (`af`), alive/connected status, kills, killer info, equipped weapons (`gun`, `saber`), active abilities, status effects, input state, camera position/rotation, and animation state flags (jumping, falling, running, etc.).
- **Physics/Movement**: Implements gravity, acceleration/deceleration, jumping (including delayed jump and variable height based on hold), running, collision response (`boxCollision`), on-ground vs. in-air logic, knockback resistance. Movement speed is affected by base stats, weight (from stats and armor), and status effects/abilities.
- **Combat**: Handles taking damage (`damage` method), applying defenses, calculating critical hits and evasion. Tracks health (`hp`) and death state. Delegates weapon firing/blocking/striking to `Gun` and `Saber` instances. Triggers resource regeneration upon dealing damage or getting kills.
- **Resources**: Manages HP, Stamina, and Thaumaturgy, including maximum values, current values, regeneration rates, cooldowns after usage, and effects of abilities/status effects.
- **Abilities**: Manages the activation, execution, and cooldown of abilities based on player input and game state. Interacts with `AbilityEffect.js` for specific logic.
- **Status Effects**: Manages the application and updating of status effects via the `status` array, interacting with `StatusEffect.js`. Status effects modify multipliers (`troop.mult`) affecting speed, defense, damage, etc.
- **Data Serialization**: The `.data` getter packages essential state for network synchronization.

**B. Weapons (`Gun.js`, `Saber.js`, `WeaponBase.js`):**

- **Common Base (`WeaponBase.js`)**: Provides shared logic for managing firing cooldowns (`firingSpeed`), heat/resource management (`heat`), activation state, and tracking states for potential animation/sound cues. Supports optional overheat mechanics.
- **Ranged Weapons (`Gun.js`)**:
  - Handles ranged combat logic: firing projectiles, tracking heat, managing firing rate and spread.
  - Creates `Projectile` instances when firing.
  - Supports different weapon stats (damage, range, speed, heat properties) loaded from `initData`.
  - Integrates with `WeaponBase` for cooldown and heat management.
  - Supports special shots activated by abilities.
- **Melee Weapons (`Saber.js`)**:
  - Handles melee combat: striking and blocking.
  - **Striking**: Manages strike cooldowns, delays, applies damage within an arc using collision detection, handles knockback. Supports special strikes from abilities (`addStrike`).
  - **Blocking**: Manages block state, duration, parry window. Handles projectile reflection (`blockProjectile`), melee deflection (`blockSaber`), and potential Thaumaturgy blocking (`checkBlockThaum`) based on angle checks. Consumes stamina.
  - Integrates with `WeaponBase`, using stamina as the resource managed by the `heat` system.
- **Projectiles (`Projectile.js`)**:
  - Represents individual shots fired by guns.
  - Moves in a straight line (`update`).
  - Checks for collisions with obstacles or enemies (`CD.check`).
  - Applies damage to troopers upon collision, considering falloff (`getDistanceTravelledMult`) and potential blocks.
  - Tracks distance travelled and expires after exceeding `maxRange`.
  - Includes visual smoothing logic.

**C. Abilities and Status Effects (`AbilityEffect.js`, `StatusEffect.js`):**

- **Ability Logic (`AbilityEffect.js`)**: Contains the specific implementation for each ability, defining prerequisites, activation logic, per-tick updates, and end conditions. Interacts heavily with the `Trooper` object and `CollisionDetection`.
- **Status Effect Logic (`StatusEffect.js`)**: Defines how temporary buffs and debuffs modify a trooper's state or behavior over time. Typically modifies `troop.mult` properties or applies direct effects each tick.

**D. Physics and Collision (`CollisionDetection.js`, `MathVector.js`, `Trooper.js`):**

- **Collision Detection (`CollisionDetection.js`)**: Provides functions to check for intersections between different shapes (AABB boxes, planes, arcs) used for character movement, projectile hits, and ability areas of effect.
- **Vector Math (`MathVector.js`)**: Includes utilities for rotating vectors, normalizing angles, calculating directions, and normalizing movement vectors.
- **Trooper Physics (`Trooper.js`)**: Implements basic physics including gravity, acceleration, deceleration, jumping, air resistance (simplified), and collision response (stopping movement, setting `onGround` state).

**E. Map Generation (`mapBuilder.js`):**

- **Procedure**: Selects a map type, defines its obstacles and spawn points, and assigns spawn points to players based on affiliation.
- **Data Format**: Defines maps as arrays of obstacle objects and structured spawn position data.

**F. Web Configuration (`robots.txt`):**

- **Standard File**: Provides instructions for web crawlers.
- **Configuration**: Disallows access to a `/test` directory but allows crawling of all other content.

### III. Web Portal Frontend (`client.html`, CSS)

The `client.html` file serves as the entry point and primary structure for the game's user interface, specifically the main menu and character customization/management screens before entering the actual arena.

**A. HTML Structure and Metadata:**

- **Document Type**: Standard HTML5 doctype (`<!DOCTYPE html>`).
- **Head Section**:
  - **Title**: Sets the page title to "TWG Menu - Thunder Warrior: Genesis".
  - **Favicons**: Includes a comprehensive set of favicon links (`apple-touch-icon`, `icon`, `manifest`, `mask-icon`, `shortcut icon`) targeting various platforms and browsers, ensuring consistent branding. Also includes meta tags for Microsoft Tile (`msapplication-TileColor`, `msapplication-config`) and theme color (`theme-color`).
  - **Inline CSS**: Contains a large `<style>` block defining the visual appearance.
  - **JavaScript**: Links to external `clientWebsocket.js` and includes a substantial inline `<script>` block containing the primary client-side game logic for the menu system.
- **Body Section**:
  - **Basic Styling**: Sets a dark background color (`#010105`) and attaches an `onresize` event handler likely used for dynamically adjusting layout or canvas elements.
  - **Main Containers**: The core content is organized within several top-level `div` elements, each representing a distinct screen or major UI component:
    - `loadingPage`: Displays loading indicators while fetching initial data.
    - `classSelectionScreen`: Interface for initial character attribute allocation.
    - `homeScreen`: The main menu hub, displaying character, resources, and navigation.
    - `weaponPage`: Screen for viewing and managing weapons and modifications.
    - `abilityPage`: Screen for viewing and managing character abilities.
    - `shopScreen`: Interface for purchasing items, equipment, or currency.
    - `settingsScreen`: A modal overlay for account management and game options.
    - `rewardsScreen`: A modal overlay to display rewards earned.
    - `upgradeAbilityScreen`: Modal for selecting ability upgrades upon level-up.
    - `statsScreen`: Modal overlay displaying detailed statistics for equipment or abilities.
    - `gameModeSelectionBackground`/`gameModeSelectionTab`: UI for choosing the game mode to enter.
    - `tellScreen`: A generic modal for displaying informational messages to the player.
    - `descriptionBackground`: A pop-up element used to show tooltips/details about hovered items.
  - **Templates**: Utilizes HTML `<template>` tags (`purchaseTemplate`, `paymentScreenTemplate`, `classPointPurchase`, `classOptionTemplate`) for dynamically creating repetitive UI elements like shop items or purchase confirmation dialogs via JavaScript.
  - **Hidden Elements**: Many screens (`homeScreen`, `weaponPage`, etc.) are initially hidden (`visibility: hidden`) and are shown/hidden by JavaScript as the user navigates.
  - **IFrame**: Includes an `iframe` with `src='https://thunderwarrior.org/iframe'`, likely used for cross-domain communication, possibly for authentication or account data retrieval.
  - **Form**: Contains a hidden `form` (`startForm`) presumably used to POST data when transitioning from the menu to the actual game client.

**B. CSS Styling:**

- **Units and Responsiveness**: Extensively uses `vmin` (percentage of the smaller viewport dimension) for sizing and positioning, aiming for a UI that scales proportionally on different screen sizes. Font sizes, widths, heights, margins, padding, border-radius, and absolute positioning coordinates frequently use `vmin`.
- **Layout**: Primarily uses `position: absolute` for laying out screens and major components within the `homeScreen` container, which acts as a fixed-size viewport (`100vmin` x `100vmin`). Flexbox (`display: flex`) is used in specific areas like the `informationBar` resource displays and ability icon holders for centering and alignment.
- **Visual Appearance**:
  - **Color Scheme**: Predominantly dark blues, purples, and grays (`#010105`, `#05051a`, `#111133`, `#222266`, `#606087`) with highlights of white, yellow (`#eddd10`), green (`#079950`), and red. Creates a futuristic/sci-fi aesthetic.
  - **Gradients**: Uses `linear-gradient` and `radial-gradient` for button backgrounds (`coolButton`) and ability icon effects.
  - **Borders and Radius**: `border-radius` is used heavily to create rounded corners and circular elements (buttons, resource displays, ability icons, mod slots).
  - **Text**: Uses a sans-serif font, often white or light gray (`#ffffff`, `#cccccc`, `#777777`). Text styling includes size (`vmin`), alignment, justification, and transformations (uppercase).
  - **Transparency/Overlays**: Uses `rgba` colors and semi-transparent backgrounds (`#9a9a9a83`, `#66669aca`) for modal screens (`coverScreen`) to overlay content.
- **Interactivity & Animation**:
  - **Hover Effects**: Styles change on `:hover` for elements like buttons (`coolButton`), trait displays, purchase options, providing visual feedback.
  - **Cursors**: Explicitly sets `cursor: pointer` or `cursor: default` on many elements to indicate interactivity.
  - **Animations**: Uses CSS `@keyframes` (`spin`, `pulseAnimation`, `pulseAnimationBrighter`) for loading indicators and ability icon pulsing effects.
  - **Transitions**: Employs CSS `transition` for smooth changes in properties like `opacity` and `background-color`, particularly for ability unlock animations.
- **Specific Component Styling**: Provides detailed styling for almost every UI element mentioned in the HTML structure, including positioning, sizing, colors, borders, text styles, and image handling for elements like resource counters, character equipment slots, ability trees, shop headers/items, settings buttons, loading icons, stat tables, and pop-up descriptions.
- **Scrollbars**: Customizes the appearance of scrollbars using `::-webkit-scrollbar` pseudo-elements for elements like the stats screen.
- **User Interaction**: Disables text selection (`user-select: none`) for most elements to maintain a game-like interface.

### IV. Web Portal Client-Side Logic (`client.html` `<script>`, `clientWebsocket.js`)

The client-side JavaScript manages the user interface, handles user interactions within the menu, prepares data, and communicates with the server via WebSockets.

**A. Initialization and Authentication (`client.html`, `clientWebsocket.js`):**

- **Loading Sequence**:
  1.  `runGame` calls `loadGame` on window load.
  2.  `loadGame` checks for WebSocket support. If supported, it messages the iframe (`https://thunderwarrior.org/iframe`) to request account credentials (`getAccount`).
  3.  An `onmessage` handler listens for the response from the iframe.
  4.  If credentials (`username`, `password`) are received, they are stored, the iframe is removed, and `load` is called. If not, the user is redirected (`totalRedirect`).
  5.  `load` calls `createWebSocket` (defined in `clientWebsocket.js`) to establish the WebSocket connection.
- **WebSocket Connection (`clientWebsocket.js`)**:
  1.  `createWebSocket` establishes the connection and sets up event handlers (`onopen`, `onerror`, `onmessage`, `onclose`).
  2.  `messageWS` handles incoming messages. It performs an initial security check (`checkMessage`) involving a key exchange and timestamp verification.
  3.  If the check passes, a `ticket` is stored, and an 'account' message is sent (`sendAccount`) with credentials and the requested type (`gameMenu`).
  4.  Subsequent messages are checked against the ticket before being processed by `recieveAnyMessage`.
- **Data Loading (`client.html`, `clientWebsocket.js`)**:
  1.  The server responds to the 'account' message with a 'user' message containing `user` data, game `options`, and connection `status`.
  2.  `recieveAnyMessage` routes the 'user' message to `loadAll` in `client.html`.
  3.  `loadAll` stores the received `user` data (including trooper stats, equipment, abilities, resources) in the global `troop` variable. It checks if the user is already `inGame` and potentially triggers a rejoin (`rejoinGame`). It then initializes various game aspects: sets options, calculates default trooper values (`setDefaultTrooperValues`), defines equipment/weapon/armour stats (`loadEquipment`), sets up UI displays (`setImageDisplays`), constructs ability data (`constructAbilities`), and starts loading images (`createAllImages`).
- **Image Loading (`client.html`)**:
  1.  `createAllImages` initiates loading for numerous images (UI elements, equipment, abilities) using helper functions (`createSimpleImage`, `createBasicImg`).
  2.  It tracks loading progress (`imagesCreated`, `imageCount`) and updates the `loadStatus` element.
  3.  Once all images are loaded (`countImages` reaches `imageCount`), `continuePageCreationWithLoadedImages` is called.
- **Final Setup (`client.html`)**:
  1.  `continuePageCreationWithLoadedImages` sets up event listeners (`createEternalEvents`, `createHomeScreenEvents`), updates resource displays (`updateResources`), checks if character attributes need selection (`showClassSelectionScreen`) or proceeds to the main menu (`pageCreationWithClassSelected`), sets initial UI element sizes (`setImages`), and finally hides the loading screen (`hideLoadingScreen`).

**B. UI Management and Navigation (`client.html`):**

- **Screen Visibility**: Uses a global `onPage` variable to track the currently active screen. Functions like `showHomeScreen`, `hideHomeScreen`, `showWeaponScreen`, `hideWeaponScreen`, `showAbilityPage`, `hideAbilityPage`, `showShopScreen`, `hideShopScreen`, `viewSettings`, `closeSettings`, etc., manipulate the `visibility` style property of the corresponding `div` elements to switch between views.
- **Dynamic Content**:
  - **Templates**: Uses `<template>` elements and `cloneNode(true)` to generate lists of shop items, purchase options, and class attribute selectors dynamically.
  - **Resource Display**: `updateResources` function updates the text content of elements displaying credits, skill points, metal, crystals, experience, and player level, using `simplifyNumber` for large values.
  - **Character Display**: Updates `src` attributes of `img` elements to show equipped armor and weapons (`setDisplayImageSrcs`). Draws the character model onto a canvas (`drawFullCharacter`, `setCharacterBackground`). Updates stat displays (`setAbilityDisplays`).
  - **Tooltips/Descriptions**: `showWeaponDescription` and `showAbilityDescription` populate and position the `descriptionBackground` element with details about the hovered item, including stats rendered onto a canvas (`setDescriptionCanvas`). `hideWeaponDescription` hides it.
- **Event Handling**: Numerous `onclick`, `onmouseover`, `onmouseout`, `onkeydown`, `onresize` event handlers trigger functions to handle user interactions like button clicks, hovering over items, keyboard shortcuts, screen resizing, etc.

**C. Core Menu Logic (`client.html`):**

- **Class Selection**:
  - `showClassSelectionScreen` displays the attribute selection UI if `troop.built` is not "finished".
  - `buildClassSelectionScreen` dynamically creates the attribute selectors using the `classOptionTemplate`.
  - `modifyClassOption` handles increasing/decreasing attribute points, checking against available `classPoints`, calculating costs (`getNumCost`), updating visuals, and enabling/disabling buttons (`setClassAddition`, `setClassSubtraction`).
  - `selectClass` finalizes attribute choices (`setClassProperties`), sets default equipment (`setEquipmentDefaults`), marks `troop.built` as "finished", saves data to the server (`saveTraitToServer`), and transitions to the home screen.
- **Home Screen**:
  - Displays character, resources, equipment slots, and stat summaries.
  - Equipment slots are clickable (`onclick`) to navigate to the `weaponPage`.
  - Stat displays (`Stamina`, `Thaumaturgy`) are clickable to navigate to the `abilityPage`.
  - Resource displays are clickable (`onclick`) to open the relevant purchase screen in the shop.
  - "Enter the Arena" button (`gameTitle`) shows the game mode selection UI (`showGameModeSelection`).
- **Weapon/Equipment Page (`weaponPage`)**:
  - Displays details of the `selectedEquipment`.
  - Shows a list of available equipment/mods (`fullEquipmentArray`) of the same type in scrollable slots (`weaponSelectionBackground`). `setWeaponScreen` manages this display.
  - Allows equipping items by clicking (`updateWeapon`).
  - Allows deconstructing items (`deconstructMod` via backspace/delete key).
  - Allows viewing and managing equipped mods by clicking the large weapon image (`displayOrHideModOptions`), switching the view (`modsShowing`).
  - Navigation back to home screen (`showHomeScreen`).
- **Ability Page (`abilityPage`)**:
  - Displays the ability tree for either Stamina or Thaumaturgy (`setAbilityPage`). Allows switching between trees.
  - `createAbilityOption` dynamically generates icons for each ability.
  - Clicking an ability icon shows its description and status (`setAbilities`).
  - If unlocked, shows equipped slots (`setGameAbilities`) and allows equipping/unequipping via keyboard shortcuts (`equipAbility`).
  - If locked, shows prerequisites and costs. Allows unlocking if conditions are met (`setUnlockButton`).
  - Provides ability recommendations (`abilityAdviceText`).
- **Shop Page (`shopScreen`)**:
  - Tabbed interface (`purchaseHeaders`) for different shop categories (Weapons, Armor, Mods, Resources).
  - Functions like `weaponsShopScreen`, `armourShopScreen`, `purchaseCredits`, etc., configure the displayed items (`setShopSelection`).
  - Displays purchase options on canvases (`purchaseOption0`, etc.), rendered by `setShopScreen`.
  - Handles purchases (`makePurchase`), checking resource availability, deducting costs, adding items/resources (`recievePurchasedItem`), and displaying rewards (`showRewardsScreen`).
  - Handles crystal purchases by showing a payment screen template (`crystalPurchase`).
- **Settings/Modals**: Provides options for account management (linking out), logging out, resetting attributes (`resetAttributesPoints`), triggering ability upgrades (`selectAbilityUpgrade`), and closing the modal. `tell` function displays informational pop-ups.
- **Starting Game**: `showGameModeSelection` displays options. Clicking a mode calls `startGame`, which packages necessary data (`getGameData`) and uses `sessionStorage` and form submission (`joinGame`) to transition to the actual game client.

**D. Data Management (`client.html`):**

- **Global `troop` Object**: Holds all player-specific data received from the server (stats, resources, inventory, abilities, etc.).
- **Equipment/Ability Definitions**: Defines extensive static data for base equipment (helmets, bodies, legs, arms, ranged weapons, melee weapons), mods (multipliers, traits), and abilities (stamina, thaumaturgy) including their stats, costs, descriptions, prerequisites, etc.
- **Calculations**: Includes functions to calculate modified equipment stats based on mods (`getModifiedEquipment`, `modifyWeapons`, `modifyArmour`, etc.), calculate item power (`getPower`), calculate ability descriptions with dynamic values (`getAbilityDescription`), calculate costs (`getNumCost`), etc.
- **Server Synchronization**: Uses `saveTraitToServer` to send updates to the server via WebSocket whenever critical data changes (e.g., equipping items, unlocking abilities, spending resources, changing settings).

### V. Web Portal User Account Management System

The project features an exceptionally thorough account management system, covering every stage of the user lifecycle. The system is designed to be secure, user-friendly, and robust, with specific, clear error messages for nearly every possible user error or account status.

**A. Account Sign Up (Registration)**

The registration process requires a username, email, and a matching password/confirmation password.

**Validation and Error Handling:**

- **Empty Fields:** The system checks that the username, email, and password fields are not left empty.
- **Password Rules:** Passwords have a minimum length of 7 characters and are restricted to alphanumeric characters.
- **Username Rules:** Usernames have a maximum length of 20 characters and are restricted to alphanumeric characters.
- **Password Mismatch:** A specific error is shown if the "Password and Confirmation Password do not match".

**Account Conflict Handling:**

- **Username Taken:** If a username is already tied to an account, the user is prompted to sign in.
- **Email Taken:** Similarly, if an email is already in use, the user is asked if they would like to sign in.
- **Taken but Unconfirmed:** A unique state exists where a username is taken, but the associated email is unconfirmed. The user is advised to either confirm the account or choose a new username.
- **Banned Account:** If a user tries to create an account with a username associated with a banned or deleted account, they are informed and told to choose a different username.

**Success:**

- Upon successful creation, the user is informed that a confirmation code has been sent to their email, which they must use in the "Confirm Tab".

**B. Account Sign In (Authentication)**

The sign-in process allows users to log in using their credentials.

**Validation and Error Handling:**

- **Empty Fields:** The user is notified if "Neither the Username nor Password field may be left empty".
- **Incorrect Credentials:** A generic error message states that "Either the Usrname or Password entered is incorrect".
- **Account Status:**
  - **Unconfirmed:** If the account is not yet confirmed, the sign-in is successful but the user is immediately informed that a new confirmation code has been sent and they must confirm the account.
  - **Banned/Deleted:** Users with banned or deleted accounts are blocked from signing in and directed to the "Contact Us" page.
- **One-Time Password (OTP) Handling:** The system supports one-time use passwords (likely from the "Forgot Password" feature).
  - **Expired:** An OTP that is older than its one-hour lifetime will be rejected.
  - **Already Used:** An OTP that has already been used is also rejected.

**Success:**

- A simple success message is displayed: "You have succesfully signed in!".

**C. Account Confirmation**

This module is dedicated to users confirming their email address by entering a code.

**Validation and Error Handling:**

- **Wrong Code:** The system informs the user if the "Confirmation Code entered is either Incorrect or was not entered within One Hour of being sent".
- **Already Confirmed:** If the account is already confirmed, the user is notified and prompted to sign in.
- **Banned Account:** Banned accounts cannot be confirmed and are directed to "Contact Us".

**Resending a Code:**

- Users can request a new code. If the credentials they enter to do so are incorrect, they are informed that the "field is solely intended for resending a Confirmation Code to a Pre-Existing Account".
- A successful request for a new code is confirmed with the message: "You have been sent a new Confirmation Code".

**Success:**

- Successful confirmation is met with a welcoming message: "You have Succesfully Confirmed your Email Address. Time to Start Playing!".

**D. Account Recovery (Forgot Password/Username)**

This system allows users to recover their username or reset their password.

**Validation and Error Handling:**

- **Empty Fields:** The system requires both username and password fields to be filled to find the account.
- **No Account Found:**
  - If an email is entered that is not associated with an account, the system reports: "We could not find the account associated with the email entered".
  - If the username/password combination doesn't match, a similar error is shown.
- **Account Status:**
  - **Unconfirmed:** Unconfirmed accounts cannot use this feature and are directed to the confirmation tab.
  - **Banned:** Banned accounts are blocked and directed to "Contact Us".

**Success:**

- **Username Recovery:** The system confirms that the username "has been successfully found and sent to this account`s email".
- **Password Recovery:** The system sends a "one time use password" to the account's email and explicitly warns the user to "imediately use the management tab to change your password" after signing in. This OTP expires after one hour.

**E. Account Information Editing**

From the "Manage" tab, users can edit their username, email, and password.

**Validation and Error Handling:**

- **Empty Fields:** The user is informed that they cannot leave all fields empty.
- **Credential Check:** The user's _current_ credentials must be valid. If not, an error is shown: "Either the Usrname or Password associated with the logged in account are incorrect".
- **Password Rules:** New passwords must match the confirmation, meet the minimum length (7 characters), and contain only alphanumeric characters.
- **Username Rules:** New usernames must be within the maximum length (20 characters) and contain only alphanumeric characters.
- **Conflict Handling:**
  - **Username Taken:** "That username is already tied to an account. Choose another one".
  - **Email Taken:** "That email is already tied to an account. Choose another one".
- **No Change Detected:** The system prevents redundant updates.
  - "The entered username is the same as the username currently tied to this account".
  - "The entered email is the same as the email currently tied to this account".
  - "The entered password is the same as the password currently tied to this account".
- **Banned Account:** Banned accounts cannot be edited.

**Success:**

- **Standard Success:** A simple confirmation: "You have succesfully changed your account's information!".
- **Email Change Success:** If the email is changed, a special message is shown: "You have succesfully changed your account's information, including your email!" This message explicitly informs the user that they will receive a new confirmation code and must re-confirm their account.

**F. Account Preferences Management**

Users can also manage game preferences, such as graphics quality and FPS limits.

**Error Handling:**

- **Account Not Found:** A check is performed to ensure the account exists: "The Account associated with the current Username and Password Could not be found".
- **Banned Account:** Banned accounts cannot change preferences.

**Success:**

- Successful changes are confirmed, and a callback function is triggered to clear related `sessionStorage` items (e.g., `gamePixelRatio`, `homePixelRatio`, `fpsSlider`).

**G. Account Deletion & Banning**

The system includes functionality for account deletion and banning.

- **User-Initiated Deletion:** Users can delete their own accounts via the "Manage" tab, a process described as irreversible. An error message exists for when the account to be deleted cannot be found.
- **Banned Status:** As seen in every other module, a "banned" status (e.g., `signIn/banned.html`, `feedback/banned.html`, `rating/banned.html`) prevents any account activity and directs the user to "Contact Us."
- **Admin Banning Tool:** A "Deletion Code" module exists, which appears to be an administrative tool. It includes messages for "account has been succesfully banned", "This code is either tiped incorrectly", and "This account is already confirmed". This suggests a system for admins to ban accounts using a code, possibly one sent to a user's email.

**H. Game Error Handling**

A dedicated set of messages (`startGameMessage`) handles all errors related to joining a game.

- **Account Status Errors:** Users are blocked if they are not signed in, unconfirmed, or banned.
- **Session Errors:**
  - **Already Signed In:** If the account is already in a game, the user is asked if they want to "kick out the other user".
  - **Disconnection:** Specific messages exist for generic disconnection and disconnection with a redirect.
  - **Failed Rejoin:** A message is shown if a user "failed to rejoin the game".
- **Match End:** A message gracefully explains the match ended "either because one team has already won or because the match has exceeded the maximum duration".

---

## Section 4: Project Development & Community

This section analyzes the project's development history, UI/UX evolution, technical infrastructure changes, and community feedback mechanisms, based on developer communications.

### I. User Interface (UI) & User Experience (UX) Evolution

The project files reveal a significant and ongoing effort to refine the game's UI and UX, both on the website and in-game.

**A. Web Page Redesign**

The entire website has been "completely revamped".

- **Navigation:** A new persistent "bar that stays at the top of the screen," a new menu on the right, and an account management dropdown accessible by hovering the profile icon or username.
- **New Pages:** "About," "How to Play," and "Credits" pages were added.
- **Technical:** Images were "completely optimized for maximum quality and incredibly reduced loading delays".

**B. Home Page Remodeling**

The game's main "Home Page" (the user's dashboard) was also redesigned for easier customization.

- **Preview Screen:** A central element shows a preview of the player's Thunder Warrior with all equipped gear.
- **Equipment Icons:** Icons for each equipment slot "surrounding the preview... can be clicked on to get to... the Equipment Screen."
- **Information Bar:** Displays the player's affiliation, username/email, resources (Credits, Metal, Experience), and quick-access buttons to "Settings" and "Shop".

**C. In-Game UI ("Information Update")**

An "Information Update" was released to display more data to players in-game.

- **Status Bars:** Hitpoints, Stamina, Thaumaturgy, and Weapon Heat bars now show "exact values stating their current status and maximum value."
- **Equipment Stats:**
  - **Hover-Over:** Hovering over equipment shows key stats (damage, firing speed, range, defense, weight, etc.).
  - **Detailed View:** Clicking equipment from the home menu reveals an info icon (?) that opens an "extended list of sometimes over twenty diferent stats".

### II. Technical Infrastructure & Development Pipeline

The news articles provide rare insight into the project's backend architecture, development pipeline, and future plans.

**A. Server Architecture & Performance**

A "Server is Completely Revamped" update was announced to address lag.

- **The Change:** "We have moved client side data updating function over to the server."
- **New Model:** "The only thing the client now does is render the images."
- **The Result:** "lag is greatly reduced" and the delay between button press and on-screen action is "practivally nonexistant". This signifies a move from a client-authoritative model to a server-authoritative model, crucial for a multiplayer game.

**B. 3D Graphics & Animation Pipeline**

The team is in the process of a major graphical overhaul, moving from 2D to 3D.

- **Character Creation Process:** A detailed article, "How We Create Our Characters", outlines their 5-step pipeline:
  1.  **First Steps:** Idea and lore-fitting.
  2.  **Design:** Drawing board and reference images.
  3.  **Modelling:** Building the character in 3D modeling software, adding textures, colors, and animations.
  4.  **Customizability:** The model is split into parts (head, torso, arms, legs, weapons) so they can be "seperately applied to a Thunderwarrior."
  5.  **Implementation:** Thousands of images are taken of the 3D model from different angles and animation states. These are loaded and combined in-game to create the player's custom character.
- **3D Weapons:** An update, "Weapons are Now 3D", details replacing old 2D rotating sprites with 3D models that the character will "actually hold."
- **3D Animations:** A "Work Begins on 3D Animations" article confirms the move to a fully 3D game, emphasizing that the new 3D parts are being designed to "all fit with all others" to maintain customization.
- **Animation Improvement:** An "Improved Animations" article discusses efforts to use "more realistic and lifelike movements" and fix clipping issues ("a gun going into the hand holding it").

**C. Project Status & Future Work**

- **Current Status:** Open Beta.
- **Community Sentiment:** The developers report that "Comunity Investment is at an All-Time High" and "feedback is still mostly positive" even during lulls in updates.
- **Announced Future Work:**
  - **User Interface Redesign:** A "groundbreaking update is about to be released".
  - **"Something Big":** The team is "working harder than ever" on "something really big coming up".
  - **Ongoing 3D Conversion:** The team is still working on swapping out more weapons and animations to 3D.

### III. Community & Feedback Systems

The project maintains a strong focus on community data collection through three separate systems, plus a public contact form. All systems (except "Contact Us") require the user to be signed in and confirmed.

**A. Feedback System**

Used for submitting bugs, ideas, and general feedback.

- **Validation:** Checks for empty "Topic and Message" fields.
- **Account Checks:** Blocks users who are not signed in, unconfirmed, banned, or "not found".
- **Spam Prevention:** A rate limit is in place: "we only allow one Feedback Message to be sent once per Five Minutes".
- **Success:** "You have succesfully submitted feedback!".
- **Debug/Admin:** Two unusual messages exist: "Failed to reset account" and "Succesfully reset account to default values", suggesting a hidden admin function on the feedback page to reset an account.

**B. Rating System**

A simple 1-5 star rating system.

- **Validation:** "The Rating must be within the range of one to five".
- **Account Checks:** Blocks users who are not signed in, unconfirmed, banned, or "not found".
- **Functionality:** Users can submit a new rating, update their existing rating, or delete their rating. Error messages exist if no rating is found to update/delete.

**C. Review System**

A more detailed review system with a title and message body.

- **Validation:** Checks for an empty title and an empty message.
- **Account Checks:** Blocks users who are not signed in, unconfirmed, banned, or "not found".
- **Functionality:** Users can submit a new review, update their review, or delete their review. An error exists for "no review associated with this account".

**D. "Contact Us" System**

A public-facing form, likely for users who cannot sign in (e.g., banned users).

- **Validation:** It requires a First Name, Last Name, Email, Topic, and Message.
- **Success:** "You have succesfully sent us a message!".

---

## Section 5: Conclusion

The provided codebase and message files provide a uniquely comprehensive blueprint of the "Thunder Warrior: Genesis" project. This is not a simple game, but an ambitious, large-scale web application with a deep and nuanced architecture.

The project's strengths lie in its:

1.  **Extraordinarily deep customization systems,** which are clearly the central design pillar.
2.  **A secure, robust, and user-friendly account management system** with specific error handling for every conceivable state.
3.  **A transparent and active development process,** communicating technical changes (server revamps, 3D pipelines) and content updates (new planets, melee weapons) directly to the players.
4.  **A strong emphasis on community feedback,** with no fewer than four separate channels for users to communicate with the development team.

The project is currently in a critical and exciting phase: transitioning to a more robust authoritative server architecture, overhauling its entire graphics engine from 2D to 3D, and preparing for another major UI redesign, all while in an open beta. The data collected indicates a mature, well-planned, and feature-rich gaming project.
