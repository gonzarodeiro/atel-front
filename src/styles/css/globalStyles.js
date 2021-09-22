import { createGlobalStyle } from 'styled-components';

const global = createGlobalStyle`
* {
    font-family: 'Open Sans', sans-serif;
  }

    .headerRight {
    font-size: 15px;
    font-weight: bold;
    text-align: center;
    padding: 9px;
    cursor: pointer;
  }

  .menu {
    display: flex;
    cursor: pointer;
    font-size: 15.4px;
    font-weight: bold;
    border-radius: 27px;
    padding: 6px 18px;
    position: relative;
    background: #202429;
    height: 34px;
  }

  .sidebar-footer {
    bottom: 0px;
    clear: both;
    display: block;
    padding: 5px 0 0 0;
    position: fixed;
    background: #d7d7d7eb;
    width: 291px
}

  .react-datepicker-wrapper,
  .react-datepicker__input-container,
  .react-datepicker__input-container input {
    display: block;
    width: 100%;
    font-weight: 400 !important;
  }

  .react-datepicker__time-container--with-today-button {
    display: inline;
    border: 1px solid #aeaeae;
    border-radius: 0.3rem;
    position: absolute;
    right: -85px !important;
    top: 0;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .card .card-circle {
    width: 7rem;
    height: 7rem;
    border: 2px solid #e0e0e0;
    border-radius: 50%;
  }

  .form-control:focus,
  .swal-content__input:focus {
    border-color: #888 !important;
    border-width: 1px !important;
    box-shadow: none !important;
  }

  .swal-modal {
    overflow: hidden;
  }

  .swal-title {
    margin-top: 0 !important;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, .05);
    -webkit-box-shadow: 0px 0px 10px rgba(0, 0, 0, .05);
    -moz-box-shadow: 0px 0px 10px rgba(0, 0, 0, .05);
    font-size: 22px;
    color: #666;
    font-weight: lighter;
    text-align: left;
  }

  .swal-button {
    background-color: #1976d2;
    color: #fff;
    border: 0;
    text-shadow: none;
  }

  .swal-button:not([disabled]):hover {
    background-color: #17ddc3;
  }

  .swal-button--cancel,
  .swal-button--cancelar {
    background-color: #efefef !important;
    color: #888;
  }

  .menu-white {
    display: flex;
    cursor: pointer;
    font-size: 15.4px;
    font-weight: bold;
    border-radius: 27px;
    background: #fff;
    color:#282f37;
    padding: 6px 19px;
    position: relative;
    height: 34px;
  }

  .collapsible-sidebar.open {
    left: 0;
    visibility: visible;
  }

  .sidebar-item{
    font-weight: 600;
    font-size: 15px;
  }

  .section-title {
    display: flex;
    justify-content: space-between;
    color: #fff;
  }

  @media (min-width: 875px)
  .section-title {
      flex-direction: row;
      margin: 30px 0;
  }

  .section-title>.mobile-company-selector {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px 0 0;
    padding: 0;
  }

  .section-title>.dates {
    display: flex;
    flex-direction: column;
  }

  .menu-item {
    display: flex;
    height: 50px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    align-items: center;
    font-size: 15.4px;
    line-height: 1.5;
    color: #444;
    padding: 12px 19px;
  }

  .layout {
    background-image: linear-gradient(rgb(46, 62, 76),rgb(46, 62, 76) 13%,rgb(55 74 90));
    background-repeat: no-repeat;
    background-position: top;
    background-size: auto 50px;
  }

  .layout, .layout>.content {
    display: flex;
    flex-direction: column;
  }

  .header-height{
    height: 60px;
  }

  .card-body {
    flex: 1 1 auto;
    min-height: 1px;
    padding: 1.10rem !important;
}

  .layout>.content {
    width: 100%;
    min-width: 290px;
    max-width: 1150px;
    margin: 15px auto;
  }

  .dashboard {
    background-image: linear-gradient(103deg,#cacaca  13%, #cacaca );
    background-repeat: no-repeat;
    background-position: top;
    background-size: auto 215px;
  }

  .dashboard, .dashboard>.content {
    display: flex;
    flex-direction: column;
  }

  .dashboard>.content {
    width: 70%;
    min-width: 290px;
    max-width: 1150px;
    margin: 44px auto;
  }

  .collapsible-sidebar {
    position: fixed;
    visibility: hidden;
    background-color: #fff;
    border: 1px solid #e9e9e9;
    top: 60px;
    left: -296px;
    z-index: 9999;
    height: 100%;
    width: 292px;
    overflow-x: hidden;
    transition: .5s;
  }

  .menu-item.active, .collapsible-sidebar>.menu-item:hover:not([href]):not([tabindex]) {
    color: #282f37;
    padding-left: 15px;
    border: 5px #1565c0;
    border-left-style: solid;
    background-color: rgba(65,71,78,.1);
  }

  .black-cast.open {
    visibility: visible;
  }

  .btnOption {
    border-radius: 4px !important;
    padding: 9px 21px !important;
    margin-bottom: 0 !important;
    font-size: 13.2px !important;
    white-space: nowrap !important;
    cursor: pointer !important;
  }

  .btnCancel {
    background: linear-gradient(white, #dedbdb);
    border: 1.2px solid #c7c7c7 !important;
    color: black !important;
  }

  .black-cast {
    position: fixed;
    visibility: hidden;
    z-index: 999;
    top: 60px;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    background-color: #1d252d;
    opacity: .81;
  }

  #hvr-float {
    vertical-align: middle;
    transition: box-shadow 2s ease 1s, transform 0.5s ease 0s;
    transform: perspective(1px) translateZ(0);
    box-shadow: 0px 0px 5px rgba(0, 0, 0, .4);
  }

  #hvr-float:hover,
  #hvr-float:focus,
  #hvr-float:active {
    -webkit-transform: translateY(-8px);
    transform: translateY(-8px);
  }

  .logo{
    padding-bottom: 10px;
    padding-left: 22px;
    padding-right: 18px;
    height: 33px;
  }

  .violet.darken-2 {
    background-color: #ec407a !important;
  }

  .orange.darken-2 {
    background-color: #ff7043 !important;
  }

  .info.darken-2 {
    background-color: #33b5e5 !important;
  }

  body {
    color: #2a3f54;
  }

  .border-left-custom {
    border-left: solid 3px #1976d2;
  }

  .warning {
    margin-bottom: 20px;
    margin-right: 12px;
    text-align: center;
    display: none;
    margin-top: 10px;
  }

  .form-control{
    font-size: 15px !important;
  }

  .errorMessage{
    font-size: 14px;
    font-weight: bold;
  }

  .close{
    display: none;
  }

  .divider{
    border-left: 2px solid #fff;
    font-size: 15px;
  }

  .login {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }

  .login .panel-primary {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 550px;
    height: 100vh;
    background-color: white;
    -webkit-box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
    z-index: 10;
    overflow-y: auto;
    border-top: 8px solid #1565c0;
  }

  .login .title-header {
    color: #1b252e;
    font-size: 20px;
    font-weight: normal;
    line-height: 2;
    margin-top: 40px;
  }

  .login .panel-primary .login-box {
    width: 80%;
    padding-top: 10%;
  }

  .icon {
    margin: 0;
    font-size: 35px;
    line-height: 0;
    vertical-align: bottom;
    padding: 0;
  }

  .borderRed {
    border: 1.5px solid #f44336 !important;
  }

  .fa {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .login .logo-container {
    vertical-align: middle;
    margin-right: 15px;
    margin-left: 85px;
    position: absolute;
    top: 180px;
  }

  @media(max-width: 550px) {
        .login .panel-primary {
            width: 100% !important;
        }
    }

    .tittle {
        font-size: 30px;
        font-weight: 600;
        color: #4d4d4d;
    }

    .tittle-registration{
      font-size: 27px;
      font-weight: 600;
      letter-spacing: -0.39px;
      margin-top: 18px;
      margin-bottom: 23px;
      color: #4d4d4d;
      width: 85%;
    }

    .fade-in {
      opacity: 1;
      animation-name: fadeInOpacity;
      animation-iteration-count: 1;
      animation-timing-function: ease-in;
      animation-duration: 0.5s;
    }


    @keyframes fadeInOpacity {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    
    @media (min-width: 1200px) {
      .container-atel {              
        max-width: 1400px !important;
      }
    }
`;

export default global;
