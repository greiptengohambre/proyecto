import React from 'react';
import {Link} from 'react-router-dom';
import Sidebar from '../Sidebar';
import Topbar from '../Topbar';
import config from './../../helpers/config.json';

class UsersAdmin extends React.Component{
    state={
        userList:[]
    }
    componentDidMount(){
        const requestOptions= {
            method:'GET', headers:{'Content-Type':'application/json'}
        };
        fetch(config.apiURL+ "users/"+config.operatorId,requestOptions).then((response)=>{
            return response.json();
        }).then((result)=>{
            this.setState({userList: result.data.map((user)=>{return user;}) });
        });
    }
    render(){
        let rowData;
        if (this.state.userList.length === 0) {
            rowData = <tr><td colSpan = "4" className = "text-center">No existen usuarios</td></tr>
        } else {
            rowData = this.state.userList.map(u=>{
                let button;
                if (u.active) {
                    button = <button className= "btn-btn-secondary"><i className = "fas fa-eye-slash"></i>Deshabilitar</button>
                } else {
                    button = <button className= "btn-btn-secondary"><i className = "fas fa-eye"></i>Habilitar</button>
                }
                return(<tr>
                <td>{u.name}</td><td className="text-right">{u.id}</td>
                    <td>
                        {button}
                    </td>
                </tr>
                )
            })
                
        }
    }
}

export default UsersAdmin;