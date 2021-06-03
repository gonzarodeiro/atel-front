import React, { Component } from "react";

class Jitsi extends Component {
  constructor(props) {
    super(props);
    this.state = {
<<<<<<< HEAD
      room: "aasdasdasd",
      user: { name: "augusto" },
      isAudioMuted: false,
      isVideoMuted: false,
      domain: "meet.jit.si",
=======
      room: props.room,
      user: { name: props.userName },
      isAudioMuted: false,
      isVideoMuted: false,
      domain: 'meet.jit.si'
>>>>>>> development
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
<<<<<<< HEAD
      parentNode: document.querySelector("#jitsi-iframe"),
      userInfo: { displayName: this.state.user.name },
      max_participants: 2,
=======
      parentNode: document.querySelector('#jitsi-iframe'),
      userInfo: { displayName: this.state.user.name }
>>>>>>> development
    };
    this.api = new window.JitsiMeetExternalAPI(this.state.domain, options);
    this.api.addEventListeners({
      readyToClose: this.handleClose,
      participantLeft: this.handleParticipantLeft,
      participantJoined: this.handleParticipantJoined,
      videoConferenceJoined: this.handleVideoConferenceJoined,
      videoConferenceLeft: this.handleVideoConferenceLeft,
      audioMuteStatusChanged: this.handleMuteStatus,
<<<<<<< HEAD
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
=======
      videoMuteStatusChanged: this.handleVideoStatus
    });
  };

  handleClose = () => {
    console.log('handleClose');
  };

  handleParticipantLeft = async (participant) => {
    console.log('handleParticipantLeft', participant); // { id: "2baa184e" }
>>>>>>> development
    const data = await this.getParticipants();
    console.log(data);
  };

  handleParticipantJoined = async (participant) => {
<<<<<<< HEAD
    console.log("handleParticipantJoined", participant); // { id: "2baa184e", displayName: "Shanu Verma", formattedDisplayName: "Shanu Verma" }
=======
    console.log('handleParticipantJoined', participant); // { id: "2baa184e", displayName: "Shanu Verma", formattedDisplayName: "Shanu Verma" }
>>>>>>> development
    const data = await this.getParticipants();
    console.log(data);
  };

  handleVideoConferenceJoined = async (participant) => {
<<<<<<< HEAD
    console.log("handleVideoConferenceJoined", participant); // { roomName: "bwb-bfqi-vmh", id: "8c35a951", displayName: "Akash Verma", formattedDisplayName: "Akash Verma (me)"}
=======
    console.log('handleVideoConferenceJoined', participant); // { roomName: "bwb-bfqi-vmh", id: "8c35a951", displayName: "Akash Verma", formattedDisplayName: "Akash Verma (me)"}
>>>>>>> development
    const data = await this.getParticipants();
    console.log(data);
  };

  handleVideoConferenceLeft = () => {
<<<<<<< HEAD
    console.log("handleVideoConferenceLeft");
=======
    console.log('handleVideoConferenceLeft');
>>>>>>> development
    this.api.dispose();
    // document.location.href = window.location.origin + '#/thank-you';
  };

  handleMuteStatus = (audio) => {
<<<<<<< HEAD
    console.log("handleMuteStatus", audio); // { muted: true }
  };

  handleVideoStatus = (video) => {
    console.log("handleVideoStatus", video); // { muted: true }
=======
    console.log('handleMuteStatus', audio); // { muted: true }
  };

  handleVideoStatus = (video) => {
    console.log('handleVideoStatus', video); // { muted: true }
>>>>>>> development
  };

  getParticipants() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.api.getParticipantsInfo()); // get all participants
      }, 500);
    });
  }

<<<<<<< HEAD
  componentDidMount() {
    window.JitsiMeetExternalAPI
      ? this.startMeet()
      : alert("JitsiMeetExternalAPI not loaded");
  }

  render() {
    return (
      <div style={{ height: "350px", width: "400px" }} id="jitsi-iframe"></div>
    );
=======
  executeCommand(command) {
    this.api.executeCommand(command);
    if (command === 'hangup') return this.props.history.push('/thank-you');
    if (command === 'toggleAudio') this.setState({ isAudioMuted: !this.state.isAudioMuted });
    if (command === 'toggleVideo') this.setState({ isVideoMuted: !this.state.isVideoMuted });
  }

  componentDidMount() {
    window.JitsiMeetExternalAPI ? this.startMeet() : alert('JitsiMeetExternalAPI not loaded');
  }

  render() {
    return <div style={{ height: '250px', width: '300px' }} id='jitsi-iframe'></div>;
>>>>>>> development
  }
}

export default Jitsi;
