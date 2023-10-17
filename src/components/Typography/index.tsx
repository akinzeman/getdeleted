import { FC } from 'react';
import { Default, H2, H3, H4, H5, Caption, Subtitle2 } from './styled';

interface TypographyProps {
	children: React.ReactNode;
	type?:
		| 'h1'
		| 'h2'
		| 'h3'
		| 'h4'
		| 'h5'
		| 'p'
		| 'pBold'
		| 'caption'
		| 'subtitle2';
	color?: string;
	underline?: boolean;
}

const Typography: FC<TypographyProps> = ({
	children,
	type = 'p',
	underline = false,
	color,
}) => {
	switch (type) {
		case 'h2':
			return (
				<H2 color={color} underline={underline}>
					{children}
				</H2>
			);
		case 'h3':
			return (
				<H3 color={color} underline={underline}>
					{children}
				</H3>
			);
		case 'h4':
			return (
				<H4 color={color} underline={underline}>
					{children}
				</H4>
			);
		case 'h5':
			return (
				<H5 color={color} underline={underline}>
					{children}
				</H5>
			);
		case 'caption':
			return (
				<Caption color={color} underline={underline}>
					{children}
				</Caption>
			);
		case 'subtitle2':
			return (
				<Subtitle2 color={color} underline={underline}>
					{children}
				</Subtitle2>
			);
		default:
			return (
				<Default color={color} underline={underline}>
					{children}
				</Default>
			);
	}
};

export default Typography;
