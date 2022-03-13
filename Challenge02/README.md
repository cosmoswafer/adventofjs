# Day 2 - an eCommerce component

## Overview

![Advent of JavaScript](https://coachtestprep.s3.amazonaws.com/direct-uploads/user-117025/606c2525-ca81-4d85-ac27-164a86df3194/Twitter%20post%20-%201.png)

## Challenge

**Users should be able to:**

- View the plates on the left side of the screen and add them to your cart on the right side.
- When there are no plates within your cart, you should see a message that says, "Your cart is empty."
- When a plate is added to your cart, the Subtotal and Totals will automatically update.
- When products are in your cart, you should be able to increase and decrease the quantity.
- A user should not be able to mark the quantity as a negative number.
- If the quantity goes down to 0, the user will have the option to delete or remove the product from their cart entirely.
- Tax is based on the state of Tennessee sales tax: 0.0975

## Write-up

### CSS

Used concepts:

* Grid layout 
  * Sometimes could replace flex layout
* Flex layout to quickly center image and text
* Absolution position to place image with offset
* The calc function to compute values 

Most of the elements were using grid layout. 
When trying to center different elemnets, e.g. images and text, flex layout is the easier wayt.
If we want to vertically center text, using line height is the easiest method.

### JavaScript

Seems using JavaScript template string to render the entire cart is easier.
However, rendering large HTML code supposed is slower.
Therefore I use DOM methods to update the individual element in cart.

I used the Mediator design patter here.
When updating cart items, they will notify the parent cart object to update subtotal.
Similar behaviour in the menu items as well.
