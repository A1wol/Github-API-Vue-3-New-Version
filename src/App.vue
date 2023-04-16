<template>
  <div class="app">
    <div class="app__nav-bar">
      <div class="app__nav-bar__logo">
        <div class="app__nav-bar__logo__title">Github API</div>
        <div class="app__nav-bar__logo__description">Fast & Good</div>
      </div>
      <div class="app__nav-bar__options">
        <div>Documentation</div>
        <div>Integrations</div>
        <div>Features</div>
        <div>Pricing</div>
        <div>Use cases</div>
        <div>Team</div>
        <div>FAQ</div>
        <div>Contact us</div>
      </div>
      <div class="app__nav-bar__account">
        <div class="app__nav-bar__account__login">
          <button>Login</button>
        </div>
        <div class="app__nav-bar__account__logout">
          <button>Register</button>
        </div>
      </div>
    </div>
    <div class="app__router"><router-view /></div>
  </div>
</template>
<script setup lang="ts">
</script>

<style scoped lang="scss">
.app {

  &__nav-bar {
    display: flex;
    position: fixed;
    height: 80px;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    background-color: white;
    border-bottom: 1px solid grey;
    border-radius: 0 0 15px 15px;
    justify-content: space-evenly;
    align-items: center;

    &__logo {
      &__title {
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        font-weight: 700;
        font-size: 34px;
      }

      &__description {
        font-weight: 400;
        font-size: 16px;
        display: flex;
        justify-content: center;
      }
    }

    &__options {
      display: flex;
      width: 650px;
      justify-content: space-around;
      cursor: pointer;
    }

    &__account {
      display: flex;

      div {
        padding: 12px;
      }
    }
  }

  &__router {
    padding-top: 100px;
    max-width: 1000px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
}

@media (max-width: 1150px) {
  .app {
    &__nav-bar {
      &__options {
        display: none;
      }
    }
  }
}

@media (max-width: 500px) {
  .app {
    &__nav-bar {
      &__logo {
        &__title {
          font-size: 16px;
        }

        &__description {
          font-size: 14px;
        }
      }

      &__account {
        div {
          padding: 5px;
        }

        button {
          width: 80px;
          height: 40px;
        }
      }
    }
  }
}
</style>