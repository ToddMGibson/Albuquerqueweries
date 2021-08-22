import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export class BrewerySearch extends Component {
  
  constructor(props) {
    super(props);
    this.state = { breweries: [], loading: true };
  }

  componentDidMount() {
    this.populateBrewerySearchData();
  }

  static renderBreweryTable(breweries) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Address</th>
            <th><center>Website</center></th>
            <th><center>Map</center></th>
          </tr>
        </thead>
        <tbody>
                {breweries.map((brewery) =>
                    <tr key={brewery.Id}>
                        <td><i>{brewery.promotedText}</i>{brewery.breweryName}</td>
                        <td>{brewery.breweryType}</td>
                        <td>{brewery.streetAddress}<br />{brewery.cityStateZip}</td>
                        <td><center>{(brewery.website == null || brewery.website.length == 0) ? "-" : <Link to={{ pathname: brewery.website }} target="_blank">Visit</Link>}</center></td>
                        <td><center>{(brewery.latitude == null || brewery.longitude == null) ? "-" : <Link to={{ pathname: "/details", state: { brewery: brewery } }}>Map It</Link>}</center></td>
                    </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
        : BrewerySearch.renderBreweryTable(this.state.breweries);

    return (
      <div>
        <h1 id="tabelLabel" >Albuquerque Breweries</h1>
        {contents}
      </div>
    );
  }

    async populateBrewerySearchData() {
    const response = await fetch('brewerysearch');
    const data = await response.json();
    this.setState({ breweries: data, loading: false });
  }
}
