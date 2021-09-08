<template>
  <div class="container">
    <div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
      <div href="/" class="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
        <input class="fs-5 fw-semibold" v-model="username" placeholder="Type your username...">
      </div>
      <div class="list-group list-group-flush border-bottom scrollarea">
        <div href="#" class="list-group-item list-group-item-action py-3 lh-tight"
          v-for="message in messages" :key="message">
          <div class="d-flex w-100 align-items-center justify-content-between">
            <strong class="mb-1">{{message.username}}</strong>
          </div>
          <div class="col-10 mb-1 small">{{message.message}}</div>
        </div>
      </div>
    </div>
    <form @submit.prevent="submit">
      <input class="form-control" placeholder="Write a message" v-model="message">
    </form>
  </div>
</template>

<script>
import Pusher from "pusher-js";
export default {
  name: 'App',
  data() {
    return {
      username: "",
      messages: [],
      message: "",
    }
  },
  mounted() {
    Pusher.logToConsole = true;

    var pusher = new Pusher('5c0f987c8a442b437e4d', {
      cluster: 'mt1'
    });

    var channel = pusher.subscribe('chat');
    channel.bind('message', data => {
      this.messages.push(data);
      console.log("salve");
    });
  },
  methods: {
    async submit() {
      this.$http.post("/api/messages", {
        username: this.username,
        message: this.message,
      })

      this.message = "";
    }
  }
}
</script>

<style>
.scrollarea {
  min-height: 500px;
  max-height: 500px;
  overflow: scroll;
}
</style>