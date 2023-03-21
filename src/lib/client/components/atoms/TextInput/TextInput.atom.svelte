<script lang="ts">
  export let label: string;
  export let name: string;
  export let error: string = "";
  export let placeholder: string = "";
  export let type: "text" | "number" | "email" | "password" | "search" | "url" =
    "text";
  export let value: string | number = "";
  export let disabled: boolean = false;
  export let min: number | undefined = undefined;
</script>

<div class="form-control w-full">
  <label for={name} class="label">
    <span class="label-text font-semibold">{label}</span>
    <!-- <span class="label-text-alt">Alt label</span> -->
  </label>
  <input
    {type}
    {placeholder}
    class="input input-bordered w-full"
    id={name}
    {name}
    {value}
    {disabled}
    {min}
  />
  <label for={name} class="label">
    <span class="label-text-alt text-error">{error ? error : ""}</span>
  </label>
</div>
