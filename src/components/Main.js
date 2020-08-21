import React, { Component, useState } from "react";
import { Linking } from "react-native";
import {
  ViroARScene,
  ViroARTrackingTargets,
  ViroText,
  ViroFlexView,
  ViroARImageMarker,
  ViroNode,
  ViroImage,
  ViroVideo,
  ViroAnimations,
} from "react-viro";
import ImgMarker from "./ImgMarker";
const axios = require("axios");

export default class Main extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     anchorFound: false,
  //     config: {
  //       email: "",
  //       facebook: "",
  //       phone: "",
  //       targetImage: "https://www.w3schools.com/w3css/img_lights.jpg",
  //       video: "",
  //       name: "",
  //       largeImage: "",
  //       color: "#fff",
  //       avatarImageUrl: "",
  //       profileUrl: "",
  //     },
  //     loaded: false,
  //   };
  // }
  constructor(props) {
    super(props);
    this.state = {
      profiles: [],
      loaded: false,
    };
  }

  componentDidMount() {
    axios
      .get(
        "https://us-central1-viro-ar-card.cloudfunctions.net/app/api/profiles"
      )
      .then(({ data }) => {
        console.log(data);
        this.setState({ ...this.state, profiles: data, loaded: true });
        // const {
        //   email,
        //   facebook,
        //   targetImageUrl: targetImage,
        //   videoUrl: video,
        //   name,
        //   textColor: color,
        //   largeImageUrl: largeImage,
        //   avatarImageUrl,
        //   profileUrl,
        // } = data[0].doc;
        // this.setState({
        //   ...this.state,
        //   loaded: true,
        //   config: {
        //     email,
        //     facebook,
        //     targetImage,
        //     video,
        //     name,
        //     color,
        //     largeImage,
        //     avatarImageUrl,
        //     profileUrl,
        //   },
        // });
        // ViroARTrackingTargets.createTargets({
        //   businessCard: {
        //     source: { uri: targetImage },
        //     orientation: "Up",
        //     physicalWidth: 0.05,
        //   },
        // });
      });
  }

  render() {
    const { profiles, loaded } = this.state;
    return (
      <ViroARScene>
        {loaded &&
          profiles.map((pr) => {
            const {
              targetImageUrl,
              userId,
              name,
              avatarImageUrl,
              largeImageUrl,
              videoUrl,
              email,
              facebook,
              phone,
            } = pr.doc;
            return (
              <ImgMarker
                key={userId}
                id={pr.id}
                targetImage={targetImageUrl}
                userId={userId}
                name={name}
                avatarUrl={avatarImageUrl}
                largeImageUrl={largeImageUrl}
                videoUrl={videoUrl}
                email={email}
                phone={phone}
                facebook={facebook}
              />
            );
          })}
      </ViroARScene>
    );
  }
}

// ViroARTrackingTargets.createTargets({
//   businessCard: {
//     source: { uri: "https://www.w3schools.com/w3css/img_lights.jpg" },
//     orientation: "Up",
//     physicalWidth: 0.05,
//   },
// });
