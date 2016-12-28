import store from 'store';
import abortRequest from 'actions/abortRequest';

const storeMixin = {
    getInitialState() {
        return store.getState();
    },

    componentWillMount() {
        this.store = store;
        this.unsubscribe = store.subscribe(this.handleStoreChange);
    },

    componentWillUnmount() {
        this.unsubscribe();
        this.state.net.isProcessing && this.store.dispatch(abortRequest(this.request));
    },

    handleStoreChange() {
        this.setState(this.store.getState());
    }
};

export default storeMixin;
