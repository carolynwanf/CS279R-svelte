<!-- The Profile component!! Used for rendering some fun information about the user -->
<script>
    // Defining the props to be used
    export let displayName;
    export let photoURL;
    export let uid;
</script>

<h3>Hi { displayName }!</h3>

<img src={ photoURL } width="100" alt="user avatar">
<p>Your user ID is { uid }</p>