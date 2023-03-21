<script lang="ts">
	import type { CarouselItem } from '$lib/client/utils/types.util';

	export let carousel: HTMLDivElement;
	export let carouselItems: CarouselItem[];
	export let withPagination = true;
</script>

<div>
	<div class="carousel w-full" bind:this={carousel}>
		{#each carouselItems as item, index (index)}
			<div id="item{index + 1}" class="carousel-item w-full">
				<img
					src={item.imageUrl}
					class="w-full animate-skeleton h-52 lg:h-64"
					alt="lorem"
					loading="lazy"
					decoding="async"
				/>
			</div>
		{/each}
	</div>
	{#if withPagination}
		<div class="flex justify-center w-full py-2 gap-2">
			{#each carouselItems as _, index (index)}
				<button
					on:click={() =>
						(carousel.scrollLeft = (carousel.scrollWidth / carouselItems.length) * index)}
					class="btn btn-xs"
				>
					{index + 1}
				</button>
			{/each}
		</div>
	{/if}
</div>
