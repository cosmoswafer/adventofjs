# Day 13 - Custom Modal

![Advent of JavaScript](screen.gif)

## Challenge

**Users should be able to:**

-   Click on a point on the image, that triggers the modal
-   Click on the x within the modal to close the modal

## Write-up

### CSS

-   Grid layout to build the modal contents
-   Flexbox to quickly center both horizontally and vertically
-   Set margin both left and right to auto can center an element
-   CSS animation to buld the spot reaction in two steps
-   First keyframe is zoom out, second is fade out
-   Load external image within svg element

Remarks: We have to remove the hidden target nodes, and the background jpg image, then export the svg from figma. Otherwise the svg file is very large and unable to edit.

### JavaScript

Simply bind two events to toggle the modal show or hide.
