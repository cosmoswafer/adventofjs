# Day 11 - Expanding and Collapsing Sections

![Advent of JavaScript](screen.gif)

## Challenge

**Users should be able to:**

-   Set a class to display the collapsed or expanded section.
-   Click on a collapsed question to expand it and view the answer.
-   Click on a collapsed answer to collapse it and hide the answer.

## Write-up

### CSS

Draw all element by fix dimension, copied from Figma.
And use absolute position to set offset to the floating images.
We have two sets of variable in different scope.
Under the expand scope, it will apply another set of varibales to change the interface.

Added CSS transition thus when it changes its CSS class users can see the animations.

### JavaScript

On the click event, we can use the `currentTarget` to access out element
which we binded the event.
Normally the `target` property is the element which user clicked,
not the parent element which was binded.

Another tricky point is how to implement the collapse/expand animation.
Here I use the `max-height` to change the element's height.
At the begining, the CSS rules applied zero height on each full text box.
We can use JavaScript to change their max-height to implement the collapse/expand actions.
The expand height values could be computed from the `scrollHeight` property using JavaScript.
This property is the full height of a element including those overflow area.
