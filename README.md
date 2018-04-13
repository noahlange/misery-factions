# Misery: Faction Warfare
This is a *very* work-in-progress playtesting program for an RPG I'm working on. It's a simulation of an adaptation of a skirmish ruleset written for character combat, adjusted to model faction-level conflict.

At some point, I hope to be able to (accurately) abstract combat so turns can be executed faster, or allow GMs to execute things more in-depth (as desired). You obviously don't need the nitty-gritty action resolution for something happening at the other end of the gameworld, but when it's within spitting distance of the PCs, the granularity is more important. (And when the PCs are directly involved, you can just shrink down to the skirmish combat of the base game.)

## Factions
Factions share most of the same characteristics as characters. If you can play a character, you'll know how a faction works. Just like characters level as they gain experience, factions level up too — their depth of Skills, breadth of Abilities and ability to field Resources grow.

## Resources
Currently the only resources measured here are infantry squads. These are generated based on the Faction (with its base Attributes, Skills, etc.) and the Rank of the squad. A high-rank squad will cost more than a squad of lower rank, but are significantly more powerful — 6 squads of 2 RP rookies pitted against 1 squad of 12 RP legends have about 50:50 odds of victory.

Eventually I'd like to extend this to Hinds and BTRs and all sorts of fun things, but I'm mostly focused right now on tweaking the faction/unit balance.

## Encounter resolution
Combat encounters between resources can be resolved either quickly or accurately, depending on the desired scope.

### Fast
Roll `1d10 + faction level + unit count + sum RP` and compare to other the other side's roll.

### Accurate
Combat rounds are fairly simple, which is good because hoo boy, there are a lot of them.

- An attack roll for a unit is equal to `1d10 + Force + (DEX - 5)`.
- A defense roll for a unit is equal to `1d10 + Evasion + (AGI - 5)`.

Count the degrees of success for a roll based on the difference between the rolls and the attacking unit's Spread score. For example -

- A 15 vs. 10 on a Spread of 1 would mean a hit at 15, 14, 13, 12 and 11.
- A 15 vs. 10 on a Spread of 4 would mean a hit at 15 and 11.

Subtract the defending unit's DR from the inflicted damage (effectively determined by the unit's RP). This leftover damage goes straight to the other unit's RP.

When a unit reaches 0 RP, it's game over for that unit. The unit rolls for damage and inflicts that much Morale damage onto its allies (of course, subtracting the defending unit's Morale DR). This can have a cascading effect, where the elimination of one powerful unit can indirectly eliminate a number of weaker units.

> Some factions (e.g., Monolith) are immune to Morale damage. Others, like Bandits, are especially susceptible.

When one side eliminates or routs all units on the other, they win.

## Issues
You may get combat encounters that take dozen of rounds to resolve. This will typically happen when you field a large group of weak units against a small group of powerful units, or two sides with units of equivalent combat ability (2x Bandits vs. 2x Loners)

I'm still tweaking things. Feel free to file an issue if you have feedback.