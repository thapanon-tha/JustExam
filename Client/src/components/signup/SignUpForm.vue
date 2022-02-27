<template>
    <form @submit="onSubmit" class="add-form">
        <div class="flex flex-nowrap">
            <div class="form-control">
                <InputForm
                inputLabel="First name"
                type="text"
                v-model.trim="firstname"
                />
            </div>
            <div class="form-control">
                <InputForm
                inputLabel="Surname"
                type="text"
                v-model.trim="lastname"
                />
            </div>
        </div>
        <div class="form-control">
            <InputForm
            inputLabel="Email"
            type="email"
            v-model="email"
            />
        </div>
        <div class="flex flex-nowrap">
            <div class="form-control">
                <InputForm
                inputLabel="Password"
                type="password"
                v-model="password"
                />
            </div>
            <div class="form-control">
                <InputForm
                inputLabel="Confirm Password"
                type="password"
                v-model="confirmpassword"
                />
            </div>
        </div>

    </form>
</template>

<script>
import InputForm from '@/components/Form/InputForm.vue';

export default {
    name: 'SignUpForm',
    components: {
        InputForm,
    },
    data() {
        return {
            firstname: '',
            lastname: '',
            password: '',
            confirmpassword: '',
        };
    },
    methods: {

    },
};
</script>
