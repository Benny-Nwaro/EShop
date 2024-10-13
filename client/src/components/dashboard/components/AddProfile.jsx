import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { createProfile } from "../../../actions/profileActions";

const AddProfile = () => {
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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { address, bio, website, facebook, twitter, linkedin, youtube, instagram } = formData;

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
  };

  return (
    <div>
      <section className="container">
        <h1 className="large text-primary">Create Your Profile</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Let's get some information to make your profile stand out
        </p>
        <small>* is a required field</small>
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Address"
              name="address"
              value={address}
              onChange={onChange}
            />
            <small className="form-text">Give us the address of your company</small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Website"
              name="website"
              value={website}
              onChange={onChange}
            />
            <small className="form-text">Complete if you have a company website</small>
          </div>

          <div className="form-group">
            <textarea
              placeholder="A short description of your business"
              name="bio"
              value={bio}
              onChange={onChange}
            ></textarea>
            <small className="form-text">Tell us a little about your business</small>
          </div>

          <div className="my-2">
            <button type="button" className="btn btn-light">
              Add Social Network Links
            </button>
            <span>Optional</span>
          </div>

          <div className="form-group social-input">
            <i className="fab fa-twitter fa-2x"></i>
            <input
              type="text"
              placeholder="Twitter Link"
              name="twitter"
              value={twitter}
              onChange={onChange}
            />
          </div>

          <div className="form-group social-input">
            <i className="fab fa-facebook fa-2x"></i>
            <input
              type="text"
              placeholder="Facebook Link"
              name="facebook"
              value={facebook}
              onChange={onChange}
            />
          </div>

          <div className="form-group social-input">
            <i className="fab fa-youtube fa-2x"></i>
            <input
              type="text"
              placeholder="YouTube Link"
              name="youtube"
              value={youtube}
              onChange={onChange}
            />
          </div>

          <div className="form-group social-input">
            <i className="fab fa-linkedin fa-2x"></i>
            <input
              type="text"
              placeholder="Linkedin Link"
              name="linkedin"
              value={linkedin}
              onChange={onChange}
            />
          </div>

          <div className="form-group social-input">
            <i className="fab fa-instagram fa-2x"></i>
            <input
              type="text"
              placeholder="Instagram Link"
              name="instagram"
              value={instagram}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary my-1">Submit</button>
          <Link className="btn btn-light my-1" to="/dashboard/profile">
            <i className="fas fa-undo-alt"></i> Go Back
          </Link>
        </form>
      </section>
    </div>
  );
};

export default AddProfile;
