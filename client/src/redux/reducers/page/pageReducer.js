import { MARKETS_RECEIVED, VENDORS_RECEIVED, PRODUCE_RECEIVED, PAGE_REQUESTED } from '../../actions/markets/page/pageActionTypes'

const marketState = {
	markets: [],
	isLoading: false
} 

const vendorState = {
	vendors: [],
	isLoading: false
}

const produceState = {
	produce: [],
	isLoading: false
}

export const MarketsReducer = (state = marketState, action) => {
	switch (action.type) {
		case PAGE_REQUESTED:
			return { ...state, isLoading: true };
		case MARKETS_RECEIVED:
			return { ...state, isLoading: false, markets: action.payload };
		default:
			return state;
	}
};

export const VendorsReducer = (state = vendorState, action) => {
	switch (action.type) {
		case PAGE_REQUESTED:
			return { ...state, isLoading: true };
		case VENDORS_RECEIVED:
			return { ...state, isLoading: false, vendors: action.payload }
		default:
			return state
	}
};

export const ProduceReducer = (state = produceState, action) => {
	switch (action.type) {
		case PAGE_REQUESTED:
			return { ...state, isLoading: true };
		case PRODUCE_RECEIVED:
			return { ...state, isLoading: false, produce: action.payload }
		default:
			return state
	}
};
