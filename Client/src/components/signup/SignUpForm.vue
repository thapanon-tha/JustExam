<template>
    <form>
        <div class="flex flex-nowrap">
            <div>
                <InputForm
                inputLabel="First name"
                type="text"
                />
            </div>
            <div>
                <InputForm
                inputLabel="Surname"
                type="text"
                />
            </div>
        </div>
        <div>
            <InputForm
            inputLabel="Email"
            type="email"
            />
        </div>
        <div class="flex flex-nowrap">
            <InputForm
            inputLabel="Password"
            type="password"
            />
            <InputForm
            inputLabel="Confirm Password"
            type="password"
            />
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
};
</script>
