# Day 12 - Rock, Paper, Scissors Game

![Advent of JavaScript](screen.gif)

## Challenge

**Users should be able to:**

-   Select rock, paper, or scissors
-   On a second page, they should see "you win" or the "computer wins." This page should also display the choices that the user and computer made, as well as, a button to play again.

## Write-up

### CSS

The most tricky technique is mix-up the png with the svg background.
Here we used the `mix-blend-mode` to implement it.
The png images has white background, we don't need to remove their background manually.
We can use CSS to merge them together.

The page layout was using grid, nothing special.

### JavaScript

Two points:

1. I implemented a router in pure JavaScript to switch pages
2. There is a centralized store for pages to exchange data

The singleton router is built on top of the anchor url.
It will be listening on the `hashchange` event, and render the selected page.

And the store will notify all registered pages, to update their data.
Thus while the browser is showing the result page, it will render all contents automatically.
