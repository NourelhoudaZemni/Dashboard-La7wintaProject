import { createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import { queryApi} from "../../utils/queryApi";
let initialState = {
events: [],
selectedEvent: {},
deletedEvent:"",
errors: "",
};

const eventSlice = createSlice({
name: "events",
initialState,
reducers: {
populateEvent(state, action) {
    
state.events = action.payload;
},
selectEvent(state, action) {
state.selectedEvent = action.payload;
},
unselectEvent(state) {
state.selectedProduct = null;
},
deleteEvent: (state, action) => {
state.deletedEvent=action.payload
},


setErrors(state, action) {
state.errors = action.payload;
},
},

});
export const fetchEvents = () => async (dispatch) => {
const [res, error] = await queryApi("event/all?searchValue");
console.log(res)
if (error) {
dispatch(setErrors(error));
} else {
    
dispatch(populateEvent(res));
}
};
export const deleteEvents = (id) => async (dispatch) => {
    const res = await axios.delete(`http://localhost:5000/event/delete/${id}`);
    console.log(res)
    
        
    dispatch(deleteEvent(res));
    }
    
export const selectEvent = (state) => {
return [state.events.events, state.events.errors];
};
export const deleteEventfunction = (state) => {
    return [state.events.deletedEvent, state.events.errors];

    
    };
export const selectSelectedProduct = (state) => {
return state.products.selectedProduct;
};
export const {
populateEvent,
selectProduct,
unselectProduct,
setErrors,
deleteEvent,
updateProduct,
addProduct,
} = eventSlice.actions;
export default eventSlice.reducer;