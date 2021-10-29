import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

interface ConditionalLinkProps extends LinkProps {
	children: React.ReactNode,
	condition: boolean,
}

const ConditionalLink = ({ children, condition, ...linkProps }:ConditionalLinkProps) => (
	!!condition
	? <Link {...linkProps}>{children}</Link>
	: <>{children}</>
);

export default ConditionalLink;