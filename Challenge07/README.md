# Day 7 - Tip Calculator

![Advent of JavaScript](screen.gif)

## Challenge

**Users should be able to:**

-   Input a different bill amount and number of people.
-   Select a percentage to tip. Only one percentage can be selected at a time.
-   calculate the tip based on tip percentage, bill amount, and number of people.

## Write-up

### CSS

Haveily used grid layout in this CSS project.
Front size are set with rem unit.
Some spacing are relative by using em or rem unit.
Using relative design will be better if users scale the web page, the elements will be sitting on the right position.

The radio buttons are done by similar technic in previous challenge.
We hide the radio input, and make the lable looks like a button.

I forgot to use input element for the bill amount and number of people input.
Thus I set the span element editable and just let it stay there.

### JavaScript

Pretty easy and straitforward. Nothing special.
Converting the text from input string to numbers, and put them back in two decimal place, by the `toFixed()` API.
