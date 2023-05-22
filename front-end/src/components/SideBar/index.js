import React from 'react';
import './styles.css'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faHome,  faEnvelope } from '@fortawesome/free-solid-svg-icons'
export default function Header() {
    ///const nome = localStorage.getItem('nome'); 
    return (
        <>
            <div className="sidebar">
                <img className="profile-pic" src="https://via.placeholder.com/150" alt="Profile picture" />
                <ul className="menu">
                    <li>
                        <a href="/dashboard">
                          
                            <span>Home</span>
                        </a>
                    </li>
                    <li>
                        <a href="/createImmobiles">
                            
                            <span>Cadastrar Imovel</span>
                        </a>
                    </li>
                    
                    <li>
                        <a href="/historic">
                           
                            <span>Histórico de visitas</span>
                        </a>
                    </li>
                </ul> 
            </div>
        </>
    )
}