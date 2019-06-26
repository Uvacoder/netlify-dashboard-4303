<template>
  <div class="layout">
    <slot />
  </div>
</template>

<style>
:root {
  --black: #1b2b34;
  --teal: #5fb3b3;
  --teal-dark: #59a9a5;
  --grey: #d8dee9;
  --grey-dark: #a4acb9;
  --red-light: #ed6f7d;
  --red: #b3545e;
  --white: #fff;
}
body {
  background: #f3f4f5;
  font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.5;
}

.flex {
  display: flex;
}
.justify-between {
  justify-content: space-between;
}
.items-center {
  align-items: center;
}

.layout {
  max-width: 760px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
}
@supports (padding: max(0px)) {
  .layout {
    max-width: 760px;
    margin: 0 auto;
    padding-left: 20px, env(safe-area-inset-left);
    padding-right: 20px, env(safe-area-inset-right);
  }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  height: 80px;
}

.nav__link {
  margin-left: 20px;
}
</style>
