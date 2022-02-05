<template>
    <form>
        <div class="flex flex-nowrap">
            <div>
                <InputForm
                input_label="First name"
                type="text"
                />
            </div>
            <div>
                <InputForm
                input_label="Surname"
                type="text"
                />
            </div>
        </div>
        <div class="">
            <InputForm
            input_label="Email"
            type="email"
            />
        </div>
        <div class="flex flex-nowrap">
            <InputForm
            input_label="Password"
            type="password"
            />
            <InputForm
            input_label="Confirm Password"
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
