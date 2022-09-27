<script>
    import { createEventDispatcher } from 'svelte';

    // Emits events back up to the parent
    const dispatch = createEventDispatcher();

    // Dispatches event to remove todo
    function remove() {
		dispatch('remove', { id });
	}

    // Dispatches event to toggle todo status
	function toggleStatus() {
        let newStatus = !complete;
		dispatch('toggle', {
            id,
            newStatus
        });
    }
    

    export let id; // document ID
    export let text;
    export let complete;
</script>

<style>
    .is-complete {
        text-decoration: line-through;
        color: green;
    }
</style>


<li>

{#if complete}
    <span class="is-complete">{ text }</span>
    <button on:click={toggleStatus}> ✔️ </button>
{:else}
    <span>{ text }</span>
    <button on:click={toggleStatus}> ❌ </button>
{/if}

<button on:click={remove}> 🗑 </button>

</li>