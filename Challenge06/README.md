# Day 6 - Computer Keyboard

![Advent of JavaScript](screen.gif)

## Challenge

**Users should be able to:**

-   Move the knob on the range
-   Move the knob on the range and the dollar amount above it will update.

## Write-up

### CSS

User rem unit to define the font-size is better then using px. By default most of the web browser is using 16pt as the root font-size.

We used some pseudo elements to locate the knob element. And added the colour on it.
The border line outside of the knob is done by using outline since border width will consume the inner space of the knob.

One tricky thing is the progress bar.
It could be done by using pseudo element in Firefox, but not available on Google Chrome.

### JavaScript

We should use the right event to update our price, here is the _input_ event.
If using _chang_ event, it will be fired just after we _changed_ the input, not while it was changing.
