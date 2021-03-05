<template>
  <div :data-title="item.title" :data-content="item.content">
    <img :src="item.image" alt="" draggable="false" />
  </div>
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