<template>
    <div>
        <b-button
            variant="outline-primary"
            :to="{ name: 'users.index' }"
            class="float-right m-2"
        >
            <b-icon icon="person-lines-fill"></b-icon> Users
        </b-button>
        <div class="clearfix"></div>
        <div class="loading" v-if="loading">
            Loading...
        </div>

        <div v-if="error" class="error">
            <p>{{ error }}</p>

            <p>
                <button
                    @click.prevent="userCreateData"
                    class="btn btn-secondary btn-sm"
                >
                    Try Again
                </button>
            </p>
        </div>

        <div v-if="message">
            <b-alert dismissible variant="success" show>
                {{ message }}
            </b-alert>
        </div>

        <div v-if="submitErrors">
            <b-alert
                dismissible
                variant="danger"
                show
                v-for="(error, index) in submitErrors"
                :key="index"
            >
                {{ error[0] }}
            </b-alert>
        </div>

        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
                label="Email address:"
                description="We'll never share your email with anyone else."
            >
                <b-form-input
                    v-model="form.email"
                    type="email"
                    required
                    placeholder="Enter email"
                ></b-form-input>
            </b-form-group>

            <b-form-group label="Your Name:">
                <b-form-input
                    v-model="form.name"
                    required
                    placeholder="Enter name"
                ></b-form-input>
            </b-form-group>

            <b-form-group
                label="Password:"
                description="Your password must be 8-20 characters long, contain letters
                    and numbers, and must not contain spaces, special
                    characters, or emoji."
                style="position:relative"
            >
                <b-form-input
                    v-model="form.password"
                    :type="visibility"
                    required
                    placeholder="Enter password"
                ></b-form-input>
                <b-icon
                    icon="eye"
                    style="position: absolute; right: 5px; top: 45%;"
                    class="notunderlined"
                    v-if="visibility == 'password'"
                    @click="showPassword"
                ></b-icon>

                <b-icon
                    icon="eye-slash"
                    style="position: absolute; right: 5px; top: 45%;"
                    class="notunderlined"
                    v-if="visibility == 'text'"
                    @click="hidePassword"
                ></b-icon>
            </b-form-group>

            <b-form-group label="Roles:">
                <b-form-select
                    v-model="form.roles"
                    :options="roles"
                    required
                    multiple
                ></b-form-select>
            </b-form-group>

            <b-form-group label="Override Permissions:">
                <div class="card">
                    <div class="card-body">
                        <b-form-checkbox-group
                            v-model="form.permissions"
                            :options="permissions"
                            stacked
                        ></b-form-checkbox-group>
                    </div>
                </div>
            </b-form-group>
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: false,
            error: null,
            form: {
                email: "",
                name: "",
                password: "",
                roles: [],
                permissions: []
            },
            roles: [],
            permissions: [],
            show: true,
            visibility: "password",
            message: null,
            dismissSecs: 5,
            dismissCountDown: 0,
            submitErrors: []
        };
    },
    mounted() {
        this.fetchUser();
    },
    methods: {
        onSubmit(evt) {
            this.loading = true;
            evt.preventDefault();
            axios
                .post("/api/users/create", this.form)
                .then(response => {
                    this.loading = false;
                    this.message = response.data.message;
                    this.onReset();
                })
                .catch(error => {
                    this.loading = false;
                    this.submitErrors = error.response.data.errors;
                });
        },
        onReset(evt) {
            // evt.preventDefault();
            // Reset our form values
            this.form.email = "";
            this.form.name = "";
            this.form.password = "";
            this.form.roles = [];
            this.form.permissions = [];
            this.submitErrors = [];
        },

        fetchUser() {
            var userId = this.$route.params.id;
            axios
                .get("/api/users/" + userId + "/edit")
                .then(response => {
                    this.loading = false;
                    this.form = response.data.user;
                })
                .catch(error => {
                    this.loading = false;
                    this.show = false;
                    this.error = error.response.data.message || error.message;
                });
        },
        showPassword() {
            this.visibility = "text";
        },
        hidePassword() {
            this.visibility = "password";
        }
    }
};
</script>
