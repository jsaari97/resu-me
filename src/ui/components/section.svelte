<script>
  export let title;
  export let children;
</script>

<style>
  section {
    background-color: royalblue;
  }

  h2 {
    color: cyan;
  }
</style>

<section>
  <h2>{title}</h2>
  {#if children}
    {@html children}
  {/if}
</section>
