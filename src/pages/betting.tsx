import React, { useEffect, useState } from "react";
import axios from "axios";

const Betting = () => {
	const [gameList, setGameList] = useState<any>([]);

	useEffect(() => {
		axios.get("http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard?dates=20230404").then((data) => {
			if (data.data.events[0].status.type.completed) {
				setGameList(data.data.events);
			}
		});
	}, []);

	return (
		<div>
			{gameList.map((el: any) => {
				return (
					<button
						key={el.id}
						onClick={() => {
							axios.get(`http://site.api.espn.com/apis/site/v2/sports/basketball/nba/summary?event=${el.id}`).then((data) => {
								console.log(data.data); // headers.competition.competiator 여기에 승자있음
							});
						}}
					>
						{el.id}
					</button>
				);
			})}
		</div>
	);
};

export default Betting;
