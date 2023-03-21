<script lang="ts">
	import { formatNumberToRupiah } from '$lib/client/utils/number.util';
	import Person from '../../Icons/Person.svelte';

	export let title: string;
	export let price: number;
	export let href: string = '';
</script>

<a {href} class="card card-compact w-full lg:h-96 bg-white shadow-xl rounded-lg">
	<figure class="w-52 h-52 lg:w-full lg:h-64 bg-slate-300">
		<Person class="fill-black" width="104" height="104" />
	</figure>
	<div class="card-body">
		<h2 class="font-bold lg:card-title text-black">
			{title}
			<div class="badge badge-secondary text-xs">NEW</div>
		</h2>
		<p class="text-black">
			{formatNumberToRupiah(price)}
		</p>
		<div class="card-actions justify-start">
			<div class="badge badge-outline text-xs">Fashion</div>
			<div class="badge badge-outline text-xs">Products</div>
		</div>
	</div>
</a>
