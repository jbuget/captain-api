<template>
  <div class="signup">
    <h1>Signup page</h1>
    <form id="form"
          action="https://vuejs.org/"
          method="post">
      <p>
        <label for="name">Name</label>
        <input
            id="name"
            v-model="name"
            type="text"
            name="name"
        >
      </p>
      <p>
        <label for="email">E-mail</label>
        <input
            id="email"
            v-model="email"
            type="email"
            name="email"
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
    name: 'Signup',

    data() {
      return {
        name: null,
        email: null,
        password: null
      };
    }
  }
</script>