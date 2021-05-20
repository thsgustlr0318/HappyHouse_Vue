<template>
  <card title="Q&A 목록" sub-title="Q&A 페이지 입니다">
    <div>
      <router-view></router-view>

      <!-- <div class="col-12">
        <card class="card-plain">
          <div class="table-full-width table-responsive">
            <qna-table type="hover" :data="data" :columns="columns">
            </qna-table>
          </div>
        </card>
      </div> -->

      <!-- <h1 class="underline">QnA 목록</h1> -->
      <!-- <div style="text-align: right"> -->
      <!-- <button @click="movePage">QnA 등록</button> -->
      <!-- </div> -->
      <!-- <div v-if="qnas.length">
        <table id="qna-list">
          <colgroup>
            <col style="width: 10%" />
            <col style="width: 10%" />
            <col style="width: 25%" />
            <col style="width: 30%" />
             <col style="width: 40%" />
     <col style="width: 10%" />
            <col style="width: 10%" />
          </colgroup>
          <thead>
            <tr>
              <th>번호</th>
              <th>답변여부</th>
              <th>ID</th>
              <th>제목</th> -->
      <!-- <th>내용</th> -->
      <!-- <th>조회수</th>
              <th>등록 시간</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(qna, index) in qnas" :key="index">
              <slot :row="item">
                <td>{{ qna.qno }}</td>
                <td>{{ qna.chk }}</td>
                <td>{{ qna.userid }}</td>
                <td>{{ qna.subject }}</td>
                <td>{{ qna.hit }}</td>
                <td>{{ qna.time }}</td>
              </slot>
            </tr>
          </tbody>
        </table>
      </div> -->
      <!-- <div v-else class="text-center">게시글이 없습니다.</div> -->
    </div>
    <!-- 
    <div>
      <div class="col-12">
        <card class="card-plain">
          <div class="table-full-width table-responsive">
            <paper-table
              type="hover"
              :title="table2.title"
              :sub-title="table2.subTitle"
              :data="data"
              :columns="table2.columns"
            >
            </paper-table>
          </div>
        </card>
      </div> -->
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
