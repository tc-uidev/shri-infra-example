import { AnyAction } from 'redux';

export interface ExampleStore {
    showCopyMessage?: boolean;
    autocomplete?: string;
}

export const rootReducer = (store: ExampleStore = { }, action: AnyAction) => {
    switch (action.type) {
        case 'COPY': 
            return { showCopyMessage: true };
        case 'DONE': 
            return { showCopyMessage: false };
        case 'SUGGEST': {
            return { 
                autocomplete: action.value
            };
        }
        default:
            return store;
    }
};