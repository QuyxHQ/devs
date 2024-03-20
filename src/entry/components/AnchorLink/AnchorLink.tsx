import { Link } from "react-router-dom";

const AnchorLink = (props: AnchorLinkProps) => {
  return (
    <Link
      to={props.to}
      className={props.className}
      style={props.style}
      onClick={props.handleClick}
      title={props.title}
      target={props.target}
    >
      {props.children}
    </Link>
  );
};

export default AnchorLink;
