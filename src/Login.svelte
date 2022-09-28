<!-- The Login component! Used to render a login screen if you haven't already logged in, and your todos/profile otherwise -->
<script>
    // Importing local components
    import Profile from './Profile.svelte';
    import Todos from './Todos.svelte';

    // Importing firebase authentication stuff
    import { signInWithPopup } from "firebase/auth";
    import { auth, googleProvider } from './firebase';
    import { authState } from 'rxfire/auth';

    let user;

    // Re-renders on update of user
    const unsubscribe = authState(auth).subscribe(u => user = u);

    // Login
    function login() {
        // Waiting for signInWithPopup to finish before updating the user
        signInWithPopup(auth, googleProvider).then((result) => {
            // The signed-in user info
            user = result.user;
        }).catch((error) => {
            // Logging errors
            console.log("error", error)
        });
    }
</script>


<style>
    section {
        background: rgb(235, 235, 235);
        padding: 20px;
    }
</style>

<section>
<!-- Template logic for conditional rendering -->
{#if user}
    <!-- Rendering the Profile component with the attributes of user passed down as props -->
    <Profile {...user} />
    <!-- Sign out button -->
    <button on:click={ () => auth.signOut() } class="button">logout</button>
    <hr>
    <!-- Rendering the Todos component with uid passed down as a prop -->
    <Todos uid={user.uid} />
{:else}
    <!-- If someone isn't already signed in, show the sign in screen -->
	<button on:click={login} class="button">
		Sign in with Google
	</button>
{/if}
</section>