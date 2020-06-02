import store from '@/store';

export async function FileOperationsBeforeEnter(to, from, next) {
  await store.dispatch('fieldOperations/fetchList');
  next();
}
