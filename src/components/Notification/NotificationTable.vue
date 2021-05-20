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
          <td v-on:click="movePage(item.no)">{{ item.no }}</td>
          <td v-on:click="movePage(item.no)">{{ item.subject }}</td>
          <td v-on:click="movePage(item.no)">{{ item.userid }}</td>
          <td v-on:click="movePage(item.no)">{{ item.hit }}</td>
        </slot>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  name: "notification-table",
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
    movePage(no) {
      console.log(no);
      this.$router.push({ name: "notification-view", params: { no: no } });
    }
  }
};
</script>
<style></style>
