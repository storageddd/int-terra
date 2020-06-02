<template>
  <div>
    <h1>{{ $parseHint('FIELD_OPERATIONS') }} {{ id }}</h1>
    <iv-table
        :columns="columns"
        :col-width="colWidth"
        sortable
        :sorted-col="sort"
        :class="['text-s', $style.list]"
        @sort="onSort"
    >
      <template #toolbar>
        <div :class="$style.toolbar">
          <completion-filter v-model="filters.wasCompleted" @change="onFilter" />
          <iv-button text="Создать операцию" title="Создать операцию" @click="saveOperation" has-icon>
            <iv-icon name="add" />
          </iv-button>
        </div>
      </template>
      <template #data>
        <iv-table-body>
          <iv-table-row v-for="(item, index) in list" :key="index">
            <iv-table-cell>
              <strong class="text-uppercase text-secondary">{{ item.date | formatDate }}</strong>
            </iv-table-cell>
            <iv-table-cell>
              <strong class="text-m">{{ item.type | mapType }}</strong>
            </iv-table-cell>
            <iv-table-cell class="text-nowrap">
              <iv-marker :variant="getMarkerVariantByAssessment(item.assessment)" />
              <span :class="getAssessmentClasses(item.assessment)">{{ item.assessment | mapAssessment }}</span>
            </iv-table-cell>
          </iv-table-row>
        </iv-table-body>
      </template>
    </iv-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { IvTable, IvTableBody, IvTableRow, IvTableCell, IvMarker, IvButton, IvIcon } from '@/components/interface';
import { Variants as MarkerVariants } from '@/components/interface/Marker/const';
import { OrderTypes } from '@/components/interface/Table/const';
import { OperationType, Assessment } from '@/api/FieldOperations/models/Operation'
import CompletionFilter from './components/CompletionFilter';
import filters from './filters';

export default {
  name: 'FieldOperations',
  components: {
    IvTable,
    IvTableBody,
    IvTableRow,
    IvTableCell,
    CompletionFilter,
    IvMarker,
    IvButton,
    IvIcon
  },
  filters,
  data() {
    return {
      columns: [this.$parseHint('DATE'), this.$parseHint('OPERATION'), this.$parseHint('ASSESSMENT')],
      colWidth: ['100px', '400px', '150px'],
      list: [],
      filters: {
        wasCompleted: false
      },
      sort: {
        index: 0,
        order: OrderTypes.DESC
      }
    }
  },
  computed: {
    ...mapGetters({
      getList: 'fieldOperations/getList'
    }),
    id() {
      return this.$route.params.id;
    }
  },
  created() {
    this.list = this.getList();
  },
  methods: {
    ...mapActions({
      fetchList: 'fieldOperations/fetchList',
      save: 'fieldOperations/save'
    }),
    onFilter(wasCompleted) {
      this.list = this.getList(wasCompleted, this.prepareSortField(this.sort));
    },
    onSort(sort) {
      this.list = this.getList(this.filters.wasCompleted, this.prepareSortField(sort));
    },
    prepareSortField(sort) {
      const indexFieldMap = {
        0: 'date',
        1: 'type',
        2: 'assessment'
      }
      return { field: indexFieldMap[sort.index], order: sort.order };
    },
    getMarkerVariantByAssessment(assessment) {
      const assessmentVariantMap = {
        [Assessment.EXCELLENT]: MarkerVariants.SUCCESS,
        [Assessment.SATISFACTORILY]: MarkerVariants.WARNING,
        [Assessment.BADLY]: MarkerVariants.ERROR
      }
      return assessmentVariantMap[assessment];
    },
    getAssessmentClasses(assessment) {
      return {
        'text-muted': assessment === null
      }
    },
    async saveOperation() {
      await this.save({
        id: null,
        type: OperationType.PLOWING,
        assessment: Assessment.EXCELLENT,
        area: 44,
        comment: null,
        date: { year: 2020, month: 8, day: 10 }
      });
      this.list = this.getList(this.filters.wasCompleted, this.prepareSortField(this.sort));
    }
  }
}
</script>

<style lang="scss" module>
  .list {
    td:last-child {
      * + * {
        margin-left: 10px;
      }
    }
  }

  .toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
  }
</style>
