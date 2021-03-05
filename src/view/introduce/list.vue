<template>
  <ul :data-title="item.title" :data-content="item.content">
    <li v-for="(img, index) in item.images" :key="index">
      <img :src="img" alt="" draggable="false" />
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
    },
  },
};
</script>