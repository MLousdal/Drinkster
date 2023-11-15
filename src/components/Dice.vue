<template>
  <div class="dice">
    <div class="side one"></div>
    <div class="side two"></div>
    <div class="side three"></div>
    <div class="side four"></div>
    <div class="side five"></div>
    <div class="side six"></div>
  </div>
</template>
<style>
.one {
  transform: translateZ(.5em);
}
.two {
  transform: translateX(-.5em) rotateY(-90deg);
}
.two:before {
  background: transparent;
  box-shadow:
    currentColor -.25em -.25em,
    currentColor .25em .25em;
}
.three {
  transform: translateY(.5em) rotateX(90deg);
}
.three:before {
  box-shadow:
    currentColor -.25em .25em,
    currentColor .25em -.25em;
}
.four {
  transform: translateY(-.5em) rotateX(90deg);
}
.four:before {
  background: transparent;
  box-shadow:
    currentColor -.25em .25em,
    currentColor -.25em -.25em,
    currentColor .25em .25em,
    currentColor .25em -.25em;
}
.five {
  transform: translateX(.5em) rotateY(90deg);
}
.five:before {
  box-shadow:
    currentColor -.25em -.25em,
    currentColor -.25em .25em,
    currentColor .25em -.25em,
    currentColor .25em .25em;
}
.six {
  transform: translateZ(-.5em);
}
.six:before {
  background: transparent;
  box-shadow:
    currentColor -.25em -.25em,
    currentColor -.25em 0px,
    currentColor -.25em .25em,
    currentColor .25em -.25em,
    currentColor .25em 0px,
    currentColor .25em .25em;
}
</style>
