# little terminal cv

Try it yourself, would be more fun than a gif

```bash
npx hero-protagonist
```

![](demo.gif)

I wanted to do one using the ideas behind this
[three.js terminal renderer](https://github.com/zz85/threejs-term), but I'm
working in another project rn

For DRY and improving the code I could:

- Make a Controller class which dependency injects the slides (which, luckily,
  their layout it's defined at declaration time, via parent and size /
  positions) and encapsulate the current 'slide' count and their traversal
  - Construct the on/off switch for curr,prev slides dynamically
  - Add an addException method, for slides who need a more complex transition
    than hiding the previous and next ones, and showing the current.
- Make a little 'size/position' function who returns an object with top,left,
  width, heigth properties, an deconstruct it into the blessed objects.
- Use more the 'shrink' property could potentially improve the responsiveness
  and depend less on fixed positions.
