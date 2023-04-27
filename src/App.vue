<template>
  <div class="app">
    <div class="app__nav-bar">
      <div class="app__nav-bar__logo">
        <div class="app__nav-bar__logo__title">Github API</div>
        <div class="app__nav-bar__logo__description">Fast & Good</div>
      </div>
      <div class="app__nav-bar__options">
        <div>
          <SvgIcon type="mdi" :path="mdiFileDocumentOutline"></SvgIcon>
          <div>Documentation</div>
        </div>
        <div>
          <SvgIcon type="mdi" :path="mdiAccountGroupOutline"></SvgIcon>
          <div>Integrations</div>
        </div>
        <div>
          <SvgIcon type="mdi" :path="mdiStarCircleOutline"></SvgIcon>
          <div>Features</div>
        </div>
        <div>
          <SvgIcon type="mdi" :path="mdiCash"></SvgIcon>
          <div>Pricing</div>
        </div>
        <div>
          <SvgIcon type="mdi" :path="mdiGraphOutline"></SvgIcon>
          <div>Use cases</div>
        </div>
        <div>
          <SvgIcon type="mdi" :path="mdiAccountMultipleOutline"></SvgIcon>
          <div>Team</div>
        </div>
        <div>
          <SvgIcon type="mdi" :path="mdiFrequentlyAskedQuestions"></SvgIcon>
          <div>FAQ</div>
        </div>
        <div>
          <SvgIcon type="mdi" :path="mdiPhoneInTalkOutline"></SvgIcon>
          <div>Contact us</div>
        </div>
      </div>
      <div class="app__nav-bar__account">
        <button class="app__nav-bar__account__login">Login</button>
        <button class="app__nav-bar__account__register">Register</button>
      </div>
    </div>
    <div class="app__router"><router-view /></div>
  </div>
</template>
<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon'
import {
  mdiFileDocumentOutline, mdiAccountGroupOutline, mdiStarCircleOutline, mdiCash, mdiGraphOutline, mdiAccountMultipleOutline, mdiFrequentlyAskedQuestions, mdiPhoneInTalkOutline
} from '@mdi/js'
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
    border-radius: 0 0 $base-radius $base-radius;
    justify-content: space-evenly;
    align-items: center;
    -webkit-box-shadow: 8px -2px 24px -8px rgba(66, 68, 90, 1);
    -moz-box-shadow: 8px -2px 24px -8px rgba(66, 68, 90, 1);
    box-shadow: 8px -2px 24px -8px rgba(66, 68, 90, 1);

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
      text-align: center;
      cursor: pointer;
    }

    &__account {
      display: flex;
      width: 250px;
      justify-content: space-between;

      &__login {
        color: white;
        background-color: #171717;

        &:hover {
          background-color: #323232;
        }
      }

    }
  }

  &__router {
    padding-top: 97px;
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
        width: 170px;

        button {
          width: 80px;
          height: 40px;
        }
      }
    }
  }
}
</style>