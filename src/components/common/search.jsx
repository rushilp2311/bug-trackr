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
    const { bugs } = currentTeam;
    this.setState({ items: bugs });
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
    console.log(value);
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
          {suggestions.map((item) => (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <li key={item._id}>
              <Link
                to={{
                  pathname: '/bugdetails',
                  state: item,
                }}
                style={{ color: '#001233' }}
              >
                {item.title}
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
