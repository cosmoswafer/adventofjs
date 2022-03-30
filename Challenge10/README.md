# Day 10 - Verification Code Form

![Advent of JavaScript](screen.gif)

## Challenge

**Users should be able to:**

-   Enter a 4 digit authorization code into the input fields.
-   Type in a digit and automatically be taken to the next input
-   Paste in a 4 digit code

## Write-up

### CSS

Simply copy all styles from Figma.
The Verification Code boxes were created by unorder list, 
with 'contenteditable' attribute.
We can change their outline to set the colour when user focused on one of them.

### JavaScript
