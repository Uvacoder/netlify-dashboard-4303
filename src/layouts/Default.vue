<template>
  <div class="layout">
    <slot />
  </div>
</template>

<style lang="scss">
body {
  background: #f4f6f9;
  color: #0f1c23;
  font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.5;
  @media (prefers-color-scheme: dark) {
    background: #0f1c23;
    color: #f4f6f9;
  }
}

.layout {
  margin: 0 auto;
  max-width: 64rem;
  padding: 1.5rem;
  width: 100%;
}

@supports (padding: max(0px)) {
  .layout {
    padding-left: max(1.5rem, env(safe-area-inset-left));
    padding-right: max(1.5rem, env(safe-area-inset-right));
  }
}
</style>
