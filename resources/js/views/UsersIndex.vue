<template>
    <div class="users">
        <div class="loading" v-if="loading">
            Loading...
        </div>

        <div v-if="error" class="error">
            <p>{{ error }}</p>

            <p>
                <button
                    @click.prevent="fetchData"
                    class="btn btn-secondary btn-sm"
                >
                    Try Again
                </button>
            </p>
        </div>

        <b-table
            striped
            hover
            id="table-transition-example"
            primary-key="identifier"
            :busy.sync="loading"
            :items="fetchData"
            :current-page="meta.current_page"
            :fields="fields"
            :per-page="meta.per_page"
        ></b-table>

        <b-pagination
            v-model="meta.current_page"
            :total-rows="meta.total"
            :per-page="meta.per_page"
            align="center"
        ></b-pagination>
    </div>
</template>
<script>
import axios from "axios";

export default {
    data() {
        return {
            users: [],
            meta: {
                current_page: 1,
                total: 1,
                per_page: 10
            },
            error: null,
            loading: false,
            fields: ["name", "email"]
        };
    },
    methods: {
        fetchData(ctx) {
            this.loading = true;
            const promise = axios.get(
                "/api/users?page=" +
                    ctx.currentPage +
                    "&size=" +
                    ctx.perPage +
                    "&size=" +
                    ctx.perPage
            );

            return promise
                .then(response => {
                    this.loading = false;
                    this.users = response.data.data;
                    const users = response.data.data;
                    this.meta = response.data.meta;
                    return users || [];
                })
                .catch(error => {
                    this.loading = false;
                    this.error = error.response.data.message || error.message;
                });
        }
    }
};
</script>
