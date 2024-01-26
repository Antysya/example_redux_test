import React, { PropsWithChildren, ReactNode } from "react";
import "./style.css";
import classNames from "classnames";

interface IAlert{
    header: string;
    color: "primary" | "warning" | "success";
    icon?: ReactNode;

}
const Alert: React.FC<PropsWithChildren<IAlert>> = ({
    color, 
    header, 
    children, 
    icon,}) =>{
    return (
        <>
        <div 
            className={classNames("containerAlert", {
                ["primary"]: color === "primary",
                ["warning"]: color === "warning",
        })}
        >
            {icon && (
                <div className="iconAlert">
                    <span>{icon}</span>
                    </div>
            )}
        <div className="contentAlert">
              <div className="headerAlert">
                <h2>{header}</h2>
              </div>
              <div className="childrenAlert">{children}</div>
            </div>
          </div>
        </>
    );
};
export default Alert;