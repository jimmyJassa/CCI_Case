export function nextPage(payload){
  return {type: "NEXT_PAGE", payload};
}

export function prevPage(payload){
  return {type: "PREV_PAGE", payload};
}

export function searchAction(payload){
  return {type: "SEARCH", payload};
}