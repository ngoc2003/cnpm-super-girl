export const add = (data) => ({
  type: 'book/add',
  payload: data,
});

export const remove = (data) => ({
  type: 'book/remove',
  payload: data,
});

export const clear = () => ({
  type: 'book/clear',
});
