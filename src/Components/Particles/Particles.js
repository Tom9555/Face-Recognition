import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import particlesOptions from "./particles.json";

function Sparkle() {
	const particlesInit = useCallback((main) => {
		loadFull(main);
	}, []);

	return (
		<div>
			<Particles
				className="Sparkle"
				options={particlesOptions}
				init={particlesInit}
			/>
		</div>
	);
}
export default Sparkle;
