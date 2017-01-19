import React, {Component} from 'react';
import {connectProfile} from '../auth';
import './EditProfile.css';
import { Panel } from 'react-bootstrap';

class EditProfile extends Component {
  static propTypes = {
    ...connectProfile.PropTypes
  };

  state = {
    error: null,
    saved: false,
    saving: false
  }

  render() {
    const {profile} = this.props;
    // const {saving, saved} = this.state;
    // const user_metadata = profile.user_metadata || {};

    return (
      <Panel className="EditProfile">
        <div className="EditProfile-heading">Your Profile</div>
        <div className="EditProfile-profile">
          <p><strong>Nickname:</strong> {profile.nickname}</p>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          {/*<p><strong>Location:</strong> {user_metadata.location || 'unknown'}</p>*/}
        </div>
{/*        <div className="EditProfile-heading">Edit Profile</div>
        <form className="EditProfile-form" onSubmit={this.onSubmit} onChange={this.onClearSaved}>
          <fieldset className="EditProfile-fieldset" disabled={saving}>
            <label className="EditProfile-locationLabel" htmlFor="location">Location</label>
            <input
              ref={(ref) => this.locationInput = ref}
              className="EditProfile-locationInput"
              id="location"
              type="text"
              placeholder="City or State"
              defaultValue={user_metadata.location}
            />
            <div className="EditProfile-formControls">
              <button className="EditProfile-submitButton" type="submit">
                {saving ? 'Saving...' : 'Save'}
              </button>
              {saved && (
                <div className="EditProfile-saved">Saved</div>
              )}
            </div>
          </fieldset>
        </form>*/}
        <a target="_blank" href="http://privacypolicies.com/privacy/view/obtS7k">Privacy policy</a>
      </Panel>
    );
  }

/*  onSubmit = (event) => {
    event.preventDefault();

    this.setState({saving: true}, async () => {
      const error = await this.props.onUpdateProfile({
        user_metadata: {
          location: this.locationInput.value
        }
      });

      this.setState({error, saved: !error, saving: false});
    });
  }

  onClearSaved = (event) => {
    this.setState({saved: false});
  }*/
}

export default connectProfile(EditProfile);
