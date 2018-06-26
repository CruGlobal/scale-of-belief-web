export const openModal = (obj) => {
  return {
    type: 'OPEN_MODAL',
    obj
  }
}
export const closeModal = (obj) => {
  return {
    type: 'CLOSE_MODAL',
    obj
  }
}
