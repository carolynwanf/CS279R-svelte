<script>
    import { fade, fly } from 'svelte/transition';
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

    console.log(id, text, complete)
</script>

<style>
    .is-complete {
        text-decoration: line-through;
        color: green;
    }

    li {
        display: flex;
        font-size: 1.2em;
        font-weight: bold;
    }

    span {
        margin-right: auto;
    }
</style>


<li in:fly="{{ x: 900, duration: 500 }}" out:fade>

{#if complete}
    <span class="is-complete">
        { text }
    </span>
	<button class="is-button" on:click={toggleStatus}>
		✔️
	</button>
{:else}
    <span>
        { text }
    </span>
	<button class="is-button" on:click={toggleStatus}>
		❌
	</button>
{/if}

<button class="is-button" on:click={remove}>
    🗑️
</button>

</li>