import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Workplace extends Component {
    static displayName = Workplace.name;

    constructor(props) {
        super(props);

        this.state = {
            workplace: {},
            loading: true
        };
    }

    componentDidMount() {
        const { id } = this.props.match.params
        console.log("id", id)
        
        this.populateWorkplace(id);
    }

    static renderWorkplaceData(workplace) {
        if (workplace.errors) {
            // TODO: Handle Errors
            return null;
        }
        
        const { name, description, rate, address } = workplace
        
        return (
            <div>
                <h1>{ name }</h1>
                <h2>{ description }</h2>
                <p>Address: { address }</p>
                <p>Rate: { rate }</p>

                <Link to="/workplaces">
                    <button className="btn btn-default float-right">
                        Back to All
                    </button>
                </Link>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Workplace.renderWorkplaceData(this.state.workplace);

        return (
            <div>
                {contents}
            </div>
        );
    }

    async populateWorkplace(workplaceId) {
        try {
            const response = await fetch(`api/Workplaces/${workplaceId}`, {
                headers: {}
            });

            const data = await response.json()
            console.log("data", data)

            
            this.setState({ workplace: data, loading: false });
        } catch (error) {
            console.log("error", error)
            
        }
        

        
        
        
    }
}
