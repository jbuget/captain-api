<template>
  <div class="login">
    <h1>Login page</h1>
    <form id="form"
          action="https://vuejs.org/"
          method="post">
      <p>
        <label for="username">Username</label>
        <input
            id="username"
            v-model="username"
            type="username"
            name="username"
        >
      </p>
      <p>
        <label for="password">Password</label>
        <input
            id="password"
            v-model="password"
            type="password"
            name="password"
        >
      </p>
      <p>
        <input
            type="submit"
            value="Submit"
        >
      </p>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'Login',

    data() {
      return {
        username: null,
        password: null
      };
    }
  }
</script>