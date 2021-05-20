<template>
  <table class="table" :class="tableClass">
    <thead>
      <slot name="columns">
        <th v-for="column in columns" :key="column">{{ column }}</th>
      </slot>
    </thead>
    <tbody>
      <tr v-for="(item, index) in data" :key="index">
        <slot :row="item">
          <td v-on:click="movePage(item.qno)">{{ item.qno }}</td>
          <td v-on:click="movePage(item.qno)">
            {{ item.chk == 1 ? "답변완료" : "답변미완료" }}
          </td>
          <td v-on:click="movePage(item.qno)">{{ item.userid }}</td>
          <td v-on:click="movePage(item.qno)">{{ item.subject }}</td>
          <td v-on:click="movePage(item.qno)">{{ item.hit }}</td>
          <td v-on:click="movePage(item.qno)">{{ item.time }}</td>
        </slot>
      </tr>
      <!-- <router-view></router-view> -->
    </tbody>
  </table>
</template>
<script>
export default {
  name: "qna-table",
  props: {
    columns: Array,
    data: Array,
    type: {
      type: String, // striped | hover
      default: "striped"
    },
    title: {
      type: String,
      default: ""
    },
    subTitle: {
      type: String,
      default: ""
    }
  },
  computed: {
    tableClass() {
      return `table-${this.type}`;
    }
  },
  methods: {
    movePage(qno) {
      console.log(qno);
      this.$router.push({ name: "qna-view", params: { qno: qno } });
    }
  }
};
</script>
<style></style>
