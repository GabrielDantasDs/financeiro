export default function Item(props) {
	return (
		<>
			{props.cliente ? (
				<li
					onClick={(e) => props.callBack("dashboard")}
					className={
						props.active ? "sb-item sb-item-active" : "sb-item"
					}
				>
					<i className={`fa fa-${props.icon}`}> </i>
					<Link
						to={`/${props.url}`}
						type="button"
						className="sb-link"
					>
						{props.name}
					</Link>
				</li>
			) : null}
		</>
	);
}
