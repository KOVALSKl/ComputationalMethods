import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import cl from "./styles/Homepage.module.css";

function Homepage(props) {
    return (
        <div className={cl.wrapper}>
            <Container>
                <div className={cl.pageTitle}>
                    <h3>Higher mathematics calculator</h3>
                    <img src={require("../img/function.png")} />
                </div>
                <div className={cl.main}>
                    <div className={cl.block} id={cl.about}>
                        <h3 className={cl.blockTitle}>What can I find here?</h3>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                        occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
                        id est laborum.
                    </div>
                    <div className={cl.block} id={cl.tasks}>
                        <h3 className={cl.blockTitle}>Tasks</h3>
                        <div className={cl.blockContent}>
                            <ul>
                                <li>
                                    <Link to="/slae">Systems of linear equeations</Link>
                                </li>
                                <li>
                                    <Link to="/soef">Selection of empirical formulas</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Homepage;