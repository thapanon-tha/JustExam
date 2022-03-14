<template>
    <div class="ml-10 mt-10 mr-10 mb-10">
        <div class="break-words p-3 mb-3">
            True False Question
        </div>
        <div class="ml-10">
            <CheckboxForm
                label="True"
            />
            <CheckboxForm
                label="False"
            />
        </div>
    </div>
</template>

<script>
import Checkbox2 from '@/components/Form/Checkbox2';
import CheckboxForm from '@/components/Form/CheckboxForm';

export default {
    name: 'PreTrueFalse',
    components: {
        CheckboxForm,
        Checkbox2,
    },
   
};
</script>