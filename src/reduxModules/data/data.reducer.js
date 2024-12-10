
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

  addVinegarData: (state, action) => {
    if (!isEmpty(action?.payload)){
      state.vinegar = [...state.vinegar, action?.payload];
    }
  },
  resetVinegarData: (state) => {
    state.vinegar = [];
  },

  addWineData: (state, action) => {
    if (!isEmpty(action?.payload)){
      state.wine = [...state.wine, action?.payload];
    }
  },
  resetWineData: (state) => {
    state.wine = [];
  },
  
};

export default dataReducer;
