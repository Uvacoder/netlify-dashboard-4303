<template>
  <div class="layout my-0 mx-auto p-6 max-w-4xl w-full">
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
  @screen dark {
    background: theme('colors.black');
    color: theme('colors.grey-light');
  }
}

@supports (padding: max(0px)) {
  .layout {
    padding-left: max(theme('spacing.6'), env(safe-area-inset-left));
    padding-right: max(theme('spacing.6'), env(safe-area-inset-right));
  }
}
</style>
