import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button, message, Popconfirm } from "antd";
import {
  getProfile,
  createProfile,
  deleteAccount,
} from "../../../actions/profileActions";
import { decodeUser } from "../../../utils";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    address: "",
    bio: "",
    website: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
    twitter: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth, profile: profileData } = useSelector((state) => ({
    auth: state.auth,
    profile: state.profile,
  }));

  const { address, bio, website, facebook, linkedin, youtube, instagram, twitter } = formData;

  useEffect(() => {
    const userId = decodeUser().user.id;
    dispatch(getProfile(userId));
  }, [dispatch]);

  useEffect(() => {
    if (profileData.profile) {
      const profile = profileData.profile;
      setProfile(profile);
      setFormData({
        address: profile.address,
        bio: profile.bio,
        website: profile.website,
        facebook: profile.socialMedia.facebook,
        linkedin: profile.socialMedia.linkedin,
        youtube: profile.socialMedia.youtube,
        instagram: profile.socialMedia.instagram,
        twitter: profile.socialMedia.twitter,
      });
    }
  }, [profileData]);

  const showModal = () => setVisible(true);
  const handleOk = () => setVisible(false);
  const handleCancel = () => setVisible(false);

  const confirm = (e) => {
    e.preventDefault();
    dispatch(deleteAccount(navigate));
  };

  const cancel = () => {
    message.error("Nothing has been done to your account");
  };

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!address) {
      return message.error("Your Address field is required");
    }
    if (!bio) {
      return message.error("Your Bio field is required");
    }

    dispatch(createProfile(formData, navigate));
    window.location.reload();
  };

  const displayProfile = (profile) => (
    <div className="custom-border">
      <div className="container" style={{ marginTop: "2rem" }}>
        <span>
          <label>
            <h4>Address: </h4>
          </label>
          <h4 className="inline-padding">{profile.address}</h4>
        </span>
        <br />
        <span>
          <label>
            <h4>Bio: </h4>
          </label>
          <h4 className="inline-padding">{profile.bio}</h4>
        </span>
        <br />
        <span>
          <label>
            <h4>Website: </h4>
          </label>
          <h4 className="inline-padding">{profile.website}</h4>
        </span>
        <h4>Social Links</h4>
        <div>
          <ul>
            <li>
              <h5>{profile.socialMedia.facebook ? profile.socialMedia.facebook:""}</h5>
            </li>
            <li>
              <h5>{profile.socialMedia.instagram?profile.socialMedia.instagram:""}</h5>
            </li>
            <li>
              <h5>{profile.socialMedia.twitter?profile.socialMedia.twitter:""}</h5>
            </li>
            <li>
              <h5>{profile.socialMedia.youtube?profile.socialMedia.youtube:""}</h5>
            </li>
            <li>
              <h5>{profile.socialMedia.linkedin?profile.socialMedia.linkedin:""}</h5>
            </li>
          </ul>
        </div>
        <br />
        <button className="btn btn-primary" onClick={showModal}>Edit Profile</button>
        <Popconfirm
          title="This will delete all your records with eShop. Do you want to proceed?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <button className="btn btn-primary">Delete your Record</button>
        </Popconfirm>
      </div>
    </div>
  );

  return (
    <div className="container">
      <h2>Welcome {auth.user.name}</h2>
      {profile ? (
        <Fragment>
          <h4>This is your present profile</h4>
          {displayProfile(profile)}
        </Fragment>
      ) : (
        <Fragment>
          <span style={{ paddingRight: "2%" }}>You currently don’t have a profile</span>
          <Link className="btn btn-primary" to="/dashboard/addProfile">Create Profile</Link>
        </Fragment>
      )}
      <Modal
        title="Edit Profile"
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>Cancel</Button>,
          <Button key="submit" type="primary" onClick={onSubmit}>Edit Profile</Button>,
        ]}
      >
        <form className="form">
          <div className="form-group modal-input">
            <input
              style={{ width: "450px" }}
              type="text"
              name="address"
              value={address}
              onChange={onChange}
            />
            <small className="form-text">Give us the address of your company</small>
          </div>
          <div className="form-group modal-input">
            <input
              style={{ width: "450px" }}
              type="text"
              name="website"
              value={website}
              onChange={onChange}
            />
            <small className="form-text">Complete if you have a company website</small>
          </div>
          <div className="form-group">
            <textarea
              style={{ width: "450px" }}
              name="bio"
              value={bio}
              onChange={onChange}
            ></textarea>
            <small className="form-text">Tell us a little about your business</small>
          </div>
          <div className="form-group social-input">
            <i className="fab fa-twitter fa-2x"></i>
            <input
              style={{ width: "380px" }}
              type="text"
              name="twitter"
              value={twitter}
              onChange={onChange}
            />
          </div>
          {/* Repeat for other social media fields */}
        </form>
      </Modal>
    </div>
  );
};

export default Profile;
