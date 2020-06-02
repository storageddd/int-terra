<template>
  <th :class="classes" :style="styles" v-on="listeners">{{ text }}</th>
</template>

<script>
import { OrderTypes } from './const';

export default {
  name: 'IvTableHeader',
  props: {
    text: {
      type: String,
      default: ''
    },
    order: {
      type: String,
      default: OrderTypes.NONE
    },
    sortable: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      nextSortOrder: {
        [OrderTypes.ASC]: OrderTypes.DESC,
        [OrderTypes.DESC]: OrderTypes.ASC,
        [OrderTypes.NONE]: OrderTypes.ASC
      }
    }
  },
  computed: {
    classes() {
      return {
        [this.$style.header]: true,
        [this.$style.sort]: this.sortable,
        [this.$style.asc]: this.order === OrderTypes.ASC,
        [this.$style.desc]: this.order === OrderTypes.DESC
      }
    },
    styles() {
      return `width: ${this.width}`;
    },
    listeners() {
      return {
        ...this.$listeners,
        click: this.onClick
      }
    }
  },
  methods: {
    onClick(e) {
      if (this.sortable) {
        this.$emit('sort', this.nextSortOrder[this.order]);
      }
      this.$emit('click', e);
    }
  }
};
</script>

<style lang="scss" module>
  .header {
    padding: 14px 10px 13px;
    background-color: var(--color-background-neutral);
    white-space: nowrap;
  }

  .sort {
    cursor: pointer;
    user-select: none;

    &::after {
      position: relative;
      display: inline-block;
      content: '';
      width: 0;
      height: 0;
      top: -1px;
      margin-left: 5px;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid var(--color-interactive-02);
      vertical-align: middle;
    }
  }

  .asc {
    &::after {
      border-top: none;
      border-bottom: 5px solid var(--color-interactive-01);
    }
  }

  .desc {
    &::after {
      border-top: 5px solid var(--color-interactive-01);
    }
  }
</style>
