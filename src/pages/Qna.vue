<template>
  <card title="Q&A 목록" sub-title="Q&A 페이지 입니다">
    <div>
      <router-view></router-view>
    </div>
  </card>
</template>

<script>
export default {};
</script>
<style scoped>
#book-list {
  border-collapse: collapse;
  width: 100%;
}

#book-list thead {
  background-color: #ccc;
  font-weight: bold;
}

#book-list td,
#book-list th {
  text-align: center;
  border-bottom: 1px solid #ddd;
  height: 50px;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>
