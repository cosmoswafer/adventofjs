# Day 9 - Image Carousel

![Advent of JavaScript](screen.gif)

## Challenge

**Users should be able to:**

-   The featured image is centered horizontally and vertically within the content area.
-   The image's photo credits should appear as a caption, below the featured image. (content within the STYLE-GUIDE.md inside the project starter files)
-   Click on the next button to advance the featured image to the next image, listed in the thumbnails.
-   Click on the previous button to change the featured image to the previous image in the carousel
-   The thumbnails at the bottom should scroll horizontally and highlight the selected image.
-   toggle left and right through the image thumbnails
-   click an image to select it manually

## Write-up

### CSS

Set the _object-fit_ CSS rule on the thumbnails, to make it as a square.
We use outline to draw the border on selected thumbnail, with negative offset to shift it inside of the box.
The thumbnails are radio buttons, not links.
Its performance is a little bit slow in Google Chrome.
We hide the radio input by using absolute position, thus we can use JavaScript to focus on it.

### JavaScript

Since we used radio input elements, the JavaScript part is much easier.
Just update the featured image by change event.
While selecting the images by the left and right arrows, we should maintain the index wihting the range.
First we compute the new index by adding the offset.
Then do the modulo to ensure the new index is within the range.
If the new index is negative, we shift it to count down from the maximum.
