<script>
	export let name;
	import Login from "./Login.svelte";
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css" />
</svelte:head>

<style>
	main {
	  margin: 20px;
	}
</style>

<!-- Main content -->
<main class="content">

	<h1>Welcome to {name}</h1>

	<Login />

</main>