export const add = (data) => {
  return {
    type: "book/add",
    payload: data,
  };
};

export const remove = (data) => {
  return {
    type: "book/remove",
    payload: data,
  };
};

export const clear = (data) => {
  return {
    type: "book/clear",
  };
};
