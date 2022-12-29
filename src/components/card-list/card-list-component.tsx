import { Monster } from "../../App";

import Cards from "../cards/cards.component";

import "./card-list.styles.css";

type CardListProps = {
	monsters: Monster[];
};

const CardList = ({ monsters }: CardListProps) => (
	<div className="card-list">
		{monsters.map((monster) => {
			return <Cards monster={monster} />;
		})}
	</div>
);

export default CardList;
