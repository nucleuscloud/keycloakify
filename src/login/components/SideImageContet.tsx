import { ReactElement } from "react";
import { SyncDash } from "../SyncDash";
import c2foLogo from "../assets/c2fo_logo.svg";
import fellow from "../assets/fellow_logo.svg";
import fp from "../assets/fpllc_logo.svg";
import siemans from "../assets/siemens_logo.svg";

const logos: { id: number; logo: ReactElement }[] = [
    {
        id: 1,
        logo: <img src={c2foLogo} width="60" height="200" alt="cust_logo" />
    },
    {
        id: 2,
        logo: <img src={fellow} width="120" height="100" alt="cust_logo" />
    },
    {
        id: 3,
        logo: <img src={fp} width="160" height="100" alt="cust_logo" />
    },
    {
        id: 8,
        logo: <img src={siemans} width="100" height="100" alt="cust_logo" />
    }
];

export default function SideImageContent(): ReactElement {
    return (
        <div className="sideImageContent">
            <div>
                <div className="loginPageText">Every developer needs data.</div>
                <div className="loginPageSubText">
                    Neosync powers developers with safe, high-quality data for a better
                    building, testing and debugging experience.
                </div>
            </div>
            <SyncDash />
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    padding: "10px"
                }}
            >
                {logos.map(src => (
                    <div key={src.id} className="flex items-center">
                        {src.logo}
                    </div>
                ))}
            </div>
        </div>
    );
}
