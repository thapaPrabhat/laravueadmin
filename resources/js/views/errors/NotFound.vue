<template>
    <div class="mx-auto" style="width: 500px;">
        <h1>404 Error</h1>
        <p>Woops! Looks like the page you requested cannot be found.</p>
        <router-link :to="{ name: 'home' }" exact>
            Go to home page
        </router-link>
    </div>
</template>
