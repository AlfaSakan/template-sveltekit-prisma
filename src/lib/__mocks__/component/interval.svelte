<script lang="ts">
	import { onInterval } from '$lib/client/utils/interval.util';

	let number = 0;

	onInterval(() => {
		number += 1;
	}, 1000);
</script>

<div><h1>{number}</h1></div>
