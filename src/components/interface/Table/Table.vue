<template>
  <div :class="$style.table" v-on="$listeners">
    <div v-if="$slots.toolbar">
      <slot name="toolbar" />
    </div>
    <div :class="$style.container">
      <table>
        <thead>
        <tr>
          <iv-table-header
              v-for="(column, index) in internalColumns"
              :key="index"
              :text="column.text"
              :order="column.order"
              :sortable="sortable"
              :width="getColWidth(index)"
              @sort="order => onSort(index, order)"
          />
        </tr>
        </thead>
        <slot name="data" />
      </table>
    </div>
  </div>
</template>

<script>
import IvTableHeader from './TableHeader';
import { OrderTypes } from './const';

export default {
  name: 'IvTable',
  components: {
    IvTableHeader
  },
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    colWidth: {
      type: Array,
      default: () => []
    },
    sortable: {
      type: Boolean,
      default: false
    },
    sortedCol: {
      type: Object,
      default: null,
      validator: value => {
        let valid = true;

        if (typeof value === 'object') {
          if (typeof value.index !== 'number') {
            valid = false;
          }

          const available = Object.values(OrderTypes);
          if (typeof value.order !== 'string' || !value.order.match(new RegExp(`(${available.join('|')})`))) {
            valid = false;
          }
        }

        return valid;
      }
    }
  },
  data() {
    return {
      internalColumns: []
    }
  },
  created() {
    this.prepareColumns();
  },
  methods: {
    getColWidth(index) {
      return this.colWidth[index] || null;
    },
    prepareColumns() {
      this.internalColumns = this.columns.map((item, index) => {
        let order = OrderTypes.NONE;

        if (this.sortedCol && this.sortedCol.order && this.sortedCol.index === index) {
          order = this.sortedCol.order;
        }

        return {
          text: item,
          order: order
        };
      });
    },
    onSort(index, order) {
      if (!this.sortable) return;

      for (const column of this.internalColumns) {
        column.order = OrderTypes.NONE;
      }
      this.internalColumns[index].order = order;
      this.$emit('sort', { index, order });
    }
  }
}
</script>

<style lang="scss" module>
  .table {
    table {
      width: 100%;
      text-align: left;
    }

    tbody {
      tr {
        border-top: 1px solid var(--color-background-neutral);
      }

      td {
        height: 50px;
        padding: 5px 10px;
      }
    }
  }

  .container {
    overflow-x: auto;
  }
</style>
