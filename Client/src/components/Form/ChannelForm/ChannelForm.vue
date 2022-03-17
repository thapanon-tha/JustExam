<template>
    <div>
        <form>
            <div class="flex justify-center gap-40">
                <div class="flex flex-col gap-5">
                    <h1 class="text-gray-700 font-semibold text-2xl">Channel Information</h1>
                    <div class="form-control">
                        <InputForm inputLabel="Channel Title" type="text" v-model="title" />
                    </div>
                    <div class="form-control">
                        <InputForm inputLabel="Channel Description" type="text" v-model="description" />
                    </div>
                    <div class="form-control">
                        <DatePicker v-model="datePicked" />
                    </div>
                    <div class="form-control">
                        <TimePicker labelText="Time" />
                    </div>
                </div>
                <div class="form-control">
                    <div class="flex flex-col justify-center gap-5">
                        <h1 class="text-gray-700 font-semibold text-2xl">Exam setting</h1>
                        <div>
                            <Checkbox3 textRight="Random sections" v-model="settingData.randomSec" />
                        </div>
                        <div>
                            <Checkbox3 textRight="Random questions in section" v-model="settingData.randomQuestion" />
                        </div>
                        <div>
                            <Checkbox3 textRight="Shuffle choices" v-model="settingData.shuffleChoices" />
                        </div>
                        <div>
                            <Checkbox3
                            textRight="Show correct answers after submit the exam"
                            v-model="settingData.showCAnswer"
                            />
                        </div>
                        <div>
                            <Checkbox3
                            textRight="Show total scores after submit the exam"
                            v-model="settingData.showTotalScore"
                            />
                        </div>
                        <div>
                            <Checkbox3
                            textRight="Cannot submit the exam if there are missed answers"
                            v-model="settingData.cantSubmitEmpty"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import InputForm from '@/components/Form/InputForm';
import Checkbox3 from '@/components/Form/Checkbox3';
import DatePicker from '@/components/Form/DatePicker';
import TimePicker from '@/components/Form/TimePicker';

export default {
    name: 'ChannelForm',
    components: {
        InputForm,
        Checkbox3,
        DatePicker,
        TimePicker,
    },
    props: ["value"],
    data() {
        return {
            title: this.value.title,
            description: this.value.description,
            datePicked: this.value.datePicked,
            settingData: {
                randomSec: this.value.randomSec,
                randomQuestion: this.value.randomQuestion,
                shuffleChoices: this.value.shuffleChoices,
                showCAnswer: this.value.showCAnswer,
                showTotalScore: this.value.showTotalScore,
                cantSubmitEmpty: this.value.cantSubmitEmpty,
            },
        };
    },
};
</script>