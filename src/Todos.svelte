<script>
    import TodoItem from './TodoItem.svelte';
    import { db } from './firebase';
    import { collection, addDoc, updateDoc, doc, getDocs, query, deleteDoc, where } from 'firebase/firestore';
    import { collectionData } from 'rxfire/firestore';
    import { startWith } from 'rxjs/operators';

    // User ID passed from parent
    export let uid;

    // Form Text
    let text = 'some task';

    // Query requires an index, see screenshot below
    const q = query(collection(db, "todos"), where("uid", "==", uid));
    const todos = collectionData(q,"id").pipe(startWith([]));
    // const todos = ;

    // async function getTodos() {
    
        
    //     docSnap.forEach((doc) => {
    //         console.log("doc")
    //     // doc.data() is never undefined for query doc snapshots
    //     console.log(doc.id, " => ", doc.data());
    //         todos.append(doc)
    //     });
    //     // return docSnap
    // }

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

    function add() {
        addWrapper();
        text = '';
    }

    async function updateWrapper(id, newStatus) {
        await updateDoc(doc(db, "todos", id), {
            complete: newStatus
        })
    }

    function updateStatus(event) {
        const { id, newStatus } = event.detail;
        updateWrapper(id, newStatus)
        
    }

    async function deleteWrapper(id) {
        await deleteDoc(doc(db, "todos", id));
    }

    async function removeItem(event) {
        const { id } = event.detail;
        deleteWrapper(id)
    }
</script>

<style>
    input { display: block }
</style>

<ul>
	{#each $todos as todo}

        <TodoItem {...todo} on:remove={removeItem} on:toggle={updateStatus} />
        
	{/each}
</ul>


<input bind:value={text}>

<button on:click={add}>Add Task</button>