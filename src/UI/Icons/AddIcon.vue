<template>
  <svg
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 490 490"
    style="enable-background: new 0 0 490 490"
    xml:space="preserve"
    :width="width"
    :height="height"
  >
    <g>
      <g>
        <g>
          <path
            d="M17.1,490h349.4c9.5,0,17.2-7.7,17.2-17.2v-89.2h89.2c9.5,0,17.1-7.7,17.1-17.1V17.1C490,7.6,482.3,0,472.9,0H123.5 c-9.5,0-17.2,7.7-17.2,17.1v89.2H17.1C7.6,106.3,0,114,0,123.5v349.4C0,482.3,7.7,490,17.1,490z M140.6,34.3h315.1v315.1H140.6 V34.3z M34.3,140.6h72v225.9c0,9.5,7.7,17.1,17.2,17.1h225.9v72H34.3V140.6z"
          />
          <path
            d="M219.5,209H281v61.5c0,9.5,7.7,17.2,17.2,17.2s17.1-7.7,17.1-17.2V209h61.5c9.5,0,17.1-7.7,17.1-17.2 s-7.7-17.2-17.1-17.2h-61.5v-61.5c0-9.5-7.7-17.2-17.1-17.2c-9.5,0-17.2,7.7-17.2,17.2v61.5h-61.5c-9.5,0-17.1,7.7-17.1,17.2 C202.3,201.3,210,209,219.5,209z"
          />
        </g>
      </g>
    </g>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CrossIcon',
  props: {
    width: String,
    height: String,
  },
});
</script>
