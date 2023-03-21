<script lang="ts">
	import Hamburger from '../../Icons/Hamburger.svelte';

	let className: string = '';
	export { className as class };
</script>

<div class="navbar bg-base-200 {className}">
	<label for="my-drawer-2" class="btn btn-ghost swap swap-rotate lg:hidden">
		<input type="checkbox" />
		<Hamburger />
	</label>

	<div class="flex-1 justify-center lg:justify-start">
		<a class="btn btn-ghost normal-case text-xl" href="/">daisyUI</a>
	</div>
	<div class="flex-none gap-2">
		<div class="form-control hidden lg:flex">
			<input type="text" placeholder="Search" class="input input-bordered" />
		</div>
		<div class="dropdown dropdown-end">
			<button tabindex="0" class="btn btn-ghost btn-circle avatar">
				<div class="w-10 rounded-full">
					<img
						src="https://firebasestorage.googleapis.com/v0/b/milya-store.appspot.com/o/manga-anime-musashi-miyamoto-musashi-hd-wallpaper-preview.jpg?alt=media&token=94e5fe19-5d74-4676-b3bf-f09194aa3189"
						alt="profile"
					/>
				</div>
			</button>
			<button
				tabindex="0"
				class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
			>
				<li>
					<a class="justify-between" href="/">
						Profile
						<span class="badge">New</span>
					</a>
				</li>
				<li><a href="/settings">Settings</a></li>
				<li><a href="/">Logout</a></li>
			</button>
		</div>
	</div>
</div>
