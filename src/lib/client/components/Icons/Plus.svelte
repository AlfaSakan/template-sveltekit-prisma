<script lang="ts">
  export let width: string = "20";
  export let height: string = "20";

  let className: string = "dark:fill-white fill-black";
  export { className as class };
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 448 512"
  {width}
  {height}
  class={className}
>
  <path
    d="M240 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H176V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H240V80z"
  />
</svg>
