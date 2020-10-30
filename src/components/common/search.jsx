import React, { Component } from 'react';
import { FcSearch } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { TeamContext } from '../../providers/TeamProvider';

class Search extends Component {
  static contextType = TeamContext;

  constructor(props) {
    super(props);
    this.state = { suggestions: [], text: '', items: [] };
  }

  componentDidMount() {
    const { currentTeam } = this.context;
    if (currentTeam) {
      const { bugs } = currentTeam;
      this.setState({ items: bugs });
    }
  }

  onTextChange = (e) => {
    const { value } = e.target;
    const { items } = this.state;
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      suggestions = items.sort().filter((v) => regex.test(v.title));
    }
    this.setState(() => ({ suggestions, text: value }));
  };

  suggestionSelected(value) {
    this.setState(() => ({
      text: value,
      suggestions: [],
    }));
  }

  renderSuggestions() {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <div className="search__list">
        <ul>
          {suggestions.map((bug) => (
            <li key={bug._id}>
              <Link
                to={{
                  pathname: '/bugdetails',
                  state: bug,
                }}
                style={{ color: '#001233', textDecoration: 'none' }}
              >
                <div className="search__bug">
                  <div className="search__bug__title">
                    {' '}
                    {bug.isOpen ? (
                      <div>
                        {bug.title} <span>Open</span>
                      </div>
                    ) : (
                      <div>
                        {bug.title}{' '}
                        <span style={{ background: '#c82333' }}>Closed</span>
                      </div>
                    )}{' '}
                  </div>
                  <p className="search__bug__author">
                    {` Opened on ${bug.date.slice(0, 10)} by 
                  ${bug.createdBy.name}`}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    const { text } = this.state;

    return (
      <div className="search__bar">
        <div className="search__bar__input">
          <input
            type="text"
            value={text}
            onChange={this.onTextChange}
            name="search"
            id="bug_search"
            aria-label="Search all bugs"
            placeholder="Search all bugs"
          />
          <FcSearch className="search_logo" />
        </div>
        {this.renderSuggestions()}
      </div>
    );
  }
}

export default Search;
