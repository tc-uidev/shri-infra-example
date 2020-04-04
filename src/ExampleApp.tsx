import React from 'react';
import { connect } from 'react-redux';
import { ExampleStore } from './reducers';
import { AnyAction, Dispatch } from 'redux';

interface ExampleAppProps {
    showCopyMessage?: boolean;
    autocomplete?: string;

    onPing: () => AnyAction,
    onLoad: () => AnyAction,
    onCopy: () => AnyAction,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => AnyAction,
}

export const ExampleApp: React.FC<ExampleAppProps> = (props) => <div>
    <div>
        <button onClick={props.onPing}>PING</button>
    </div>
    <div>
        <button onClick={props.onLoad}>LOAD</button>
    </div>
    <div>
        <button onClick={props.onCopy}>COPY</button>
        {props.showCopyMessage ? <div>Информация скопирована в буфер обмена</div> : undefined}
    </div>
    <div>
        <input onChange={props.onChange}></input>
        {props.autocomplete}
    </div>
</div>;

const mapState = (store: ExampleStore) => ({
    showCopyMessage: store.showCopyMessage,
    autocomplete: store.autocomplete,
});

const mapDispatch = (dispatch: Dispatch) => ({
    onPing: () => dispatch({ type: 'PING' }),
    onLoad: () => dispatch({ type: 'LOAD' }),
    onCopy: () => dispatch({ type: 'COPY' }),
    onChange: (e: any) => dispatch({ type: 'CHANGE', value: e.target.value }),
});

export const ExampleAppContainer = connect(mapState, mapDispatch)(ExampleApp);