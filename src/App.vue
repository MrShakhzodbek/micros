<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <header>
    <div class="navbar">
      <RouterLink to="/">Logo</RouterLink>
    </div>
    <main>
      <nav>
        <RouterLink to="/"><el-button style="width: 100%; padding: 20px;" type="primary"><el-icon
              style="margin-right: 10px;">
              <HomeFilled />
            </el-icon>Workers</el-button></RouterLink>
        <RouterLink to="/document"><el-button style="width: 100%; padding: 20px;" type="primary"><el-icon
              style="margin-right: 10px;">
              <Document />
            </el-icon>Documents</el-button></RouterLink>
      </nav>
      <div class="main">
        <RouterView />
      </div>
    </main>
  </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: rgba(72, 69, 71, 0.11);
  height: 100vh;
  padding: 20px 50px 10px;

  .navbar {
    padding: 20px 50px;
    background: rgba(70, 55, 62, 0.53);
    border-radius: 10px;

    & a {
      text-decoration: none;
      text-transform: uppercase;
      font-size: 20px;
      user-select: none;
      color: black;
      padding: 5px 10px;
      border: 1px solid black;
      background: rgba(80, 244, 147, 0.53);
    }
  }

  main {
    display: flex;
    gap: 10px;
    width: 100%;
    height: 100vh;

    nav {
      border-radius: 10px;
      width: 250px;
      height: 100%;
      background: rgba(114, 218, 241, 0.49);
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .main {
      background: white;
      width: 100vw;
      border-radius: 10px;
      padding: 20px;
    }
  }
}
</style>
