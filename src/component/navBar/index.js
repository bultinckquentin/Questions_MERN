import React from 'react';
import {Button} from 'react-bootstrap';

export default class Example extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Button bsStyle="primary" href="http://localhost:3333/auth/google">Login with Google</Button>
                <Button bsStyle="primary" href="http://localhost:3333/auth/google">G</Button>
            </div>
        );
    }
}