import moment from 'moment';

export default {
  /**
   * Получение отфильтрованных и отсортированных операций.
   * @param state
   * @returns {function(*=, {field: *, order: *}=): T[]}
   */
  getList: state => (wasCompleted = false, { field, order } = {}) => {
    const currentDate = moment(new Date());

    return state.list
      .filter(item => moment(item.date)[wasCompleted ? 'isBefore' : 'isAfter'](currentDate))
      .sort((itemA, itemB) => {
        let fieldA = itemA[field] !== null ? itemA[field] : -1;
        let fieldB = itemB[field] !== null ? itemB[field] : -1;

        if (field === 'date') {
          fieldA = moment(fieldA).unix();
          fieldB = moment(fieldB).unix();
        }

        if (order === 'asc') {
          return fieldA > fieldB ? 1 : -1;
        } else {
          return fieldA < fieldB ? 1 : -1;
        }
      });
  }
}
