import React, { Component } from 'react';

import authService from './../components/api-authorization/AuthorizeService'

import { Link } from 'react-router-dom';

export class Workplaces extends Component {
    static displayName = Workplaces.name;

    constructor(props) {
        super(props);
        
        this.state = {
            workplaces: [],
            currentUser: null,
            loading: true
        };
    }

    componentDidMount() {
        this.getUser();
        this.populateWorkplaces();
    }

    static renderWorkplacesData(workplaces) {
        return (
            <table className='table table-striped'>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Rate</th>
                </tr>
                </thead>
                <tbody>
                {workplaces && workplaces.map(workplace =>
                    <tr key={workplace.name}>
                        <td key={`workplace-${workplace.id}`}>
                            <Link to={`/workplaces/${workplace.id}`}>
                                {workplace.name}
                            </Link>
                        </td>
                        <td>{workplace.rate}</td>
                    </tr>
                )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Workplaces.renderWorkplacesData(this.state.workplaces);
            
        const { currentUser } = this.state

        return (
            <div>
                <div className="row">
                    <div className="col-10"><h1>Workplaces</h1>
                        <p>
                            Find the Workplace with the best
                            Wifi Connection in London
                        </p>
                    </div>

                    <div className="col-2">
                        {currentUser && (
                            <Link to="/workplaces/new">
                                <button className="btn btn-primary float-right">
                                    Add a Workplace
                                </button>
                            </Link>
                        )}
                    </div>
                </div>


                {contents}
            </div>
        );
    }

    async populateWorkplaces() {
        const response = await fetch('api/Workplaces', {
            headers: {}
        });

        const data = await response.json();
        
        this.setState({ workplaces: data, loading: false });
    }
    
    async getUser() {
        const currentUser = await authService.getUser()

        
        return !!currentUser 
        ? this.setState({ currentUser })
        : null
    }
}
