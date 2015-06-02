# drag-animination
A javascript app for creating draggable animation frames.
It takes the image prefix (e.g. /img/anim/frame_img), the image count, the image type (.jpg, .png ...) and the drag frame speed.
It preloads the images - e.g. from /img/anim/frame_img000.jpg to /img/anim/frame_img112.jpg and goes through the frames when dragged. 

# Usage
Include the css&js.

Create a div with the "drag-animation" id wherever you want your drag animation to be.
```html
  <div draggable="false" id="drag-animation"></div>
```
Create the drag animation class
```js
  new DragAnimation(<images_prefix>, <image count>, <image type> ,<drag frame speed>);
```



