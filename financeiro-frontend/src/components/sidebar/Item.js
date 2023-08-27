import { Link } from "react-router-dom";

export default function Item(props) {
	return (
		<>
			{(props.cliente && props.clienteItem) || (!props.cliente && !props.clienteItem) ? (
				<li
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
