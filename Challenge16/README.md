# Day 16 - Star Rating

![Advent of JavaScript](screen.gif)

## Challenge

**Users should be able to:**

-   See five star outlines
-   When the user hovers over the first star, it changes into a solid star
-   When the user hovers over the second star, it shows the first and second star as a solid star.
-   When the user hovers over the third star, it shows the first, second, and third star as a solid star.
-   When the user hovers over the fourth star, it shows the first, second, third, and fourth star as a solid star.
-   When the user hovers over the fifth star, it shows the first, second, third, fourth, and fifth star as a solid star.
-   hover to select a star rating

## Write-up

### CSS

-   Used the `~` CSS selector to select preceded elements, i.e. the star after that hover star
-   We can combine attribute to simplify the rules
-   CSS rules could only apply to inline SVG elements
-   Used symbol element in SVG to insert the shape, and then reference by use tag
-   Since the given SVG's viewbox didn't cover the stroke width, we should set the viewbox a little bit larger
-   The actual element is in the symbol tag, we should set the viewbox on it
-   Created two set of selectors, one for hover, another one for selected star
-   Put the five stars in flex layout

### JavaScript

-   If user click a star, we mark it *selected*, and clean up other *selected* stars
-   If user click a *selected* star, remove it from *selected*
-   Highlighting will be taken care by CSS


