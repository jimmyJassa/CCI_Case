export function nextReducer(state=[], action){
  if(action === "NEXT_PAGE"){
    return [...state, {action}]
  }
  return state
}

export function prevReducer(state=[], action){
  if(action === "NEXT_PAGE"){
    return [...state, {action}]
  }
  return state
}

export function searchReducer(state=[], action){
  if(action === "NEXT_PAGE"){
    return [...state, {action}]
  }
  return state
}

