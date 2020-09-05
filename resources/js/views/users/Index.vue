<template>
    <div class="users">
        <b-button
            variant="outline-primary"
            :to="{ name: 'users.create' }"
            class="float-right m-2"
        >
            <b-icon icon="person-plus"></b-icon> Add User
        </b-button>

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
        >
            <template v-slot:cell(actions)="data">
                <!-- `data.value` is the value after formatted by the Formatter -->
                <b-button
                    variant="outline-primary"
                    :to="{ name: 'users.edit', params: {id:data.item.id} }"
                    class="float-right m-2"
                >
                    <b-icon icon="pencil-square"></b-icon>
                </b-button>
                <!-- <a :href="`#${data.value.replace(/[^a-z]+/i,'-').toLowerCase()}`">{{ data.value }}</a> -->
            </template>
        </b-table>

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
            fields: ["name", "email", "actions"]
        };
    },
    methods: {
        fetchData(ctx) {
            this.loading = true;
            const promise = axios.get(
                "/api/users?page=" +
                    ctx.currentPage +
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
