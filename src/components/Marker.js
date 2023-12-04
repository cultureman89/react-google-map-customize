import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PlaceIcon from '@material-ui/icons/Place';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { SET_SELECTED_PLACE, SET_HOVER_PLACE } from '../reducers/MapAction';

const styles = {
  popup: {
    position: 'absolute',
    marginTop: '100px',
    left: 5,
    width: 300,
    zIndex: 1000,
    opacity: 100,
    overflow: 'scroll',
    cursor: 'pointer',
    '&:before': {
      content: "' '", //eslint-disable-line
      position: 'absolute',
      left: '0px',
    },
  },
};

class Marker extends Component {
  componentDidMount() {
    this.updatePopupPosition();
  }

  componentDidUpdate() {
    this.updatePopupPosition();
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.place.key !== this.props.place.key) {
      return true;
    }

    if (nextProps.selected !== this.props.selected) {
      return true;
    }

    if (nextProps.hover !== this.props.hover) {
      return true;
    }

    return false;
  }

  updatePopupPosition() {
    if (this.popupRef) {
      this.popupRef.style.top = 0 - this.popupRef.clientHeight - 60 + 'px';
      this.popupRef.style.opacity = 1;
    }
  }

  onHoverPlace = (place) => {
    if (!this.props.selected) {
      this.props.onHoverPlace(place);
    }
  };

  onSelectPlace = () => {
    if (!this.props.selected) {
      this.props.onSelectPlace(this.props.place);
    }
  };

  render() {
    const { place, hover } = this.props;
    const size = 'default';
    console.log(place, '==========')

    return (
      <div>
        <PlaceIcon
          style={{
            color: 'darkred',
            cursor: 'pointer',
            position: 'absolute',
            left: -10,
            top: 0,
          }}
          fontSize={size}
          onMouseEnter={() => this.onHoverPlace(place)}
          onMouseLeave={() => this.onHoverPlace(null)}
        />
        {hover && (
          <div
            ref={(ref) => (this.popupRef = ref)}
            className={this.props.classes.popup}
            onMouseEnter={() => this.onHoverPlace(place)}
            onMouseLeave={() => this.onHoverPlace(null)}
            onClick={() => alert('clicked')}
          >
            <div style={{ padding: 8, backgroundColor: 'white' }}>

              <Typography variant="subtitle2">{place.name}</Typography>
              <div>
                <img src={place.backgroundImageURL} style={{ width: '30px', height: '30px', borderRadius: '30px', float: 'left'}} />
                <Typography>{place.name}</Typography>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

Marker.propTypes = {
  place: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
  hover: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  onHoverPlace: PropTypes.func.isRequired,
  onSelectPlace: PropTypes.func.isRequired,
  closePopup: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapActionToProps = (dispatch) => ({
  closePopup: () =>
    dispatch({
      type: SET_SELECTED_PLACE,
      place: null,
    }),
  onSelectPlace: (place) =>
    dispatch({
      type: SET_SELECTED_PLACE,
      place,
    }),
  onHoverPlace: (place) =>
    dispatch({
      type: SET_HOVER_PLACE,
      place,
    }),
});

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Marker));
