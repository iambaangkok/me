---
title: "CookCook Dev Log #1"
date: 2026-04-18
rank: 0
summary: First dev log for CookCook — concept, timeline, playtest prep, how the cards are built with an upgraded generic Card Maker, and a few preview images.
description:
toc: true
readTime: true
autonumber: true
math: true
tags:
  - board-game
  - dev-log
  - CookCook
showTags: true
hideBackToTop: false
---

# Working on a Card Game! CookCook: Soups n' Curries

## Overview

**CookCook** (full working title **CookCook: Soups n' Curries**) is a light **2–4 player** card game about cooking Thai soups and curries. Each player holds **Menu** cards (dishes to complete) and collects **Ingredient** cards from a shared **Market** and deck. On your turn you **Gather** (buy from the market or take a free draw), then you can **Cook** by discarding ingredients that match the Menu’s requirement lines.

Ingredients use two ideas at once: a broad **Type** (the category the kitchen cares about for a normal cook) and a specific **Name** (the exact item on the card). A **normal cook** cares about Types (and any OR / “any Name of Type” wording on the card). A **perfect cook** asks for matching **Names** on **Signature** lines, scores the higher VP, and uses the perfect effect instead of the normal one — so there is a clear “good enough dish” path and a “chef’s special” path without reading a huge rulebook.

The design goal is something **quick to teach** and **easy to read at the table**, in the same spirit as small-box games like *Sea Salt & Paper*, but with a food theme and a bit of engine flavor from menu effects.

## When I started, how long it’s been, and where things stand

I put the project on the calendar in **March 2026**: the CookCook repo’s first commit landed on **1 March 2026** (“initial rules”). From there through **mid‑April 2026** the rulebook, ingredient/menu data, and card layouts have been iterating — including tighter **Type + Name** rules, **normal vs perfect** cooks, and deck targets aligned with Card-Maker.

So as of this post (**18 April 2026**), the game has been in active rules-and-cards work for **about seven weeks**.

**Right now** the prototype is in **playtest prep**: card images and TTS-oriented decks are being assembled, and the next step is to run sessions both in **Tabletop Simulator** and at a **real table** with printed cards. Internal playtest notes and session templates are already sketched in the design repo so feedback has somewhere to land.

## Card Maker (FLATLINE → generic → CookCook)

The art you see below is not a one-off export from a throwaway template. **Card Maker** started life as tooling for [**FLATLINE**](/me/boardgames/24-10-26-flatline-dev-log---card-maker/) — weapon boards, tiles, and card frames — and I have since **upgraded it toward a generic pipeline**: per-game **data** (YAML), **HTML layouts**, and **project** config live side by side, and the same app now renders **CookCook** menus and ingredients as well (Types/Names, deck counts on ingredients, Menu_2 layout, and so on).

That matters for CookCook because the rulebook and spreadsheets are not the only source of truth — **the printed card has to match** what players are taught. Keeping one Card Maker stack for multiple games means fixes to export, typography, or batch rendering benefit every project hooked into it, instead of maintaining a separate fork per game.

## Card preview

A couple of **Menu** cards and **Ingredient** cards from the current export set:

**Tom Yum** (Menu)

![menu_2_tom-yum.png](</image/boardgames/CookCook/menu_2_tom-yum.png#small>)

**Green Curry** (Menu)

![menu_2_green-curry.png](</image/boardgames/CookCook/menu_2_green-curry.png#small>)

**Lemongrass** (Ingredient — Aromatics)

![ingredient_4_aromatics-lemongrass.png](</image/boardgames/CookCook/ingredient_4_aromatics-lemongrass.png#small>)

**Curry paste** (Ingredient — Spice base)

![ingredient_4_spice-base-curry-paste.png](</image/boardgames/CookCook/ingredient_4_spice-base-curry-paste.png#small>)

You can **right click → Open image in new tab** if you want a closer look at the layout.

## Gallery

{{< image-gallery gallery_dir="/image/boardgames/CookCook" show_image_title="false" >}}
