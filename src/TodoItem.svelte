<script>
    // ~transitions oooh~
    import { fade, fly } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';

    // Emits events back up to the parent
    const dispatch = createEventDispatcher();

    // Dispatches event to remove todo (sends event up to parent)
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
    
    // Props!
    export let id;
    export let text;
    export let complete;

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


<!-- ~transitionsss~ -->
<li in:fly="{{ x: 900, duration: 500 }}" out:fade>

<!-- Template logic for rendering complete vs not complete todos -->
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

<!-- Trash can for funsies -->
<button class="is-button" on:click={remove}>
    🗑️
</button>

</li>