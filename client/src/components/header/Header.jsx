import {
	faBed,
	faCalendarDays,
	faCar,
	faPerson,
	faPlane,
	faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useState, useEffect } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate, useLocation } from "react-router-dom";

const Header = ({ type }) => {
	const location = useLocation();
	const [destination, setDestination] = useState(location.state ? location.state.destination : "");
	const [openDate, setOpenDate] = useState(false);
	const [date, setDate] = useState([
		{
			startDate: new Date(),
			endDate: new Date(),
			key: "selection",
		},
	]);
	const [openOptions, setOpenOptions] = useState(false);
	const [options, setOptions] = useState({
		adult: 1,
		children: 0,
		room: 1,
	});

	const navigate = useNavigate();

	useEffect(() => {
		if (destination !== "")
			handleSearch()
	},[])

	const handleOption = (name, operation) => {
		setOptions((prev) => {
			return {
				...prev,
				[name]: operation === "i" ? options[name] + 1 : options[name] - 1,
			};
		});
	};

	const handleSearch = () => {
		navigate("/hotels", { state: { destination, date, options } });
	};

	return (
		<div className="header">
			<div
				className={
					type === "list" ? "headerContainer listMode" : "headerContainer"
				}
			>
				<div className="headerList">
					<div className="headerListItem active">
						<FontAwesomeIcon icon={faBed} />
						<span>Stays</span>
					</div>
					<div className="headerListItem">
						<FontAwesomeIcon icon={faPlane} />
						<span>Flights</span>
					</div>
					<div className="headerListItem">
						<FontAwesomeIcon icon={faCar} />
						<span>Car rentals</span>
					</div>
					<div className="headerListItem">
						<FontAwesomeIcon icon={faBed} />
						<span>Attractions</span>
					</div>
					<div className="headerListItem">
						<FontAwesomeIcon icon={faTaxi} />
						<span>Airport taxis</span>
					</div>
				</div>
				{type !== "list" && (
					<>
						<h1 className="headerTitle">Find your next stay.</h1>
						<p className="headerDesc">
							Search low prices on hotels, homes and much more...
						</p>
						<div className="headerSearch">
							<div className="headerSearchItem">
								<FontAwesomeIcon icon={faBed} className="headerIcon" />
								<input
									type="text"
									placeholder="Where are you going?"
									className="headerSearchInput"
									onChange={(e) => setDestination(e.target.value)}
									onClick={() => {
										setOpenDate(false)
										setOpenOptions(false)
									}
									}
								/>
							</div>
							<div className="headerSearchItem">
								<FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
								<span
									onClick={() => {
										setOpenOptions(false)
										setOpenDate(!openDate)
									}}
									className="headerSearchText"
								>{`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(
									date[0].endDate,
									"dd/MM/yyyy"
								)}`}</span>
								{openDate && (
									<DateRange
										editableDateInputs={true}
										onChange={(item) => setDate([item.selection])}
										moveRangeOnFirstSelection={false}
										ranges={date}
										className="date"
										minDate={new Date()}
									/>
								)}
							</div>
							<div className="headerSearchItem">
								<FontAwesomeIcon icon={faPerson} className="headerIcon" />
								<span
									onClick={() => {
										setOpenDate(false)
										setOpenOptions(!openOptions)
									}}
									className="headerSearchText"
								>{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
								{openOptions && (
									<div className="options">
										<div className="optionItem">
											<span className="optionText">Adult</span>
											<div className="optionCounter">
												<button
													disabled={options.adult <= 1}
													className="optionCounterButton"
													onClick={() => handleOption("adult", "d")}
												>
													-
												</button>
												<span className="optionCounterNumber">
													{options.adult}
												</span>
												<button
													className="optionCounterButton"
													onClick={() => handleOption("adult", "i")}
												>
													+
												</button>
											</div>
										</div>
										<div className="optionItem">
											<span className="optionText">Children</span>
											<div className="optionCounter">
												<button
													disabled={options.children <= 0}
													className="optionCounterButton"
													onClick={() => handleOption("children", "d")}
												>
													-
												</button>
												<span className="optionCounterNumber">
													{options.children}
												</span>
												<button
													className="optionCounterButton"
													onClick={() => handleOption("children", "i")}
												>
													+
												</button>
											</div>
										</div>
										<div className="optionItem">
											<span className="optionText">Room</span>
											<div className="optionCounter">
												<button
													disabled={options.room <= 1}
													className="optionCounterButton"
													onClick={() => handleOption("room", "d")}
												>
													-
												</button>
												<span className="optionCounterNumber">
													{options.room}
												</span>
												<button
													className="optionCounterButton"
													onClick={() => handleOption("room", "i")}
												>
													+
												</button>
											</div>
										</div>
									</div>
								)}
							</div>
							<div className="headerSearchItem">
								<button className="headerBtn" onClick={handleSearch}>
									Search
								</button>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Header;
