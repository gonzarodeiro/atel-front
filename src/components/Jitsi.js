import React, { Component } from "react";

class Jitsi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: "aasdasdasd",
      user: { name: "augusto" },
      isAudioMuted: false,
      isVideoMuted: false,
      domain: "meet.jit.si",
    };
  }
  api = {};

  startMeet = () => {
    const options = {
      roomName: this.state.room,
      configOverwrite: { prejoinPageEnabled: false },
      interfaceConfigOverwrite: {
        // overwrite interface properties
      },
      parentNode: document.querySelector("#jitsi-iframe"),
      userInfo: { displayName: this.state.user.name },
      max_participants: 2,
    };
    this.api = new window.JitsiMeetExternalAPI(this.state.domain, options);
    this.api.addEventListeners({
      readyToClose: this.handleClose,
      participantLeft: this.handleParticipantLeft,
      participantJoined: this.handleParticipantJoined,
      videoConferenceJoined: this.handleVideoConferenceJoined,
      videoConferenceLeft: this.handleVideoConferenceLeft,
      audioMuteStatusChanged: this.handleMuteStatus,
      videoMuteStatusChanged: this.handleVideoStatus,
      participantRoleChanged: this.participantRoleChanged,
    });
  };

  participantRoleChanged = () => {
    this.api.executeCommand("password", "hola");
  };

  handleClose = () => {
    console.log("handleClose");
  };

  handleParticipantLeft = async (participant) => {
    console.log("handleParticipantLeft", participant); // { id: "2baa184e" }
    const data = await this.getParticipants();
    console.log(data);
  };

  handleParticipantJoined = async (participant) => {
    console.log("handleParticipantJoined", participant); // { id: "2baa184e", displayName: "Shanu Verma", formattedDisplayName: "Shanu Verma" }
    const data = await this.getParticipants();
    console.log(data);
  };

  handleVideoConferenceJoined = async (participant) => {
    console.log("handleVideoConferenceJoined", participant); // { roomName: "bwb-bfqi-vmh", id: "8c35a951", displayName: "Akash Verma", formattedDisplayName: "Akash Verma (me)"}
    const data = await this.getParticipants();
    console.log(data);
  };

  handleVideoConferenceLeft = () => {
    console.log("handleVideoConferenceLeft");
    this.api.dispose();
    // document.location.href = window.location.origin + '#/thank-you';
  };

  handleMuteStatus = (audio) => {
    console.log("handleMuteStatus", audio); // { muted: true }
  };

  handleVideoStatus = (video) => {
    console.log("handleVideoStatus", video); // { muted: true }
  };

  getParticipants() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.api.getParticipantsInfo()); // get all participants
      }, 500);
    });
  }

  componentDidMount() {
    window.JitsiMeetExternalAPI
      ? this.startMeet()
      : alert("JitsiMeetExternalAPI not loaded");
  }

  render() {
    return (
      <div style={{ height: "350px", width: "400px" }} id="jitsi-iframe"></div>
    );
  }
}

export default Jitsi;
