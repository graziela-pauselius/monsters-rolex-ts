import { useState, useEffect, ChangeEvent } from "react";
import CardList from "./components/card-list/card-list-component";
import SearchBox from "./components/search-box/seach-box.component";

import { getData } from "./utils/data.utils";
import "./App.css";

export type Monster = {
	id: string;
	name: string;
	email: string;
};

const App = () => {
	//initialize the state
	const [searchField, setSearchField] = useState(""); // [value, setValue]
	const [monsters, setMonsters] = useState<Monster[]>([]); //empty array
	const [filteredMonsters, setFilterMonsters] = useState(monsters);

	useEffect(() => {
		const fetchUsers = async () => {
			const users = await getData<Array<Monster>>(
				"https://jsonplaceholder.typicode.com/users"
			);

			setMonsters(users);
		};

		fetchUsers();
	}, []);

	//Use effect to isolate filterdMonster to fire only at monsters/searchFild changes
	useEffect(() => {
		const newFilteredMonsters = monsters.filter((monster) => {
			return monster.name.toLocaleLowerCase().includes(searchField);
		});

		setFilterMonsters(newFilteredMonsters);
	}, [monsters, searchField]);

	const onSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const searchFieldString = e.target.value.toLocaleLowerCase();
		setSearchField(searchFieldString);
	};

	return (
		<div className="App">
			<h1 className="app-title">Monsters Rolodex</h1>
			<SearchBox
				onChangeHandler={onSearchChange}
				placeholder="search monsters"
				className="monsters-search-box"
			/>
			<CardList monsters={filteredMonsters} />
		</div>
	);
};

export default App;
