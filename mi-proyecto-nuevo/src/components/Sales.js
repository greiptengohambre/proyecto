import React from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import config from "./../helpers/config.json";

class Sales extends React.Component{
    state ={
        clientList: [],
        productList: []
    }

    componentDidMount(){
        const requestOptions = {
            method: 'GET', headers : {'Content-Type':'application/json'}
        };
        fetch(config.apiURL+ "clients/"+config.operatorId,requestOptions).then((response)=>{
            return response.json();
        }).then((result)=>{
            this.setState({clientList: result.data.map((client)=>{return client;}) });
        });

        fetch(config.apiURL+ "products/"+config.operatorId,requestOptions).then((response)=>{
            return response.json();
        }).then((result)=>{
            this.setState({productList: result.data.map((product)=>{return product;}) });
        });
        }
        render(){
            const {clientList, productList} = this.state;
            return(
            <div className ='content-wrapper'>
                <section className = 'content-header'>
                </section>
                <section className = 'content'>
                    <div className = 'card'>
                        <div className = 'card-body'>
                            <div className = 'row'>
                                <div className = 'col-10'>
                                    <div className = 'form-group'>
                                        <label className = 'control-label'>Cliente</label>
                                        <select name = 'client' id = 'client' className = 'form-control'>
                                            <option value = "0">
                                                --Seleccione
                                            </option>
                                            {clientList.map(client =>(
                                                <option key = {client.id} value = {client.id}>
                                                    {client.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className = "col-2"></div>
                            </div>
                            <div className = 'row'>
                                <div className = 'col-10'>
                                    <div className = 'form-group'>
                                        <label className = 'control-label'>Producto</label>
                                        <select name = 'product' id = 'product' className = 'form-control'>
                                            <option value = "0">
                                                --Seleccione
                                            </option>
                                            {productList.map(product =>(
                                                <option key = {product.id} value = {product.id}>
                                                    {product.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className = "col-2"></div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            )
        }
    
}

export default Sales;