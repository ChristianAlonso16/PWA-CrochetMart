<template>
  <div>
    <Card style="width: 10rem" class="shadow-2">
      <template #content>
        <div class="flex flex-column align-items-center">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
          >
            <path :d="iconPath" />
          </svg>
          <h3 class="mt-3">{{ category.categoryName }}</h3>
        </div>
      </template>
    </Card>
  </div>
</template>


<script>
import Card from "primevue/card";
import * as mdiIcons from "@mdi/js";

export default {
  components: {
    Card,
  },
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
  computed: {
    iconPath() {
      const iconKey = `mdi${this.category.icono
        .charAt(0)
        .toUpperCase()}${this.category.icono.slice(1)}`;
      return mdiIcons[iconKey] || mdiIcons.mdiHelpCircle;
    },
  },
};
</script>