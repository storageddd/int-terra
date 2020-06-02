export default {
  toggleIsLoading(state, payload) {
    state.isLoading = payload;
  },
  setError(state, payload) {
    state.error = payload;
  },
  clearError(state) {
    state.error = null;
  }
}
