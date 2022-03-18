# Advent of JavaScript and CSS

The solutions of:

- [Advent of JavaScript](https://www.adventofjs.com/)
- [Advent of CSS](https://www.adventofcss.com/)
- [Podia site](https://store.selfteach.me/login) of the challenges

## Reference

### Screencast

I used the Gnome built-in screen recorder, which could be access from keyboard shortcut Ctrl+Shift+Alt+R.
The recorder will save the screencast in webm format, full screen size.
Then we can use _ffmpeg_ to crop the video and convert it into gif format.

```
$ ffmpeg -i input.webm -filter:v "crop=2550:1594:730:367" output.webm
$ ffmpeg -i output.webm -vf "fps=10,scale=1280:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -loop -1 output.gif
```
