<template>
  <div id="app">
    <div id="nav">
      <router-link class="nav-link" to="/">Home</router-link>
      <router-link class="nav-link" to="/Add">Add Book</router-link>
    </div>
    <router-view />
    <div class="footer">
      <a href="https://github.com/jaysoned/cp4" target="_blank">Github Code</a>
    </div>
  </div>
</template>

<style>
.body {
  padding: 0 50px 50px 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-bottom: 100px;
}

#nav {
  padding: 30px;
  display: flex;
  justify-content: space-evenly;
  background-color: #2c3e50;
}

#nav a.router-link-exact {
  font-weight: bold;
  color: #ffffff !important;
}

#nav .nav-link {
  color: #ffffff;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #428db9;
}

.footer {
  height: 50px;
  padding: 20px 100px 0px 100px;
  background: #2c3e50;
  font-size: 12px;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.footer a {
  color: rgb(255, 255, 255);
  padding-left: 50px;
}

.footer a:hover {
  color: rgb(172, 172, 172);
  text-decoration: none;
}
</style>
