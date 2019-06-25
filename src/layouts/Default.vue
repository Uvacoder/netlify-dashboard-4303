<template>
  <div class="layout">
    <slot />
  </div>
</template>

<style>
:root {
  --black: #1B2B34;
  --teal: #5FB3B3;
  --teal-dark: #59A9A5;
  --grey: #D8DEE9;
  --grey-dark: #A4ACB9;
  --red-light: #ed6f7d;
  --red: #B3545E;
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
