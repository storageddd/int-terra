import FieldService from '@/api/FieldOperations/FieldService';
import Operation from '@/api/FieldOperations/models/Operation';

const fieldService = new FieldService();

export default {
  /**
   * Получение списка операций.
   * @param commit
   * @returns {Promise<void>}
   */
  async fetchList({ commit }) {
    commit('global/toggleIsLoading', true, { root: true });

    try {
      const list = await fieldService.getOperations();
      commit('setList', list);
    } catch (e) {
      commit('setError', 'Произошла ошибка. Попробуйте снова');
    }

    commit('global/toggleIsLoading', false, { root: true });
  },
  /**
   * Создание/редактирование операции.
   * @param commit
   * @param state
   * @param id
   * @param type
   * @param date
   * @param area
   * @param comment
   * @param assessment
   * @returns {Promise<void>}
   */
  async save({ commit, state }, { id, type, date, area, comment, assessment }) {
    const newOperation = new Operation({
      id: id,
      type: type,
      date: date,
      area: area,
      comment: comment,
      assessment: assessment
    });

    commit('global/toggleIsLoading', true, { root: true });

    try {
      const savedOperation = await fieldService.saveOperation(newOperation);

      const clonedList = [...state.list];
      const isExistingOperation = id !== null;
      if (isExistingOperation) {
        const oldOperation = state.list.find(operation => operation.id === id);
        const operationIndex = state.list.indexOf(oldOperation);
        clonedList.splice(operationIndex, 1, savedOperation);
      } else {
        clonedList.push(savedOperation);
      }

      commit('setList', clonedList);
    } catch (e) {
      commit('setError', 'Произошла ошибка. Попробуйте снова');
    }

    commit('global/toggleIsLoading', false, { root: true });
  }
}
