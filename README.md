# ➿REW-p5
Porting and upgrade of [REW](https://github.com/danieledep/REW) game from Processing to P5.js.
A new chapter of the same music cassette whose tape keeps unrolling out of place until some brave spinning wheels will find its way to harness the tape. It has performance issues to fix.

## Controls
- <kbd>&#8592;</kbd> or <kbd>A</kbd> to make the wheel turn left
- <kbd>&#8594;</kbd> or <kbd>D</kbd> to make the wheel turn right
- <kbd>&#8593;</kbd> or <kbd>W</kbd> to eject a new wheel   
- <kbd>Space</kbd> or <kbd>Left click</kbd> to pause/unpause the game   
- <kbd>R</kbd> to take a screenshot


![screenshot](https://github.com/danieledep/REW_P5/blob/master/assets/Screenshot-10-11-2021.png)

## To-dos
- [x] add record button ⏺ to save a screenshot
- [ ] move score text to canvas
- [ ] fix spacebar flickering (debouncing)
- [x] make controls work well on mobile
- [x] fix bouncing direction bug
- [ ] switch --controlsColor to --backgroundColor 
- [ ] when intersecting tape update tape also for wheel n-1 and n+1
- [ ] fix performance issues when there are lots of wheels, compare with [this algorithm](https://github.com/davidfig/intersects/blob/master/line-circle.js)
- [ ] wheel speed should go faster as game advance
- [ ] add sound effects
- [ ] build hardware controller

