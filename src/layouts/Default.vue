<template>
  <div class="container my-0 mx-auto max-w-4xl w-full">
    <slot />
  </div>
</template>

<style>
body {
  background: theme('colors.grey-light');
  color: theme('colors.black');
  font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.5;
}

.container {
  padding: theme('spacing.6');
}
@supports (padding: max(0px)) {
  .container {
    padding-left: max(theme('spacing.6'), env(safe-area-inset-left));
    padding-right: max(theme('spacing.6'), env(safe-area-inset-right));
  }
}
</style>
