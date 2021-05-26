import { createGlobalStyle } from 'styled-components';

const global = createGlobalStyle`
* {
    font-family: 'Open Sans', sans-serif;
  }

  .black-cast {
    position: fixed;
    visibility: hidden;
    z-index: 999;
    top: 65px;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    background-color: #1d252d;
    opacity: .81;
  }

  .logo{
    padding-bottom: 10px;
    padding-left: 22px;
    padding-right: 18px;
    height: 33px;
  }

  body {
    color: #2a3f54;
  }

  .border-left-custom {
    border-left: solid 3px #dd4b39;
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


  .login .logo-container {
    vertical-align: middle;
    margin-right: 15px;
    margin-left: 85px;
    position: absolute;
    top: 70px;
  }

  @media(max-width: 550px) {
        .login .panel-primary {
            width: 100% !important;
        }
    }

    .tittle {
        font-size: 30px;
        font-weight: 600;
        letter-spacing: -0.39px;
        margin-top: 18px;
        margin-bottom: 40px;
        color: #1b252e;
        width: 85%;
    }

`;

export default global;
