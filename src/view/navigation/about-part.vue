<template>
  <div class="about">
    <div class="container">
      <div
        v-for="(item, index) in paragraph"
        :key="'div' + index"
        :class="{ textcenter: item.textCenter || false }"
      >
        <h3>
          <span
            data-editable="text"
            tabindex="0"
            :data-source="getDataSource(index, 'title')"
          >
            {{ item.title }}
          </span>
        </h3>
        <p v-for="(it, idx) in item.content" :key="index + '-' + idx">
          <span
            data-editable="text"
            tabindex="0"
            :data-source="getDataSource(index, 'content')"
          >
            {{ it }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  methods: {
    getDataSource(index, prop) {
      return `navigation.about.paragraph[${index}].${prop}`;
    },
  },
  computed: {
    ...mapState({
      paragraph: (state) => state.navigation.about.paragraph,
    }),
  },
};
</script>

<style lang="less" scoped>
.about {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 100;

  .container {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 2rem;
    overflow: scroll;
    background-color: lightgoldenrodyellow;
    background: url("../../assets/img/background.jpg") center no-repeat;
    background-size: cover;
    color: #ebd8d1;

    h3 {
      text-align: center;
      padding: 20px 0;
      margin-bottom: 0;
    }
    p {
      text-align: left;
      font-size: 1rem;
      margin-bottom: 0;
    }
    div:first-child p {
      text-indent: 2em;
    }

    .textcenter p {
      text-align: center;
    }
  }
}

@media only screen and (min-width: 768px) {
  .about {
    .container {
      width: 80%;
    }
  }
}

@media only screen and (min-width: 1024px) {
  .about {
    .container {
      width: 60%;
    }
  }
}

@media only screen and (min-width: 1280px) {
  .about {
    .container {
      width: 50%;
    }
  }
}

@media only screen and (min-width: 1440px) {
  .about {
    .container {
      max-width: 750px;
    }
  }
}
</style>