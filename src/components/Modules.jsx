import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "react-combo-select/style.css";

const Modules = (props) => {
    console.log(props);

    /* Unpack props. */
    const numModules = props.location.state["numModules"];
    const fileNames = {
        "active_genes": props.location.state["Active gene file"],
        "network": props.location.state["Network file"]
    };
    console.log("fileNames", fileNames);
    const zipURL = props.location.state["zipURL"];

    /** Returns the directory (with respect to the public folder) to the
    * ith static html file to display the ith module. */
    const moduleDirectory = (i) =>
        `${props.location.state.moduleDir}/module_${i}.html`;

    /* Initialize component states. */
    const [selectedModuleURL, setSelectedModuleURL] = useState(
        numModules > 0 ? moduleDirectory(0) : ""
    );
    const [selectedModuleId, setSelectedModuleId] = useState(
        numModules > 0 ? "0" : ""
    );

    /* Determines the className for the left module navbar.
    * Returns 'nav-link active' for the module tab that's being rendered.
    * Returns 'nav-link otherwise. */
    const isActive = (moduleId) =>
        "nav-link "+ (selectedModuleId==moduleId ? 'active' : '');

    /* Determines the static html file to render on the visualization page. */
    const fetchHtml = (t) => {
        const pr = t.target.getAttribute("moduleId");
        setSelectedModuleURL(moduleDirectory(pr));
        setSelectedModuleId(t.target.getAttribute("moduleId"));
    };

    const sidebar = (
        <div className="wrapper">
            
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3>DOMINO Web Executor</h3>
                </div>

                <ul className="list-unstyled components">
                    <p>Visualization Details</p>
                    <li className="active">
                        <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false"
                           className="dropdown-toggle">Identified Modules</a>
                        <ul className="collapse list-unstyled" id="homeSubmenu">
                            {[...Array(numModules).keys()].map(pr => (
                                <li className="nav-item">
                                    <a className={isActive(pr)}
                                       moduleId={pr}
                                       onClick={t => fetchHtml(t)}>module {pr}</a>
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>

                {/* Download Visualization button*/}
                <a className="btn btn-primary"
                   style={{position:"absolute", bottom:"15px", color:"white"}}
                   href={zipURL}
                   download
                >Download Visualization</a>

                {/* Parameter description */}
                <div style={{backgroundColor: "grey"}}>
                    <h4 style={{fontSize: "20px"}}>Parameters:</h4>
                    <div className="row">
                        <div className="col-md-4"><p style={{fontSize: "15px"}}>Active genes:</p></div>
                        <div className="col-md-8"><p style={{fontSize: "15px"}>{fileNames.active_genes}</p></div>
                    </div>
                    <div className="row">
                        <div className="col-md-4"><p style={{fontSize: "15px"}}>Network:</p></div>
                        <div className="col-md-8"><p style={{fontSize: "15px"}>{fileNames.network}</p></div>
                    </div>
                </div>
            </nav>
        </div>

    );

    return (
        <>
            <div className="row"  style={{width: "100vw", height: "100vh", margin: "0px"}}>
                <div className="col-md-2" style={{position: "relative"}}>
                    <h4 className='display-6'>Modules:</h4>
                    <ul className="nav nav-pills flex-column">

                    </ul>

                </div>
                <div className="col-md-10">
                    <iframe src = {selectedModuleURL} style={{width: "100%", height: "100%"}}></iframe>
                </div>
            </div>
        </>
    );

};

export default Modules;
