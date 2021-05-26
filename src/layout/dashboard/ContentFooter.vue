<template>
  <footer class="footer">
    <div class="container-fluid d-flex flex-wrap justify-content-between">
      <nav>
        <ul>
          <li>
            <router-link :to="{ path: '/admin' }">Dashboard</router-link>
          </li>
        </ul>
      </nav>
      <div class="copyright d-flex flex-wrap">
        &copy; Developed By
        <a href="https://github.com/thsgustlr0318" target="_blank">
          &nbsp; HyeonSik Son.</a
        >&nbsp; and
        <a href="https://github.com/yaini" target="_blank"
          >&nbsp; SoYeon Lee.</a
        >
      </div>
    </div>
  </footer>
</template>
<script>
export default {};
</script>
<style></style>
