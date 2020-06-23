<script>
  export let title;
  export let children;
</script>

<section>
  <h2>{title} 🚀</h2>
  {#if children}
    {@html children}
  {/if}
</section>
