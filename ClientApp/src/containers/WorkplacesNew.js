import React, { Component } from 'react';
import authService from "../components/api-authorization/AuthorizeService";

export class WorkplacesNew extends Component {
    static displayName = WorkplacesNew.name;

    constructor(props) {
        super(props);

        this.state = {
            workplace: {
                name: '',
                description: '',
                address: '',
                rate: 1
            },
            errors: {},
            loading: false
        };
        
        this.handleOnChange = this.handleOnChange.bind(this)
        this.createNewWorkplace = this.createNewWorkplace.bind(this)
    }
    
    render() {
        const { workplace, errors } = this.state
        
        return (
            <div>
                <h1>Add a new Workplace</h1>

                <form onSubmit={this.createNewWorkplace}>
                    <div className="form-group">
                        <label htmlFor="workplace-name">
                            Workplace Name
                        </label>

                        <input
                            id="workplace-name"
                            className={`form-control ${errors.Name ? 'is-invalid' : ''}`}
                            type="text"
                            name="name"
                            value={workplace.name}
                            onChange={this.handleOnChange}
                        />
                        
                        { errors.Name && (
                            <p className="text-danger">
                                {errors.Name}
                            </p>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="workplace-description">
                            Description
                        </label>

                        <input
                            id="workplace-description"
                            className="form-control"
                            type="text"
                            name="description"
                            value={workplace.description}
                            onChange={this.handleOnChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="workplace-address">
                            Address
                        </label>

                        <input
                            id="workplace-address"
                            className={`form-control ${errors.Address ? 'is-invalid' : ''}`}
                            type="text"
                            name="address"
                            value={workplace.address}
                            onChange={this.handleOnChange}
                        />

                        { errors.Address && (
                            <p className="text-danger">
                                {errors.Address}
                            </p>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="workplace-rate">
                            Rate
                        </label>

                        <input
                            id="workplace-rate"
                            className={`form-control ${errors.Rate ? 'is-invalid' : ''}`}
                            type="number"
                            min="1"
                            max="5"
                            name="rate"
                            value={workplace.rate}
                            onChange={this.handleOnChange}
                        />
                        
                        { errors.Rate && (
                            <p className="text-danger">
                                {errors.Rate}
                            </p>
                        )}
                    </div>

                    <button className="btn btn-success" type="submit">
                        Save
                    </button>
                </form>
            </div>
        );
    }
    
    handleOnChange(event) {
        const { name, value } = event.target
        
        let { workplace } = this.state
        workplace[name] = value
        
        this.setState({ workplace })
    }

    async createNewWorkplace(event) {
        event.preventDefault()
        
        const token = await authService.getAccessToken();
        const { workplace } = this.state
        
        await this.setState({ loading: true, errors: {} })
        
        const response = await fetch('api/Workplaces', {
            method: 'POST',
            headers: !token ? {} : { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(workplace)
        });

        const data = await response.json();

        data.errors
        ? this.setState({errors: data.errors, loading: false })
        : this.setState({ workplace: data, loading: false })
    }
}
