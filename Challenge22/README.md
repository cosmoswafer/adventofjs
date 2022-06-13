# Day 22 - Credit Card form

![Advent of JavaScript](screen.gif)

## Challenge

**Users should be able to:**

-   When the user finishes (blur) entering a credit card number, change the credit card image to match the type of card they entered. You can add a class of `visa`, `mastercard`, `discover`, or `american` to line 16 in index.html
    -   American Express cards always begin with the number 3- more specifically 34 or 37
    -   Visa cards begin with the number 4.
    -   Mastercards start with the number 5.
    -   Discover Cards begin with the number 6.
-   When the user enters the CVV number, have the card flip over by adding a class of `flip` on line 16 in index.html

## Write-up

### CSS

-   Using CSS flex box layout to create the form
-   Group the expiration date and give them flex 2
-   Thus CVV box will be 1/3 width
-   And set the input box-sizing to border-box, to assign the correct width
-   Set the card content to absolute position to draw text on background
-   Set the credit card background to 100% width, and set the left and right margin of the card to auto, to make the credit card center on the page
-   Set the card number background to gradient colour
-   And put a copy of the card number as shadow behind it
-   Use transform transition to create flip card animation

### JavaScript

-   Validate the input and update the credit card contents
