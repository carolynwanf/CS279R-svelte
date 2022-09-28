<script>
    // Local components
    import TodoItem from './TodoItem.svelte';

    // Database manipulation stuff
    import { db } from './firebase';
    import { collection, addDoc, updateDoc, doc, getDocs, query, deleteDoc, where } from 'firebase/firestore';
    import { collectionData } from 'rxfire/firestore';
    import { startWith } from 'rxjs/operators';

    // Prop! passed from parent
    export let uid;

    // Form Text
    let text = '';

    // Populating todos using database
    const q = query(collection(db, "todos"), where("uid", "==", uid));
    const todos = collectionData(q,"id").pipe(startWith([]));


    // Adds todos asynchronously
    async function addWrapper() {
        console.log("adding")
        const docRef = await addDoc(collection(db, "todos"), {
            uid: uid,
            text: text,
            complete: false,
            created: Date.now()
        });

        const id = docRef.id;
        await updateDoc(doc(db, "todos", id), {
            id: id
        })
    }

    // Synchronous add function to be called by the event handler
    function add() {
        addWrapper();
        text = '';
    }

    // Updates todos asynchronously
    async function updateWrapper(id, newStatus) {
        await updateDoc(doc(db, "todos", id), {
            complete: newStatus
        })
    }

    // Synchronous update function to be called by the event handler
    function updateStatus(event) {
        const { id, newStatus } = event.detail;
        updateWrapper(id, newStatus)
        
    }

    // Deletes todos asynchronously
    async function deleteWrapper(id) {
        await deleteDoc(doc(db, "todos", id));
    }

    // Synchronous remove function to be called by the event handler
    async function removeItem(event) {
        const { id } = event.detail;
        deleteWrapper(id)
    }
</script>

<style>
    input { display: block }
</style>

<!-- displaying todos -->
<ul>
	{#each $todos as todo}

        <TodoItem {...todo} on:remove={removeItem} on:toggle={updateStatus} />
        
	{/each}
</ul>

<!-- Binds the value of the text var to the form, when the form changes the text var does too -->
<input bind:value={text}>

<!-- Button to add tasks -->
<button on:click={add}>Add Task</button>