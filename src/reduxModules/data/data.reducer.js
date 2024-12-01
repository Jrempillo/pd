
import isEmpty from '../../utils/isEmpty';

const dataReducer = {
  addSugarData: (state, action) => {
    if (!isEmpty(action?.payload)){
      state.sugar = [...state.sugar, action?.payload];
    }
  },
  resetSugarData: (state) => {
    state.sugar = [];
  },
  
};

export default dataReducer;
