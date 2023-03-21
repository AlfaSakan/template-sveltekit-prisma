<script lang="ts">
	import toast from 'svelte-french-toast';
</script>

<h1 class="text-3xl font-bold underline">Hello world!</h1>
<button on:click={() => toast.success('Success')}>toast</button>
