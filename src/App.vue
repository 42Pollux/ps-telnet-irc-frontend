<template>
  <div id="app">
    <Chat/>
  </div>
</template>

<script>
import Chat from "./components/Chat";

export default {
  name: 'app',
  components: {
    Chat
  },
  data: function () {
    return  {}
  }
}
</script>

<style>
  @font-face {
    font-family: dosFont;
    src: url(assets/fonts/dosFont.ttf);
  }
  #app {
    background-color: black;
    color: rgb(187,187,187);
    font-family: dosFont;
    font-size: large;
  }
  body {
    background-color: black;
  }
</style>
