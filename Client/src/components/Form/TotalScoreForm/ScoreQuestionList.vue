<template>
  <div class="ml-72">
    <div class="flex flex-row mt-5 justify-start ml-5">
      <div
        class="d-flex justify-start m-1"
        v-for="(section, index) in sectionlist"
        :key="index"
      >
        <div
          v-if="selectedSectionId === index + 1"
          @click="onClickSelectSection(section.id)"
        >
          <v-btn class="white--text" color="#EF7F4C" large :outlined="false">
            Section {{ index + 1 }}
          </v-btn>
        </div>
        <div v-else @click="onClickSelectSection(section.id)">
          <v-btn color="#EF7F4C" large :outlined="true">
            <div>Section {{ index + 1 }}</div>
          </v-btn>
        </div>
      </div>
    </div>
    <div
      class="flex flex-col w-screen gap-5 mt-5"
      v-for="item in questionList"
      :key="item.id"
    >
      <div class="bg-subColor border border-orange-200 rounded-xl w-4/6">
        <ScoreMultiple v-if="item.type === 'mc'" :value="item.questionData" />
        <ScoreShortAns v-if="item.type === 'sa'" :value="item.questionData" />
        <ScoreParagraph v-if="item.type === 'pa'" :value="item.questionData" />
        <ScoreTrueFalse v-if="item.type === 'tf'" :value="item.questionData" />
        <ScoreMatching v-if="item.type === 'ma'" :value="item.questionData" />
        <ScoreCoding v-if="item.type === 'ca'" :value="item.questionData" />
      </div>
    </div>
  </div>
</template>

<script>
import ScoreMultiple from '@/components/Form/TotalScoreForm/ScoreMultiple.vue';
import ScoreShortAns from '@/components/Form/TotalScoreForm/ScoreShortAns.vue';
import ScoreParagraph from '@/components/Form/TotalScoreForm/ScoreParagraph.vue';
import ScoreTrueFalse from '@/components/Form/TotalScoreForm/ScoreTrueFalse.vue';
import ScoreMatching from '@/components/Form/TotalScoreForm/ScoreMatching.vue';
import ScoreCoding from '@/components/Form/TotalScoreForm/ScoreCoding.vue';
import api from '@/services/apis';

export default {
  name: 'ScoreQuestionList',
  components: {
    ScoreMultiple,
    ScoreShortAns,
    ScoreParagraph,
    ScoreTrueFalse,
    ScoreMatching,
    ScoreCoding,
  },
  props: ['value'],
  data() {
    return {
      selectedSectionId: 1,
      sectionlist: [],
      qlist: [],
    };
  },

  methods: {
    onClickSelectSection(id) {
      this.selectedSectionId = id;
    },
    sectionCalo() {
      const list = this.qlist.map((data) => data.sectionId);
      const result = list.filter((v, i) => list.indexOf(v) === i);
      if (result.length !== 0) {
        this.sectionlist = result.map((v) => ({
          id: v,
          sectionName: `Section ${v}`,
        }));
      }
      this.sectionlist.sort((a, b) => {
        if (a.id > b.id) return 1;
        if (b.id > a.id) return -1;
        return 0;
      });
      // this.sectionlist.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0));
    },
    async callApi() {
      this.qlist = await api
        .getChannelQuestions(this.$route.params.cid, this.$route.params.ecid)
        // eslint-disable-next-line
        .then(async (res) => await api.channelScoreMapper(res.data));
      this.sectionCalo();
    },
  },
  computed: {
    questionList() {
      return this.qlist.filter(
        (question) => question.sectionId === this.selectedSectionId,
      );
    },
  },
  created() {
    this.callApi();
    this.$emit('update:qlist', this.qlist);
  },
  watch: {
    qlist() {
      this.$emit('update:qlist', this.qlist);
    },
  },
};
</script>
