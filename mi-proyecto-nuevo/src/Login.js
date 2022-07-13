import React from 'react';
import {useNavigate} from 'react-router-dom';
import useAuth from './helpers/useAuth';
import config from './helpers/config.json';

const Login=() => {

const {setAuth} = useAuth();
let navigate = useNavigate();

const changeButtonState = (button,enabled) => {
    if(enabled){
        button.disabled = false;
        button.innerHTML = "<i class = 'fa fa-sign-in'></i> Acceder";
    }else{
        button.disabled = true;
        button.innerHTML = "<i class = 'fa fa-spin fa-spinner'></i> Accediendo...";
    }
};

const showMessage = (visible, message) => {
    const messageBox =  document.querySelector('alert');
    const reasonBox = document.querySelector("#reason");
    if(visible){
        reasonBox.innerHTML = message;
        messageBox.classList.remove('d-none')
    }else{
        reasonBox.innerHTML = "";
        messageBox.classList.add("d-none")
    }
}

const logger = async(event) => {
    event.preventDefault();
    const button = document.querySelector('button');
    changeButtonState(button, false);

    var {username, pass} = document.forms[0];
    const user = username.value;
    const password = pass.value;
    if(user.length === 0 || password.length === 0){
        showMessage(true, "Debe completar todos los campos");
        changeButtonState(button,true);
        return;
    }

    const requestOptions = {
        method : 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({nickname: user, password: password, operatorId: config.operatorId})
    }
    
    fetch(config.apiURL+"login", requestOptions).then((response) => {
            switch(response.status){
                case 403:
                    showMessage(true, "Acceso prohibido");
                    changeButtonState(button,true);
                    break;
                case 404:
                    showMessage(true, "Nombre de usuario o clave incorrectos");
                    changeButtonState(button,true);
                    break;
                    default:
                        //
            }
            return response.json();

        }
    ).then((result)=>{
        if(!result.data[0].active){
            showMessage(true, "El usuario está inactivo");
            changeButtonState(button,true);
            return;
        }try{
            const infoData = result.data[0];
            const infoUser = JSON.stringify(infoData);
            showMessage(false, "");
            changeButtonState(button, true)
            localStorage.setItem("user", infoUser);
            const roles = [infoData['level']];
            setAuth({user, password, roles});
            navigate('/sales');
        }catch(error){
            console.log(error);
        }
    }).catch((_error)=>{
        //
    })
}


return (
    <div class="hold-transition login-page">
        <div class="login-box">
            <div class="login-logo">
                <a href="../../index2.html"><b>Cloud</b>Sales</a>
            </div>

            <div class="card">
                <div class="card-body login-card-body">
                    <p class="login-box-msg">Autentífiquese para iniciar sesión</p>
                    <form onSubmit = {logger}>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" name ="username" placeholder="Apodo"/>
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-envelope"></span>
                                </div>
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <input type="password" class="form-control" name = "pass" placeholder="Clave"/>
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-8">

                            </div>
                            <div class="col-4">
                                <button class="btn btn-primary btn-block"> <i class="fa fa-sign-in"></i>Acceder</button>
                            </div>

                        </div>
                    </form>
                    <div class = "alert alert-danger d-none" role = "alert" >
                        <strong>ERROR!</strong>
                        <p id="reason"></p>
                    </div>
                </div>

            </div>
        </div>
    </div>
        )
    }

    export default Login;
