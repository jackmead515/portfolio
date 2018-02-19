import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigateAdmin } from '../../../../actions/menu';

class AdminNavigator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: ''
    }
  }

  render() {
    const { onClickLogOut, onClickBack, onEnterSearch } = this.props;

    return (
      <div className="adminnavigator__container">
        <button style={{marginLeft: 5}} className="adminnavigator__button" onClick={() => onClickLogOut()}>Logout</button>
        <button style={{marginLeft: 5}} className="adminnavigator__button" onClick={() => onClickBack()}>Back</button>
        <input
          type="text"
          className="adminnavigator__input"
          placeholder="Search..."
          value={this.state.searchValue}
          onChange={(e) => {
            let { searchValue } = this.state;
            searchValue = e.target.value;
            this.setState({searchValue});
          }}
          onKeyPress={(key) => onEnterSearch(key, this.state.searchValue)}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state };
}

export default connect(mapStateToProps)(AdminNavigator);
