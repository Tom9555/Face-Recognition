import React from "react";
import Tilt from "react-parallax-tilt";

import brain from "./Brain.png";
import "./Logo.css";
const Logo = () => {
	return (
		<div className="">
			<Tilt
				className="Tilt br2 shadow-2 parallax-effect"
				style={{ height: 300, width: 300, padding: "1em" }}
				perspective={150}
			>
				<div className="inner-element">
					<img alt="Brain" src={brain} />
				</div>
			</Tilt>
		</div>
	);
};

export default Logo;
